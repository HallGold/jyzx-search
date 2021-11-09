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
          <v-btn value="tomorrow" color="primary">
            <span class="headline"> 明日</span>
          </v-btn>
          <v-btn value="3rd" color="primary">
            <span class="headline"> 后三日</span>
          </v-btn>
          <v-btn value="7rd" color="primary">
            <span class="headline"> 后七日</span>
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
                      <v-list-item-title class="white--text headline text-truncate font-weight-bold" v-text="data.productname"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <span class="white--text headline font-weight-bold">{{$moment.unix(data.applyOpenTime).isValid()?$moment.unix(data.applyOpenTime).format('YYYY-MM-DD'):'未知'}}</span>
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
        <product-detail-info :product="product"></product-detail-info>
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
import ProductDetailInfo from '../product/product-detail-info'
export default {
  props: {},
  components: {
    // VRightSheet
    ProductDetailInfo
  },
  data () {
    return {
      dialog: false,
      activeBtn: null,
      overlay: false,
      activeMenus: [],
      activeCats: [],
      dealInfo: {
        id: 20,
        title: '交易信息'
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
      product: {}
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
      this.pageProducts(value)
    },
    handleActiveUpdate: function (actived) {
      this.activeCats = actived
      if (actived.length === 0) {
        this.activeMenus = [(this.treeMenus[0] || {}).catid || this.categoryId]
      } else {
        this.pageProducts(1)
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
        'tomorrow': {
          fromDate: this.today().add(1, 'days').subtract(1, 's').unix(),
          toDate: this.today().add(2, 'days').unix()
        },
        '3rd': {
          fromDate: this.today().add(1, 'days').subtract(1, 's').unix(),
          toDate: this.today().add(4, 'days').unix()
        },
        '7rd': {
          fromDate: this.today().add(1, 'days').subtract(1, 's').unix(),
          toDate: this.today().add(8, 'days').unix()
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
      this.pageProducts()
    },
    async pageProducts (pageNum = 1, pageSize = 15) {
      this.overlay = true
      let param = {
        current: pageNum,
        size: pageSize,
        conditions: [{
          field: 'treeId',
          value: this.categoryId
        }]
      }
      // 时间条件查询使用升序
      if (this.order === 'desc') {
        param['descs'] = ['applyOpenTime']
      } else {
        param['ascs'] = ['applyOpenTime']
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
      let rb = await this.$http.post(`/api/product/product/pageByRootType`, param)
      if (rb.ok()) {
        this.tableDatas = rb.data.records
        this.page = rb.data.current
        this.pageCount = rb.data.pages
        this.itemsPerPage = rb.data.size
      }
      this.overlay = false
    },
    handleContentItemClick: function (product) {
      this.product = product
      this.dialog = true
    },
    async init () {
      await this.queryLeftMenuTreeDatas()
      await this.pageProducts(this.page)
    }
  },
  mounted: function () {
    this.init()
  },
  computed: {
    categoryId () {
      return this.dealInfo.id
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
