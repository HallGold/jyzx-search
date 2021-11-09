<!--  -->
<template>
<v-app absolute dark>
  <v-app-bar class="layout-header-bar" clipped-left app dark color="primary">
    <v-btn icon dark @click="handleBack">
      <v-icon>close</v-icon>
    </v-btn>
    <v-toolbar-title>{{this.article && this.article.id ? '修改':'新增'}}文章</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text dark @click="handleSave">
      保存
      <v-icon>save</v-icon>
    </v-btn>
  </v-app-bar>
  <v-content fill-height justify-start align-start>
    <v-container>
      <v-layout column fill-height>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="title" clearable :rules="formRules.title" label="标题" required></v-text-field>
          <editor v-model="content" :init="editorConfig"></editor>
        </v-form>
      </v-layout>
    </v-container>
  </v-content>
  <v-overlay :value="loading" z-index="4">
    <v-card color="primary" dark width="300">
      <v-card-text>
        正在保存中...
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-overlay>
  <v-snackbar v-model="snackbar" color="success" :timeout="6000" top>
    操作成功
    <v-btn dark text @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</v-app>
</template>

<script>
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'
import 'tinymce/tinymce'
import 'tinymce/themes/silver/theme.min.js'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/print'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/code'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/wordcount'
import '@/plugins/tinymce/langs/zh_CN.js'

import Editor from '@tinymce/tinymce-vue'
export default {
  props: {
    sourceRoute: Object,
    category: Object,
    article: {
      default: function () {
        return {}
      }
    }
  },
  components: {
    Editor
  },
  data () {
    return {
      valid: true,
      snackbar: false,
      loading: false,
      showEditor: false,
      content: '',
      title: '',
      formRules: {
        title: [
          v => !!v || '标题不能为空'
        ]
      },
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
    handleBack: function () {
      console.log(this.sourceRoute)
      this.$router.push({
        name: 'articleList',
        params: {
          ...(this.sourceRoute || {}).params
        }
      })
    },
    async handleSave () {
      if (this.$refs.form.validate()) {
        this.loading = true
        let data = Object.assign({}, this.article || {}, {
          title: this.title,
          content: this.content,
          catId: this.category.id
        })
        console.log(data)
        // 调用保存文章接口
        let rb = await this.$http.post('/api/civic/civicArticle/saveInfo', data)
        if (rb.ok()) {
          this.snackbar = true
          // this.handleBack()
        } else {
          // 弹出错误信息
        }
        this.loading = false
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    init () {
      if (this.article && this.article.id) {
        this.content = this.article.content
        this.title = this.article.title
      }
    }
  },
  mounted: function () {
    this.init()
  },
  computed: {}
}
</script>

<style  scoped>
</style>
