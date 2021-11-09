<!--  -->
<template>
<div>
  <div style="text-align: center;">
    <h1 class="headline">
      <Icon v-if="convertedData.elite" custom="iconfont icon-elite" size=23 color="red"></Icon>
      <span style="margin-left: 10px">{{convertedData.title}}</span>
    </h1>
    <h2 class="headline" v-if="!$_.isNil(convertedData.subtitle) && convertedData.subtitle !== ''">{{convertedData.subtitle}}</h2>
  </div>
  <div>
    <div class="headline" v-if="!$_.isNil(convertedData.author) && convertedData.author !== ''">【作者：{{convertedData.author}}】</div>
    <div class="headline" v-if="!$_.isNil(convertedData.addtime)">【发布时间：{{$moment.unix(convertedData.addtime).format('YYYY-MM-DD')}}】</div>
    <div class="headline" v-if="!$_.isNil(convertedData.source) && convertedData.source !== ''">【来源：{{convertedData.source}}】</div>
  </div>
  <div v-if="!$_.isNil(convertedData.summary) && convertedData.summary !== ''" style="margin-bottom: 10px;">
    <h3 class="headline">简介</h3>
    <div class="headline">{{convertedData.summary}}</div>
  </div>
  <h3 class="headline">正文:</h3>
  <div id="drawer" v-html="convertedData.content"></div>
</div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object
    },
    fromRoute: {
      type: String,
      default: 't-home'
    }
  },
  components: {},
  data () {
    return {}
  },
  methods: {
    toltipMethod () {
      let app = document.getElementById('drawer')
      app.addEventListener('click', () => {
        let ev = window.event // 可以打印整个ev看看
        if (ev.srcElement.className === 'ele-a') {
          this.$router.push({
            name: 't-link-view',
            params: {
              url: ev.srcElement.attributes[2].nodeValue,
              name: '网页',
              fromRoute: this.fromRoute
            }
          })
        }
      })
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.toltipMethod()
    })
  },
  computed: {
    replaceStr () {
      return 'http://jyzx.changdu.gov.cn'
    },
    convertedData () {
      let data = Object.assign({}, this.article)
      if (!this.$_.isNil(data.content)) {
        data.content = data.content.replace(/\${pathurl}/g, `${this.replaceStr}`)
        data.content = data.content.replace(/src="\/data/g, `src="${this.replaceStr}/data`)
        data.content = data.content.replace(/href="\/data/g, `href="${this.replaceStr}/data`)
        data.content = data.content.replace(/target="_blank"/g, '')
        data.content = data.content.replace(/<a/g, '<span class="ele-a" style="color: blue; text-decoration:underline; cursor: pointer"')
        data.content = data.content.replace(/<\/a/g, '</span')
        data.content = data.content.replace(/font-size:\s*\d*px+/g, 'font-size:1.5em;')
      }
      return data
    }
  }
}
</script>

<style>
img {
  max-width: 100% !important;
}
</style>
