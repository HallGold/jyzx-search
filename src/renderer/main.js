import Vue from 'vue'
import axios from '@/plugins/axios/api'

import App from './App'
import router from './router'
import store from './store'
import moment from 'moment'
import _ from 'lodash'

// vuetify
import vuetify from '@/plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// nedb
import db from '@/plugins/nedb'

Vue.prototype.$moment = moment
Vue.prototype.$_ = _
Vue.prototype.$db = db

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  vuetify,
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
