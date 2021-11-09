<!--  -->
<template>
<v-app absolute dark style="background:none">
  <div class="bg"></div>
  <div class="c-head text-center">
    <v-row justify="center" align="end" class="fill-height">
      <v-col>
        <span class="display-2 white--text font-weight-bold">{{getTitle}}</span>
      </v-col>
    </v-row>
  </div>
  <div class="c-body">
    <v-row>
      <v-col sm="2">
        <v-container style="padding: 0px 0px 0px 0px;">
          <v-flex xs12>
            <v-list shaped fluid style="background:none">
              <v-list-item-group v-model="currentItem" active-class="orange" color="orange">
                <v-list-item v-for="(item, i) in subItems" :key="i" @click="handleChangeSubItem(item)">
                  <v-list-item-icon>
                    <v-icon color="white" v-text="item.iconCls"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="white--text headline" v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-flex>
        </v-container>
      </v-col>
      <v-col sm="10">
        <div class="c-scoll-list">
          <v-container fluid>
            <v-flex xs12 v-if="tableDatas!=null && tableDatas.length > 0">
              <v-list style="background:none">
                <template v-for="(data,index) in tableDatas">
                  <div :key="index">
                    <v-list-item hover @click="handleContentItemClick(data)">
                      <v-list-item-avatar color="blue lighten-3">
                        <span class="white--text headline  font-weight-bold ">{{index+1}}</span>
                      </v-list-item-avatar>
                      <v-list-item-content class="button counterclockwise horizontal">
                        <v-list-item-title class="white--text headline text-truncate font-weight-bold" v-text="data.title"></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <span class="white--text headline font-weight-bold">{{$moment(data.crtTime).isValid()?$moment(data.crtTime).format('YYYY-M-D'):'未知'}}</span>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider inset></v-divider>
                  </div>
                </template>
              </v-list>
            </v-flex>
            <v-container v-else fill-height align-content-center fluid>
              <div>
                <span class="white--text headline font-weight-bold">暂无数据</span>
              </div>
            </v-container>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </div>
  <div class="c-page">
    <div class="text-center pt-2" style="background:none" v-if="pageCount>1">
      <v-pagination v-model="page" @input="handlePageChange" :length="pageCount" :total-visible="10"></v-pagination>
    </div>
  </div>

  <v-dialog v-model="dialog" transition="slide-x-reverse-transition" scrollable>
    <v-card class="v-right-sheet">
      <!-- <v-card-title>详细信息</v-card-title> -->
      <v-divider></v-divider>
      <v-card-text>
        <civic-detail-info :article="selectedArticle"></civic-detail-info>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-btn class="display-1 white--text font-weight-bold" color="white" z-index="6" top @click="handleBack" min-width="8vh" min-height="8vh" dark text fixed x-large left>
    <v-icon>iconfont icon-fanhui</v-icon>
    <span>返回</span>
  </v-btn>

  <v-overlay :value="loading" z-index="4">
    <v-card color="primary" dark width="300">
      <v-card-text>
        数据加载中...
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-overlay>
</v-app>
</template>

<script>
import CivicDetailInfo from './detail'
export default {
  props: {
    pMenu: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {
    CivicDetailInfo
  },
  data () {
    return {
      clonePMenu: {},
      selectedArticle: {},
      dialog: false,
      loading: false,
      currentItem: 0,
      subItems: [],
      catId: null,
      page: 1,
      pageCount: 1,
      itemsPerPage: 10,
      tableDatas: []
    }
  },
  methods: {
    // 查询面包屑导航
    handleChangeSubItem (subItem) {
      if (subItem.id) {
        this.catId = subItem.id
        this.pageGetArticlesByCatId(subItem.id)
      }
    },
    pageGetArticlesByCatId: async function (catId, pageNum = 1, pageSize = 15) {
      this.loading = true
      let rb = await this.$http.get('/api/civic/civicArticle/page/articles/by/catId', {
        catId: catId,
        pageNumber: pageNum,
        pageSize: pageSize
      })
      if (rb.ok()) {
        this.tableDatas = rb.data.records
        this.page = rb.data.current
        this.pageCount = rb.data.pages
        this.itemsPerPage = rb.data.size
      }
      this.loading = false
    },
    async init () {
      this.tableDatas = []
      if (this.pMenu.id) {
        this.currentItem = 0
        this.clonePMenu = {
          ...this.pMenu
        }
      }
      if (this.clonePMenu.id) {
        await this.getSubCategories()
        if (this.subItems != null && this.subItems.length > 0) {
          this.catId = this.subItems[this.currentItem].id
          this.pageGetArticlesByCatId(this.catId)
        }
      }
    },
    getSubCategories: async function () {
      if (this.pMenu.id) {
        this.loading = true
        let rb = await this.$http.get('/api/civic/civicCategory/sub/categories/by/root', {
          rootId: this.pMenu.id
        })
        if (rb.ok()) {
          this.subItems = rb.data
        }
        this.loading = false
      }
    },

    handleBack: function () {
      this.$router.push({
        name: 'c-home'
      })
    },
    handlePageChange: function (value) {
      this.pageGetArticlesByCatId(this.catId, value)
    },
    handleContentItemClick: function (item) {
      this.selectedArticle = Object.assign({}, item)
      this.dialog = true
      // this.$router.push({
      //   name: 'detail',
      //   params: {
      //     article: {
      //       ...item
      //     }
      //   }
      // })
    },
    getColor (item, index) {
      return 'primary'
    }
  },
  mounted: function () {
    this.init()
  },
  computed: {
    getTitle () {
      return '昌都市政务服务中心信息 -- ' + this.clonePMenu.name || ''
    },
    breadCrumbs () {
      let crumbs = [{
        text: '首页',
        disabled: false,
        href: '/civic-service-center/home'
      }]
      if (this.clonePMenu.name) {
        crumbs.push({
          text: this.clonePMenu.name || '',
          disabled: true
        })
      }
      return crumbs
    }
  },
  watch: {
    pMenu: {
      handler: function (value) {
        if (value != null) {
          this.init()
        }
      }
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
}

/* .bz-buttonAnimat {
  position: relative
}

.bz-buttonAnimat:nth-of-type(2):before,
.bz-buttonAnimat:nth-of-type(2):after {
  background-color: #1976d2
}

.bz-buttonAnimat:before,
.bz-buttonAnimat:after {
  position: absolute;
  content: "";
  display: block;
  -webkit-transition: -webkit-transform .8s;
  transition: -webkit-transform .8s;
  transition: transform .8s;
  transition: transform .8s, -webkit-transform .8s
}

.bz-buttonAnimat.horizontal:before,
.bz-buttonAnimat.horizontal:after {
  left: 0;
  width: 100%;
  height: 2px;
  -webkit-transform: scaleX(0);
  transform: scaleX(0)
}

.bz-buttonAnimat.horizontal:after {
  bottom: 0
}

.bz-buttonAnimat.horizontal:hover:after {
  -webkit-transform: scaleX(1);
  transform: scaleX(1)
}

.bz-buttonAnimat.horizontal.counterclockwise:after {
  -webkit-transform-origin: right center;
  transform-origin: right center
}

.bz-buttonAnimat.horizontal.counterclockwise:hover:after {
  -webkit-transform-origin: left center;
  transform-origin: left center
} */
</style>
