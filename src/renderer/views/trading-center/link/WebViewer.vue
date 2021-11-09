<template>
<div class="webview-div">
  <div class="webview-head">
    <div class="back">
      <div class="back-btn" @click="goBack">
        <span class="iconfont icon-back"></span>
        <span>返回</span>
      </div>
      <div class="title" style="float: right">{{name}}</div>
    </div>
  </div>
  <div class="webview-foot" style="background-color:#d4ebf3">
    <!-- <v-overlay  opacity="0.5" absolute :value="spinFlag">
      <v-card color="primary" dark width="300">
        <v-card-text>
          数据加载中...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-overlay> -->
    <webview :src="currentUrl" style="width: 100%; height: 100%"></webview>
  </div>
</div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    fromRoute: {
      type: String,
      default: 't-home'
    }
  },
  data () {
    return {
      currentUrl: this.url,
      spinFlag: false
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        name: this.fromRoute
      })
    },
    loadstart: function () {
      console.log(223)
      this.spinFlag = true
    },
    loadstop: function () {
      console.log(22)
      this.spinFlag = false
    }
  },
  mounted () {
    this.$nextTick(() => {
      const webview = document.querySelector('webview')
      webview.addEventListener('did-start-loading', this.loadstart)
      webview.addEventListener('did-stop-loading', this.loadstop)
      webview.addEventListener('new-window', (e) => {
        const protocol = require('url').parse(e.url).protocol
        if (protocol === 'http:' || protocol === 'https:') {
          this.currentUrl = e.url
          webview.reload()
        }
      })
      this.spinFlag = false
    })
  },
  destroyed () {
    const webview = document.querySelector('webview')
    if (webview) {
      webview.removeEventListener('did-start-loading', this.loadstart)
      webview.removeEventListener('did-stop-loading', this.loadstop)
      webview.removeEventListener('new-window', (e) => {
        const protocol = require('url').parse(e.url).protocol
        if (protocol === 'http:' || protocol === 'https:') {
          this.currentUrl = e.url
          webview.reload()
        }
      })
    }
  }
}
</script>

<style lang="less">
@import './web-viewer.less';
</style>
