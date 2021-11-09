<template>
<v-app>
  <div class="intro-div">
    <div class="intro-logo">
      <v-row>
        <v-col>
          <div class="logo-left">
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
    <div class="intro-menu">
      <div class="menu-left">
        <ul>
          <li><a href="#first">昌都市公共资源交易中心</a></li>
        </ul>
      </div>
      <div class="menu-right">
        <div class="back-btn" @click="goBack">
          <span class="iconfont icon-back"></span>
          <span>返回</span>
        </div>
      </div>
    </div>
    <div id="first" class="intro-content">
      <v-row :gutter="16" id="row">
        <v-col span="18">
          <div class="about-word">
            <h3>关于我们</h3>
            <div v-html="about"></div>
          </div>
        </v-col>
        <v-col span="6">
          <div class="contact-word">
            <h3>联系方式</h3>
            <div v-html="contact"></div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</v-app>
</template>

<script>
export default {
  data () {
    return {
      about: '暂无',
      contact: '暂无'
    }
  },
  computed: {
    replaceStr () {
      return 'http://jyzx.changdu.gov.cn'
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        name: 't-home'
      })
    },
    initIntroduction () {
      this.$http.post('/api/article/article/getIntroduction', ['关于我们', '联系方式']).then(res => {
        for (let obj of res.data) {
          obj.content = obj.content.replace(/\${pathurl}/g, `${this.replaceStr}`)
          obj.content = obj.content.replace(/src="\/data/g, `src="${this.replaceStr}/data`)
          obj.content = obj.content.replace(/href="\/data/g, `href="${this.replaceStr}/data`)
          obj.content = obj.content.replace(/target="_blank"/g, '')
          obj.content = obj.content.replace(/<a/g, '<span class="ele-a" style="color: blue; text-decoration:underline; cursor: pointer"')
          obj.content = obj.content.replace(/<\/a/g, '</span')
        }
        if (res.ok()) {
          if (res.data[0].title === '关于我们') {
            this.about = res.data[0].content
            this.contact = res.data[1].content
          } else {
            this.about = res.data[1].content
            this.contact = res.data[0].content
          }
        }
      })
    },
    toltipMethod () {
      let app = document.getElementById('row')
      app.addEventListener('click', () => {
        let ev = window.event // 可以打印整个ev看看
        if (ev.srcElement.className === 'ele-a') {
          console.log(ev.srcElement.attributes[2].nodeValue)
          this.$router.push({
            name: 't-link-view',
            params: {
              url: ev.srcElement.attributes[2].nodeValue,
              name: '网页',
              fromRoute: 'introduction'
            }
          })
        }
      })
    }
  },
  mounted () {
    this.initIntroduction()
    this.$nextTick(() => {
      this.toltipMethod()
    })
  }
}
</script>

<style lang="less">
@import './introduction.less';
</style>
