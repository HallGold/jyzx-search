<!--  -->
<script>
import Mixin from '../mixin/index'
export default {
  props: { },
  mixins: [Mixin],
  components: {},
  methods: {
    async pageQuery (pageNum = 1, pageSize = 10) {
      this.loading = true
      let rb = await this.$http.get('/api/civic/civicPolicy/page/by/tag', {
        tag: '工程建设',
        pageNumber: pageNum,
        pageSize: pageSize
      })
      if (rb.ok()) {
        this.tableDatas = rb.data.records
        this.pageOption.page = rb.data.current
        this.pageOption.pageCount = rb.data.pages
      }
      this.loading = false
    }
  }
}
</script>
<style  scoped>
.v-right-sheet {
  height: 100%;
  width: 80%;
  position: fixed;
  overflow-y: auto;
  top: 0;
  right: 0;
  border-radius: 0;
  margin: 0;
  /* overflow: visible; */
}
</style>