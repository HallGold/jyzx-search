<!--  -->
<template>
<div>
  <v-row>
    <v-col sm="2">
      <v-container>
        <v-treeview active-class="orange" v-if="treeMenus.length>0" item-key="catid" open-all :active="activeMenus" activatable color="warning" :items="treeMenus" @update:active="handleActiveUpdate">
          <template v-slot:label="{item}">
            <span class="headline  white--text">{{item.title}}</span>
          </template>
        </v-treeview>
      </v-container>
    </v-col>
    <v-col sm="10">
      <v-col>
        <v-btn-toggle v-model="activeBtn" active-class="warning" @change="handleBtnActiveChange">
          <v-btn value="today" color="primary">
            <span class="headline"> 今日</span>
          </v-btn>
          <v-btn value="yesterday" color="primary">
            <span class="headline"> 昨日</span>
          </v-btn>
          <v-btn value="pre3" color="primary">
            <span class="headline"> 前三日</span>
          </v-btn>
          <v-btn value="pre7" color="primary">
            <span class="headline"> 前七日</span>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <div class="c-scoll-list" style="height:61vh">
        <v-overlay z-index="4" opacity="0.1" :value="overlay">
          <v-card color="orange" dark width="300">
            <v-card-text>
              数据加载中...
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-overlay>
        <div class="fill-height">
          <v-col xs="12" v-if="tableDatas!=null && tableDatas.length > 0">
            <v-list style="background:none">
              <template v-for="(data,index) in tableDatas">
                <div :key="index">
                  <v-list-item hover @click="handleContentItemClick(data)">
                    <v-list-item-avatar :color="getColor(data,index)">
                      <span class="white--text headline  font-weight-bold">{{index+1}}</span>
                    </v-list-item-avatar>
                    <v-list-item-content class="button bz-buttonAnimat counterclockwise horizontal">
                      <v-list-item-title class="white--text headline text-truncate font-weight-bold" v-text="data.title"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <span class="white--text headline ">{{$moment.unix(data.addtime).isValid()?$moment.unix(data.addtime).format('YYYY-MM-DD'):'未知'}}</span>
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider inset></v-divider>
                </div>
              </template>
            </v-list>

          </v-col>
          <v-container v-else fill-height align-content-center fluid>
            <div>
              <span class="white--text headline font-weight-bold">暂无数据</span>
            </div>
          </v-container>
        </div>
      </div>
      <div class="text-center pt-2" style="background:none" v-if="pageCount>1">
        <v-pagination v-model="page" @input="handlePageChange" :length="pageCount" :total-visible="10"></v-pagination>
      </div>
    </v-col>
  </v-row>
  <v-dialog v-model="dialog" transition="slide-x-reverse-transition" scrollable>
    <v-card class="v-right-sheet">
      <v-card-title>详细信息</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <article-detail-info :article="article"></article-detail-info>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-btn class="display-1 white--text font-weight-bold" color="white" z-index="5" top @click="handleBack" min-width="8vh" min-height="8vh" dark text fixed x-large left>
    <v-icon>iconfont icon-fanhui</v-icon>
    <span>返回</span>
  </v-btn>
</div>
</template>

<script>
// import VRightSheet from '@/components/vuetify/VRightSheet'
import ArticleDetailInfo from '../article/article-detail-info'
export default {
  props: {},
  components: {
    // VRightSheet
    ArticleDetailInfo
  },
  data () {
    return {
      dialog: false,
      activeBtn: null,
      overlay: false,
      activeMenus: [],
      activeCats: [],
      biddingInfo: {
        id: 30,
        title: '交易结果'
      },
      treeMenus: [],
      page: 1,
      pageCount: 1,
      itemsPerPage: 10,
      tableDatas: [],
      // 时间条件
      dateRange: null,
      // 排序条件
      order: 'desc',
      article: {}
    }
  },
  methods: {
    getColor (item, index) {
      return 'blue lighten-3'
    },
    handleBack: function () {
      this.$router.push({
        name: 't-home'
      })
    },
    // 转化类型为树形结构
    covertDataToTree (arr) {
      let rt = []
      arr.forEach(child => {
        if (child.catid === 40) {
          child.expand = true
        }
        let findParent = false
        if (!this.$_.isNil(child.rootid)) {
          arr.forEach(parent => {
            if (parent.catid === child.rootid) {
              findParent = true
              if (this.$_.isNil(parent.children)) {
                parent.children = []
              }
              parent.children.push(child)
            }
          })
        }
        if (!findParent) {
          rt.push(child)
        }
      })
      return rt
    },

    async queryLeftMenuTreeDatas () {
      let rb = await this.$http.get(`/api/category/category/getCategory/${this.categoryId}`)
      if (rb.ok()) {
        this.treeMenus = this.covertDataToTree(rb.data)
        this.activeMenus = [(this.treeMenus[0] || {}).catid || this.categoryId]
      }
    },
    handlePageChange: function (value) {
      this.pageArticles(value)
    },
    handleActiveUpdate: function (actived) {
      this.activeCats = actived
      if (actived.length === 0) {
        this.activeMenus = [(this.treeMenus[0] || {}).catid || this.categoryId]
      } else {
        this.pageArticles(1)
      }
    },
    today () {
      return this.$moment(this.$moment().format('L'))
    },
    handleBtnActiveChange: function (val) {
      // 设置时间查询条件
      // 改为升序
      this.order = 'asc'
      let timeCondition = {
        'today': {
          fromDate: this.today().subtract(1, 's').unix(),
          toDate: this.today().add(1, 'days').unix()
        },
        'yesterday': {
          fromDate: this.today().subtract(1, 'days').unix(),
          toDate: this.today().unix()
        },
        'pre3': {
          fromDate: this.today().subtract(4, 'days').unix(),
          toDate: this.today().subtract(1, 'days').unix()
        },
        'pre7': {
          fromDate: this.today().subtract(8, 'days').unix(),
          toDate: this.today().subtract(1, 'days').unix()
        }
      }
      let dateR = timeCondition[this.activeBtn]
      if (dateR) {
        this.dateRange = [{
          field: 'fromDate',
          value: dateR.fromDate
        },
        {
          field: 'toDate',
          value: dateR.toDate
        }
        ]
      } else {
        this.dateRange = []
        this.order = 'desc'
      }
      this.pageArticles()
    },
    async pageArticles (pageNum = 1, pageSize = 15) {
      this.overlay = true
      let param = {
        current: pageNum,
        size: pageSize,
        conditions: [{
          field: 'treeId',
          value: this.categoryId
        }],
        descs: ['addtime']
      }
      // 添加时间条件
      if (!this.$_.isNil(this.dateRange)) {
        param.conditions = param.conditions.concat(this.dateRange)
      }
      // 判断是否是根类型id, 不是则添加子类型条件
      if (this.activeCats && this.activeCats.length === 1) {
        let activeCat = this.activeCats[0]
        if (!this.$_.isNil(activeCat) && activeCat !== this.categoryId) {
          param.conditions.push({
            field: 'catId',
            value: activeCat
          })
        }
      }
      let rb = await this.$http.post(`/api/article/article/pageByRootType`, param)
      if (rb.ok()) {
        this.tableDatas = rb.data.records
        this.page = rb.data.current
        this.pageCount = rb.data.pages
        this.itemsPerPage = rb.data.size
      }
      this.overlay = false
    },
    handleContentItemClick: function (article) {
      this.article = article
      this.dialog = true
    },
    async init () {
      await this.queryLeftMenuTreeDatas()
      await this.pageArticles(this.page)
    }
  },
  mounted: function () {
    this.init()
  },
  computed: {
    categoryId () {
      return this.biddingInfo.id
    }
  }
}
</script>

<style scoped>
.v-right-sheet {
  height: 100%;
  width: 80%;
  position: fixed;
  overflow-y: auto;
  top: 0;
  right: 0;
  border-radius: 0;
  margin: 0;
  /* overflow: visible; */
}
</style>
