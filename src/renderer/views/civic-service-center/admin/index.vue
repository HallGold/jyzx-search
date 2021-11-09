<template>
<v-app absolute >
  <v-app-bar class="layout-header-bar" clipped-left app dark color="primary">
    <v-toolbar-title class="display-1">昌都市政务服务中心信息查询系统后台</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="handleGoHome">
      <v-icon>
        visibility
      </v-icon>
    </v-btn>
    <template v-slot:extension>
      <v-tabs @change="handleChange" v-model="activeMenu" align-with-title background-color="transparent">
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="(item,index) in menus" :key="index">
          <v-icon v-text="item.iconCls"></v-icon>
          <span class="headline">{{item.name}}</span>
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>

  <v-content>
    <v-container fill-height>
      <v-layout column>
        <v-alert  border="left" colored-border color="primary">
          {{(menus[activeMenu]||{}).name}}-栏目
        </v-alert>
        <v-card flat>
          <sub-menu :p-menu="menus[activeMenu]"></sub-menu>
        </v-card>
        <v-alert colored-border border="left" color="primary">
          文章列表
        </v-alert>
      </v-layout>
    </v-container>
    <!-- <v-tabs-items v-model="activeMenu">
      <v-tab-item v-for="(item,index) in menus" :key="index">
        <v-card flat>
          <sub-menu :p-menu="item"></sub-menu>
        </v-card>
      </v-tab-item>
    </v-tabs-items> -->
  </v-content>
</v-app>
</template>

<script>
import SubMenu from './sub-menu'
export default {
  data: function () {
    return {
      activeMenu: null,
      menus: []
    }
  },
  props: {},
  components: {
    SubMenu
  },
  methods: {
    handleChange: function (value) {
      console.log(value)
    },
    handleClickMenu: function (menu) {},

    init () {
      this.getRootMenu()
    },
    handleAddClick: function () {},
    getRootMenu: async function () {
      let rb = await this.$http.get('/api/civic/civicCategory/root/categories')
      if (rb.ok()) {
        this.menus = rb.data
      }
    },
    handleGoHome () {
      this.$router.push({
        name: 'c-home'
      })
    }
  },
  mounted: function () {
    this.init()
  },
  computed: {}
}
</script>

<style>

</style>
