<!--  -->
<template>
<v-card hover style="padding-top:5px;padding-bottom:5px;" elevation="8" :color="menu.bgColor || 'primary'" dark>
  <v-layout hover justify-center fill-height align-content-center column @click="handleSubMenuClick(menu)">
    <!-- 图标 -->
    <!-- 文字 -->
    <v-icon size="6.5vw">{{menu.iconCls}}</v-icon>
    <v-card-text class="text-center">
      <h1 class="white--text">{{menu.name}}</h1>
    </v-card-text>
  </v-layout>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn outlined>修改<v-icon small>edit</v-icon>
    </v-btn>
    <v-btn right outlined>删除</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
export default {
  props: {
    menu: Object
  },
  components: {},
  data () {
    return {}
  },
  methods: {
    handleSubMenuClick: function () {
      this.$emit('handle-click', this.menu)
    }
  },
  mounted: function () {},
  computed: {}
}
</script>

<style  scoped>
</style>
