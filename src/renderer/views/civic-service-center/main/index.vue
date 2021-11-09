<template>
<v-app absolute dark style="background:none">
  <!-- 昌都市政务服务中心信息查询系统 -->
  <!-- -->
  <div class="bg"></div>
  <div class="c-head text-center">
    <v-row justify="center" align="end" class="fill-height">
      <v-col>
        <span class="display-2 white--text font-weight-bold">{{$route.meta.title}}</span>
      </v-col>
    </v-row>
  </div>
  <div class="c-body">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
        //   icon: 'desktop_windows',
        //   label: '内容管理',
        //   handleTap: this.handleGoAdmin
        // },
        // {

        // },
        // {
        //   icon: 'setting',
        //   label: '设置',
        //   handleTap: this.handleGoAdmin
        // },
        {
          icon: 'clear',
          label: '清除缓存',
          handleTap: this.handleClearCache
        },
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
    handleClearCache () {
      // 清除缓存
      this.$http.get('/api/civic/civicCategory/clear/cache').then(rb => {
        if (rb.ok()) {}
      })
    },
    handleGoAdmin () {
      this.$router.push({
        name: 'admin'
      })
    },

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
