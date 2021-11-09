<!--  -->
<template>
<v-container fill-height>
  <v-layout justify-start column="">
    <div class=" font-weight-black text-xs-center display-1 primary--text ">{{articleDetail.title}}</div>
    <blockquote class="blockquote" v-html="articleDetail.content">
    </blockquote>
  </v-layout>
  <!-- <v-btn bottom @click="handleBack" min-width="8vh" min-height="8vh" color="pink" dark fab fixed x-large right>
    <v-icon>iconfont icon-fanhui</v-icon>
  </v-btn> -->
</v-container>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {},
  data () {
    return {
      articleDetail: {}
    }
  },
  methods: {
    init () {
      this.articleDetail = {}
      this.getArticleById()
    },
    async getArticleById () {
      if (this.article.id) {
        let rb = await this.$http.get('/api/civic/civicArticle/findById', {
          id: this.article.id
        })
        if (rb.ok()) {
          this.articleDetail = rb.data
        }
      }
    }
    // handleBack: function () {
    //   this.$router.push({
    //     name: 'content'
    //   })
    // }
  },
  mounted: function () {
    this.init()
  },
  computed: {},
  watch: {
    article: function () {
      this.init()
    }
  }
}
</script>

<style>
img {
  max-width: 100% !important;
}
</style>
