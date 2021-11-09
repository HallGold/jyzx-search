<!--  -->
<template>
<div>
  <div class="c-scoll-list">
    <v-container fill-height>
      <v-layout justify-start column="">
        <blockquote class="blockquote white--text" v-html="articleDetail.content">
        </blockquote>
      </v-layout>
    </v-container>
  </div>
  <v-btn class="display-1 white--text font-weight-bold" color="white" z-index="5" top @click="handleBack" min-width="8vh" min-height="8vh" dark text fixed x-large left>
    <v-icon>iconfont icon-fanhui</v-icon>
    <span>返回</span>
  </v-btn>
</div>
</template>

<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      articleDetail: {
        title: '中心简介',
        content: '<p style="text-align: center;"><span style="font-size: 18pt;"></span></p><p><span style="font-size: 18pt;">昌都市政务服务中心成立是在昌都市委书记阿布同志的亲自关心、指导和市委、市政府的帮助支持下成立的。2016年8月搬迁新址正式对外服务。设立51个服务窗口，整合145项审批和服务事项，有市公安、国税、工商、药监等20家单位、40余名工作人员入驻。中心位于市农牧局办公楼旁，面积约为1000平方米。主要职责是:</span></p><p><span style="font-size: 18pt;">贯彻执行《行政许可法》和上级有关深化行政审批制度改革的决定，协助市有关部门对市级行政许可（审批）项目进行清理、审核、公布、实施;负责对进入政务服务中心集中办理的行政许可项目及其工作流程进行管理、监督和考评，对暂未进入政务服务中心的行政许可（审批）项目办理情况进行监督检查;负责制定政务服务中心运作规范和工作制度并组织实施，会同有关部门推进相对集中行政许可权和行政审批方式创新工作;负责政务服务中心日常工作有序高效运行，维护中心设备设施的正常运转;负责对进驻政务服务中心各窗口单位工作人员的教育、管理、监督和考核；协助有关部门对中心各类群众举报进行核查和处理,指导和推进县、乡两级便民服务中心建设，做好检查考评工作;为企业、项目建设提供&ldquo;绿色通道&rdquo;服务;承办市政府、市政府办公室领导交办的其他工作。</span></p><p><span style="font-size: 18pt;">服务宗旨：公正、公开、便民、高效</span></p><p><span style="font-size: 18pt;">服务理念：优质高效、共创和谐</span></p><p><span style="font-size: 18pt;">服务标准：热情周到、高效服务、依法办事、清正廉洁</span></p><p><span style="font-size: 18pt;">服务方式：一个中心对外、一个窗口受理、一条龙服务、一站式办结</span></p><p><span style="font-size: 18pt;">中心以&ldquo;温暖群众、服务经济、提高效率、塑立形象&rdquo;为宗旨，以&ldquo;优质高效、共创和谐&rdquo;为服务理念，开展各项工作，努力把中心建成为了解社情民意、倾听群众呼声和服务人民群众的服务通道。</span></p><p><span style="font-size: 18pt;">中心一直以&ldquo;高起点、高标准、高质量&rdquo;为要求，全面推进我市便民服务工作的顺利开展。</span></p>'
      }
    }
  },
  methods: {
    handleBack: function () {
      this.$router.push({
        name: 'c-home'
      })
    }
  },
  mounted: function () {},
  computed: {}
}
</script>

<style  scoped>
</style>
