import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'
Vue.use(Router)
const readContext = function (contexts) {
  let rs = []
  contexts.keys().forEach(key => {
    let _default = contexts(key).default
    if (!_.isNil(_default)) {
      if (_.isArray(_default)) {
        rs.push(..._default)
      } else {
        rs.push(_default)
      }
    }
  })
  return rs
}
const routersContext = require.context('./routers', true, /\.js$/)
let routers = readContext(routersContext)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/views').default
    },
    ...routers,
    {
      path: '*',
      redirect: '/'
    }
  ]
})
