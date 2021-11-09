<!--  -->
<template>
<div>
  <v-app style="background:none">
    <v-content>
      <div class=" bg"></div>
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col sm="12" align="center" v-for="(item, index) in menus" :key="index">
            <v-row align="center" justify="center">
              <v-col sm='6'>
                <v-btn @click="item.onTap" block class="layout-header-bar" large tile :color="item.color" dark> <span class="headline">{{item.name}}</span></v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-btn class="display-1 white--text font-weight-bold" color="white" z-index="5" top @click="pwd='';closeAppDialog=true" min-width="8vh" min-height="8vh" dark text fixed x-large right>
      <span>退出系统</span>
      <v-icon x-large>exit_to_app</v-icon>
    </v-btn>
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
</div>
</template>

<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      closeAppDialog: false,
      pwd: '',
      menus: [{
        name: '昌都市政务服务中心信息查询',
        color: 'indigo',
        onTap: this.goCivicServiceCenter
      },
      {
        name: '昌都市交易中心信息查询',
        color: 'primary',
        onTap: this.goTradingCenter
      },
      {
        name: '政策性文件查询',
        color: 'primary',
        onTap: this.goPolicyCenter
      }
      ]

    }
  },
  methods: {

    handleOkClick () {
      if (this.pwd === 'gcs') {
        this.$electron.ipcRenderer.send('close-app')
      }
    },
    goPolicyCenter: function () {
      this.$router.push({
        name: 'p-home'
      })
    },
    goCivicServiceCenter: function () {
      this.$router.push({
        name: 'c-home'
      })
    },
    goTradingCenter: function () {
      this.$router.push({
        name: 't-home'
      })
    }
  },
  mounted: function () {},
  computed: {}
}
</script>

<style scoped>
/* layout-header-bar */
</style>
