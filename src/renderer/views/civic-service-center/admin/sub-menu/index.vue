<!--  -->
<template>
<v-container align-content-start justify-start fill-height fluid>
  <v-layout justify-start row wrap>
    <v-flex align-self-center order-xs8 v-for="(menu,index) in subMenus" :key="`${index}`" xs3>
      <v-container justify-center>
        <sub-menu-item :menu="menu" @handle-click="handleSubMenuClick"></sub-menu-item>
      </v-container>
    </v-flex>
    <!-- <article-form></article-form> -->
  </v-layout>
  <v-btn z-index="5" bottom @click="handleClick" color="pink" min-width="8vh" min-height="8vh" dark fab fixed x-large right>
    <v-icon>add</v-icon>
  </v-btn>
  <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
    <v-card tile style="background:#d4ebf3">
      <v-toolbar flat dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{currentCategory.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <article-list :category="currentCategory"></article-list>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
    <v-btn z-index="5" bottom @click="handleAddClick" color="pink" min-width="8vh" min-height="8vh" dark fab fixed x-large right>
      <v-icon>add</v-icon>
    </v-btn>
  </v-dialog> -->
  <v-dialog persistent v-model="formDialog" fullscreen>
    <v-card>
      <v-toolbar flat dark color="primary">
        <v-btn icon dark @click="formDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title> 新增{{currentCategory.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <article-form ref="articleForm"></article-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="formDialog = false" text>
          取消
        </v-btn>
        <v-btn @click="handleSaveClick" text color="primary">
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-container>
</template>

<script>
import ArticleForm from '.././detail/form'
import ArticleList from '.././detail/list'
import SubMenuItem from './sub-menu-item'
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
    ArticleForm,
    ArticleList,
    SubMenuItem
  },
  data () {
    return {
      subMenus: [],
      currentCategory: {},
      dialog: false,
      formDialog: false

    }
  },
  methods: {
    handleSaveClick: function () {
      this.$refs['articleForm'].validate()
    },
    handleClick: function () {},
    handleSubMenuClick: function (category) {
      this.currentCategory = Object.assign({}, category)
      this.$router.push({
        name: 'articleList',
        params: {
          title: `${this.pMenu.name} -> ${category.name}`,
          category: Object.assign({}, category)
        }
      })
      // this.dialog = true
    },
    handleAddClick: function () {
      this.formDialog = true
    },
    getSubMenus: async function (pMenu) {
      if (pMenu.id) {
        let rb = await this.$http.get('/api/civic/civicCategory/sub/categories/by/root', {
          rootId: pMenu.id
        })
        if (rb.ok()) {
          this.subMenus = rb.data
        } else {
          this.subMenus = []
        }
      }
    },

    init () {
      this.getSubMenus(this.pMenu)
    }
  },
  mounted: function () {
    if (this.pMenu) {
      this.init()
    }
  },
  computed: {},
  watch: {
    pMenu: function (value) {
      if (value != null) {
        this.init()
      }
    }
  }
}
</script>

<style  scoped>
</style>
