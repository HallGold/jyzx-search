<template>
<v-layout align-center fill-height align-content-center>
  <v-carousel v-if="slides > 0" hide-delimiters hide-delimiter-background :cycle="false" show-arrows delimiter-icon="mdi-minus">
    <v-carousel-item v-for="(slide, i) in slides" :key="i" style="padding:0px 25px 0px 25px">
      <v-container fill-height align-center justify-center>
        <v-flex lg8>
          <v-layout row wrap align-center align-content-center>
            <v-flex align-self-center order-xs8 v-for="(menu,index) in menus.slice((slide-1)*maxCol*maxRow,(slide)*maxRow*maxCol)" :key="`${index}`" :class="'xs'+Math.floor(12/maxCol) ">
              <v-container align-center justify-center>
                <v-scroll-x-transition>
                  <v-card hover @click="handleMenuClick(menu)" elevation="8" :color="menu.bgColor" dark height="24.5vh">
                    <v-layout justify-center fill-height align-content-center column>
                      <v-icon size="6.5vw">{{menu.iconCls}}</v-icon>
                      <v-card-text class="text-center">
                        <h1 class="white--text">{{menu.name}}</h1>
                      </v-card-text>
                    </v-layout>
                  </v-card>
                </v-scroll-x-transition>
              </v-container>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-container>
    </v-carousel-item>
  </v-carousel>
  <v-row v-else align="center" justify="center">
    <v-btn :loading="isLoading" z-index="5" @click="handleRefresh" color="primary" min-width="8vh" min-height="8vh" dark fab x-large>
      <v-icon>refresh</v-icon>
    </v-btn>
  </v-row>
  <!-- <v-btn v-else z-index="5" bottom @click="handleRefresh" color="pink" min-width="8vh" min-height="8vh" dark fab fixed x-large right>
    <v-icon>refresh</v-icon>
  </v-btn> -->
  <v-btn class="display-1 white--text font-weight-bold" color="white" z-index="5" top @click="handleBack" min-width="8vh" min-height="8vh" dark text fixed x-large left>
    <v-icon>iconfont icon-fanhui</v-icon>
    <span>返回</span>
  </v-btn>
</v-layout>
</template>

<script>
export default {

  data: function () {
    return {
      isLoading: false,
      menus: [],
      maxCol: 4,
      maxRow: 2
    }
  },
  props: {
    source: String
  },
  components: {

  },

  methods: {
    init () {
      this.getRootMenu()
    },
    getRootMenu: async function () {
      this.isLoading = true
      let rb = await this.$http.get('/api/civic/civicCategory/root/categories')
      if (rb.ok()) {
        this.menus = rb.data
      }
      this.isLoading = false
    },
    handleBack: function () {
      this.$router.push({
        name: 'main'
      })
    },
    handleRefresh: function () {
      this.getRootMenu()
    },
    handleMenuClick: function (menu) {
      if (menu.name === '中心简介') {
        this.$router.push({
          name: 'brief',
          params: {

          }
        })
      } else {
        this.$router.push({
          name: 'content',
          params: {
            pMenu: {
              ...menu
            }
          }
        })
      }
    }
  },
  mounted: function () {
    this.init()
  },
  computed: {
    slides: function () {
      return Math.ceil(this.menus.length / (this.maxCol * this.maxRow))
    }
  }
}
</script>

<style scoped>
</style>
