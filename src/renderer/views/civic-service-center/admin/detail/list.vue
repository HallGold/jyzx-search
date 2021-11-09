<!--  -->
<template>
<v-app absolute dark>
  <v-app-bar class="layout-header-bar" clipped-left app dark color="primary">
    <v-btn icon dark @click="handleBack">
      <v-icon>close</v-icon>
    </v-btn>
    <v-toolbar-title class="headline">{{title || ''}}</v-toolbar-title>
  </v-app-bar>
  <v-content fluid fill-height>
    <v-flex fluid xs12 v-if="tableDatas!=null && tableDatas.length > 0">
      <v-list>
        <template v-for="(data,index) in tableDatas">
          <div :key="index">
            <v-list-item hover @click="">
              <v-list-item-avatar color="primary">
                <span class="white--text headline">{{index+1}}</span>
              </v-list-item-avatar>
              <v-list-item-content class="button bz-buttonAnimat counterclockwise horizontal">
                <v-list-item-title class="primary--text headline text-truncate" v-text="data.title"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="primary" @click="handleEditClick(data)" outlined dark>edit</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action>
                <v-btn icon @click="handleDeleteClick(data)">
                  <v-icon color="red" outlined dark>delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider inset></v-divider>
          </div>
        </template>
      </v-list>
      <div class="text-center pt-2" v-if="pageCount>1">
        <v-pagination v-model="page" @input="handlePageChange" :length="pageCount" :total-visible="10"></v-pagination>
      </div>
    </v-flex>
    <v-container v-else fill-height align-content-center justify-center fluid>
      <div class="headline red--text">
        暂无数据
      </div>
    </v-container>
  </v-content>
  <v-btn z-index="5" bottom @click="handleAddClick" color="pink" min-width="8vh" min-height="8vh" dark fab fixed x-large right>
    <v-icon>add</v-icon>
  </v-btn>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        <v-icon color="primary" x-large>info</v-icon>提示
      </v-card-title>
      <v-card-text>是否删除此文章？</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">取消</v-btn>
        <v-btn color="primary darken-1" text @click="handleOkClick">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbarOption.visible" :color="snackbarOption.color" :timeout="6000" top>
    {{snackbarOption.text}}
    <v-btn dark text @click="snackbarOption.visible = false">
      关闭
    </v-btn>
  </v-snackbar>

</v-app>
</template>

<script>
import ArticleForm from './form'
export default {
  props: {
    title: String,
    category: {
      default: function () {
        return {}
      }
    }
  },
  components: {
    ArticleForm
  },
  data () {
    return {
      snackbarOption: {
        visible: false
      },
      dialog: false,
      deleteArticle: {},
      page: 1,
      cloneCategory: {},
      pageCount: 20,
      itemsPerPage: 10,
      tableDatas: []
    }
  },
  methods: {
    init (category) {
      if (category.id) {
        this.pageGetArticlesByCatId(category.id)
      }
    },
    handlePageChange: function (value) {
      this.pageGetArticlesByCatId(this.category.id, value)
    },
    handleEditClick: function (article) {
      this.$router.push({
        name: 'articleForm',
        params: {
          sourceRoute: {
            ...this.$route
          },
          category: {
            ...this.category
          },
          article: {
            ...article
          }
        }
      })
    },
    handleBack: function () {
      this.$router.push({
        name: 'admin'
      })
    },
    handleAddClick: function () {
      this.$router.push({
        name: 'articleForm',
        params: {
          sourceRoute: {
            ...this.$route
          },
          category: {
            ...this.category
          }
        }
      })
    },
    handleContentItemClick: function (article) {

    },
    pageGetArticlesByCatId: async function (catId, pageNum = 1, pageSize = 10) {
      // this.loading = true
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
      // this.loading = false
    },
    handleOkClick: async function () {
      if (this.deleteArticle && this.deleteArticle.id) {
        let rb = await this.$http.delete('/api/civic/civicArticle/logic/delete', {
          id: this.deleteArticle.id
        })
        if (rb.ok()) {
          this.snackbarOption = {
            visible: true,
            text: '删除成功',
            color: 'success'
          }
          this.init(this.category)
        } else {
          this.snackbarOption = {
            visible: true,
            text: '删除失败',
            color: 'error'
          }
        }
        this.dialog = false
      }
    },
    handleDeleteClick (data) {
      this.dialog = true
      this.deleteArticle = {
        ...data
      }
    }

  },
  mounted: function () {
    this.init(this.category)
  },
  computed: {},
  watch: {
    category: {
      handler: function (value) {
        console.log(value)
        if (value) {
          this.init(value)
        }
      },
      deep: true
    }
  }
}
</script>

<style  scoped>
</style>
