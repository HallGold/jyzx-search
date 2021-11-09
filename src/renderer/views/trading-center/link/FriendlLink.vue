<template>
  <div class="friend-div">
    <div class="friend-head">
      <div class="back">
        <div class="back-btn" @click="goBack">
          <span class="iconfont icon-back"></span>
          <span>返回</span>
        </div>
      </div>
      <div class="title">
        <div>交易中心查询系统——友情链接</div>
      </div>
    </div>
    <div class="friend-foot">
      <v-row>
        <v-col :xs="6" :sm="4" :md="3" :lg="3" v-for="item in links" :key="item.id">
          <div class="link-div" :style="{ backgroundColor: bgColor[(item.id % bgColor.length)] || '#54b78a' }" @click="openWeb(item)">
            <div>{{item.name}}</div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// import { FriendLinkService } from '@/api/friendlink'
export default {
  data () {
    return {
      links: [],
      modalWidth: '100%',
      bgColor: [
        '#2ec7c9',
        '#b6a2de',
        '#5ab1ef',
        '#ffb980',
        '#d87a80',
        '#8d98b3',
        '#e5cf0d',
        '#97b552',
        '#95706d',
        '#dc69aa',
        '#07a2a4',
        '#9a7fd1',
        '#588dd5',
        '#f5994e',
        '#c05050',
        '#59678c',
        '#c9ab00',
        '#7eb00a',
        '#6f5553',
        '#c14089',
        '#f5e8c8'
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        name: 't-home'
      })
    },
    initLink () {
      this.$http.post('/api/friendlink/friendlink/getLink').then(res => {
        if (res.ok()) {
          this.links = res.data
        }
      }).catch(err => {
        console.error(err)
      })
    },
    openWeb (item) {
      this.$router.push({
        name: 't-link-view',
        params: { url: item.url, name: item.name, fromRoute: 't-link' }
      })
    }
  },
  mounted () {
    this.initLink()
  }
}
</script>

<style lang="less">
@import './friend-link.less';
</style>
