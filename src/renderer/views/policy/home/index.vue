<template>
<!-- <v-layout align-center fill-height align-content-center>
 
</v-layout> -->
<v-row justify="center" align="top">
   <v-carousel v-if="slides > 0" hide-delimiters hide-delimiter-background :cycle="false" :show-arrows="menus.length !== maxCol*maxRow" delimiter-icon="mdi-minus">
    <v-carousel-item v-for="(slide, i) in slides" :key="i" style="padding:0px 25px 0px 25px">
      <v-container fill-height align-center justify-center>
        <v-flex lg8>
          <v-layout row wrap align-center align-content-center>
            <v-flex align-self-center order-xs8 v-for="(menu,index) in menus.slice((slide-1)*maxCol*maxRow,(slide)*maxRow*maxCol)" :key="`${index}`" :class="'xs'+Math.floor(12/maxCol) ">
              <v-container align-center justify-center>
                <v-scroll-x-transition>
                  <v-card hover @click="handleMenuClick(menu)" elevation="8" :color="menu.bgColor" dark height="24.5vh">
                    <v-layout justify-center fill-height align-content-center column>
                      <!-- 图标 -->
                      <!-- 文字 -->
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
  <v-btn class="display-1 white--text font-weight-bold" color="white" z-index="5" top @click="handleBack"  min-width="8vh" min-height="8vh" dark text fixed x-large left>
    <v-icon >iconfont icon-fanhui</v-icon>
    <span >返回</span>
  </v-btn>
</v-row>
</template>

<script>
export default {

  data: function () {
    return {
      isLoading: false,
      menus: [{
        iconCls: 'iconfont icon-gongchengjianshe1',
        name: '工程建设',
        bgColor: '#32bbb3',
        routeName: 'p-gongcheng'
      },
      {
        iconCls: 'iconfont icon-huiminzhengce',
        name: '惠民政策',
        bgColor: '#31b8f0',
        routeName: 'p-huimin'
      },
      {
        iconCls: 'iconfont icon-weibiaoti--',
        name: '招商引资',
        routeName: 'p-zhaoshang',
        bgColor: '#FA8072'
      }
      ],
      maxCol: 3,
      maxRow: 1
    }
  },
  props: {
    source: String
  },
  components: {

  },

  methods: {
    handleBack: function () {
      this.$router.push({
        name: 'main'
      })
    },
    handleRefresh: function () {
      this.getRootMenu()
    },
    handleMenuClick: function (menu) {
      this.$router.push({
        name: menu.routeName
      })
    }
  },
  mounted: function () {},
  computed: {
    slides: function () {
      return Math.ceil(this.menus.length / (this.maxCol * this.maxRow))
    }
  }
}
</script>

<style scoped>
</style>
