<!--  -->
<template>
<div>
  <div class="c-scoll-list">
    <v-row justify="center">
      <v-col lg="8">
        <v-list style="background:none;width:100%" v-if="tableDatas!=null && tableDatas.length > 0">
          <template v-for="(data,index) in tableDatas">
            <v-col :key="index">
              <v-list-item hover @click="handleContentItemClick(data)" three-line>
                <v-list-item-avatar color="blue lighten-3">
                  <span class="white--text headline font-weight-bold">{{index+1}}</span>
                </v-list-item-avatar>
                <v-list-item-content class="button bz-buttonAnimat counterclockwise horizontal">
                  <v-list-item-title class="white--text headline text-truncate font-weight-bold" v-text="data.title"></v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip v-if="!$_.isNil(data.sentCode) && !$_.isEmpty(data.sentCode)" class="ma-2" color="primary" text-color="white">
                      {{data.sentCode}}
                    </v-chip>
                    <v-chip v-if="!$_.isNil(data.tags) && !$_.isEmpty(data.tags)" class="ma-2" color="orange" text-color="white">
                      {{data.tags}}
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <span class=" font-weight-bold white--text headline">{{$moment(data.deliveryTime).isValid()?$moment(data.deliveryTime).format('YYYY年'):'未知'}}</span>
                </v-list-item-action>
              </v-list-item>
              <v-divider inset></v-divider>
            </v-col>
          </template>
        </v-list>
        <v-container v-else fill-height align-content-center fluid>
          <div>
            <span class=" font-weight-bold white--text headline"> 暂无数据</span>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </div>
  <div class="c-page">
    <v-row>
      <v-col lg="12">
        <div class="text-center pt-2" style="background:none" v-if="pageOption.pageCount>1">
          <v-pagination v-model="pageOption.page" @input="handlePageChange" :length="pageOption.pageCount" :total-visible="10"></v-pagination>
        </div>
      </v-col>
    </v-row>
  </div>
  <v-dialog v-model="dialog" transition="slide-x-reverse-transition" scrollable>
    <v-card class="v-right-sheet">
      <!-- <v-card-title>详细信息</v-card-title> -->
      <v-divider></v-divider>
      <v-card-text>
        <policy-detail-info :policy="selectedPolicy"></policy-detail-info>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-overlay :value="loading" z-index="4">
    <v-card color="primary" dark width="300">
      <v-card-text>
        数据加载中...
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-overlay>
  <v-btn class="display-1 white--text font-weight-bold" color="white" z-index="6" top @click="handleBack" min-width="8vh" min-height="8vh" dark text fixed x-large left>
    <v-icon>iconfont icon-fanhui</v-icon>
    <span>返回</span>
  </v-btn>
</div>
</template>

<script>
import PolicyDetailInfo from '../policy-detail-info'
export default {
  props: {},
  components: {
    PolicyDetailInfo
  },
  data () {
    return {
      loading: false,
      dialog: false,
      selectedPolicy: {},
      tableDatas: [],
      pageOption: {
        pageCount: 1,
        page: 1
      }
    }
  },
  methods: {
    // 招商引资
    // 分页查询
    async pageQuery (pageNum = 1, pageSize = 10) {
      return []
    },
    handleBack: function () {
      this.$router.push({
        name: 'p-home'
      })
    },
    handlePageChange: function (value) {
      this.pageQuery(value)
    },
    handleContentItemClick: function (item) {
      this.selectedPolicy = Object.assign({}, item)
      this.dialog = true
    },
    getColor () {
      let colors = ['primary', 'secondary', 'red', 'green', 'orange']
      let index = Math.floor(Math.floor(Math.random() * 100) % colors.length)
      return colors[index]
    }
  },
  mounted: function () {
    this.pageQuery()
  },
  computed: {}
}
</script>

<style>
.my-card {
  background: none !important;
}

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
</style>
