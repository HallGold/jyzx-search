<!-- 
 -->
<template>
<v-container fluid>
  <!-- <table></table> -->
  <v-row fill-height justify="center">
    <v-col xs8>
      <v-form ref="form" v-model="formOption.valid" lazy-validation>
        <v-text-field v-model="policyForm.title" clearable :rules="formOption.rules.title" label="标题" required></v-text-field>
        <!--  -->
        <v-select v-model="policyForm.tags" :items="policyClassifies" label="标签" :rules="formOption.rules.tags"></v-select>
        <!-- 关键词 -->
        <v-text-field v-model="policyForm.keywords" clearable label="关键词" required></v-text-field>
        <!-- 发文号 -->
        <v-text-field v-model="policyForm.sentCode" clearable label="发文字号" required></v-text-field>
        <!-- 发布时间 -->
        <v-date-picker
          ref="picker"
          v-model="policyForm.deliveryTime"
          full-width
        ></v-date-picker>

        <v-divider ></v-divider>
        <!-- 内容 -->
        <editor v-model="policyForm.content" :init="editorConfig"></editor>
      </v-form>
    </v-col>
  </v-row>
  <v-row>
    <v-col align="center">
      <v-btn :loading="loading" large @click="handleSave" color="indigo" dark>保存</v-btn>
    </v-col>
  </v-row>
  <v-snackbar v-model="snackBarOption.show" :color="snackBarOption.color || 'success'" :timeout="6000" top>
    {{snackBarOption.message}}
    <v-btn dark text @click="snackBarOption.show = false">
      Close
    </v-btn>
  </v-snackbar>
  <!-- form -->
  <v-btn z-index="5" bottom @click="handleBack" color="pink" min-width="8vh" min-height="8vh" dark fab fixed x-large right>
    <v-icon>iconfont icon-fanhui</v-icon>
  </v-btn>
</v-container>
</template>

<script>
import '@/plugins/tinymce'
import Editor from '@tinymce/tinymce-vue'
export default {
  props: {},
  components: {
    Editor
  },
  data () {
    return {
      tableOption: {
        datas: []
      },
      snackBarOption: {
        show: false,
        message: '',
        color: null
      },
      policyClassifies: [
        '工程建设',
        '惠民政策',
        '招商引资'
      ],
      pageOptions: {

      },
      formOption: {
        valid: true,
        rules: {
          title: [
            v => !!v || '标题不能为空'
          ],
          tags: [
            v => !!v || '标签不能为空'
          ]
        }
      },
      policyForm: {
        title: '',
        content: ''
      },
      loading: false,
      editorConfig: {
        selector: 'textarea', // change this value according to your HTML
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste imagetools wordcount'
        ],
        height: 600,
        language: 'zh_CN',
        toolbar: 'code | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |  image',
        images_upload_handler: (blobInfo, success, failure) => {
          // 调用上传图片接口
          let formData = new FormData()
          formData.append('file', blobInfo.blob(), blobInfo.filename())
          this.$http.uploadFile('/api/file/upload/img', formData).then(rb => {
            if (rb.ok()) {
              success('http://jyzx.changdu.gov.cn/cms-search' + rb.data)
            } else {
              failure()
            }
          })
        }
      }
    }
  },
  methods: {
    async pageQueryData (pageIndex = 1, pageSize = 10) {
      let rb = await this.$http.post('/api/civic/civicPolicy/page')
      if (rb.ok()) {
        this.tableOption.datas = rb.data.records
        this.pageOption.page = rb.data.current
        this.pageOption.pageCount = rb.data.pages
      }
    },
    handleBack: function () {
      this.$router.push({
        name: 'p-home'
      })
    },
    handleSave: async function () {
      if (this.$refs.form.validate()) {
        let data = Object.assign({}, this.policyForm)
        if (data.deliveryTime) {
          data.deliveryTime = this.$moment(data.deliveryTime).add(12, 'h').format('YYYY-MM-DD HH:mm:ss')
        }
        this.loading = true
        console.log(data)
        let rb = await this.$http.post('/api/civic/civicPolicy/save', data)
        if (rb.ok()) {
          this.policyForm.content = ''
          this.policyForm.sentCode = ''
          this.policyForm.keywords = ''
          this.snackBarOption = {
            show: true,
            message: '操作成功',
            color: 'success'
          }
        } else {
          // 弹出错误信息
          this.snackBarOption = {
            show: true,
            message: rb.msg || '操作失败',
            color: 'error'
          }
        }
        this.loading = false
      }
    }
  },
  mounted: function () {
    this.pageQueryData()
  },
  computed: {}
}
</script>

<style  scoped>
</style>
