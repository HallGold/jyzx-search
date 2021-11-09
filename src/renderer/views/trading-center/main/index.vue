<template>
<v-app absolute dark style="background:none">
  <!-- <v-navigation-drawer v-model="drawer" app temporary color="primary" class="layout-header-bar">
    <v-container align-content-center fill-height fluid column>
      <v-list dark>
        <template v-for="(item, index) in navListItems">
          <v-list-item :key="index" @click="item.handleTap" color="primary">
            <v-list-item-icon>
              <v-icon x-large fade>
                {{item.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <span class="headline"> {{item.label}}</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-container>
  </v-navigation-drawer> -->
  <!-- <v-app-bar class="layout-header-bar" clipped-left app dark color="primary">
    <v-toolbar-title class="display-1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" x-large></v-app-bar-nav-icon>
      <span>昌都市交易中心信息查询系统</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar> -->
  <div class="bg"></div>
  <div class="c-head text-center">
    <v-row justify="center" align="end" class="fill-height">
      <v-col>
        <span class="display-2 white--text font-weight-bold">{{$route.meta.title}}</span>
      </v-col>
    </v-row>
  </div>
  <div class="c-body">
    <router-view></router-view>
  </div>

  <v-dialog v-model="closeAppDialog" width="500">
    <v-card>
      <v-card-title class="headline">
        请输入
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="pwd" clearable label="退出密码"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeAppDialog = false" text>
          取消
        </v-btn>
        <v-btn @click="handleOkClick" text color="primary">
          确定
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</v-app>
</template>

<script>
export default {

  data: function () {
    return {
      closeAppDialog: false,
      pwd: '',
      drawer: false,
      navListItems: [
        // {
        //   icon: 'clear',
        //   label: '清除缓存',
        //   handleTap: this.handleClearCache
        // },
        {
          icon: 'exit_to_app',
          label: '退出',
          handleTap: () => {
            this.closeAppDialog = true
          }
        }
      ]
    }
  },
  props: {},
  components: {

  },
  methods: {
    // handleClearCache () {
    //   // 清除缓存
    //   this.$http.get('/api/civic/civicCategory/clear/cache').then(rb => {
    //     if (rb.ok()) {
    //     }
    //   })
    // },

    handleOkClick () {
      if (this.pwd === 'gcs') {
        this.$electron.ipcRenderer.send('close-app')
      }
    }
  },
  mounted: function () {},
  computed: {}
}
</script>

<style>

</style>
