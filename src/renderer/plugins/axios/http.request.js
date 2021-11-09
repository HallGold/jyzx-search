import Axios from 'axios'
import ServerConfig from './config/server.config'
class HttpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      config => {
        return config
      },
      error => {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )
    // 添加响应拦截器
    instance.interceptors.response.use(
      response => response,
      error => Promise.resolve(error.response)
    )
  }
  // 创建实例
  create (options) {
    let conf = {
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=utf-8',
        'X-URL-PATH': location.pathname
      }
    }
    let { url } = options
    for (let profix in ServerConfig.baseProxy) {
      let proxy = ServerConfig.baseProxy[profix]
      if (url.startsWith(profix)) {
        conf.baseURL = proxy.target
        // 正则表达式替换 前缀
        for (let pathRe in proxy.pathRewrite || {}) {
          let val = proxy.pathRewrite[pathRe] || ''
          let regex = new RegExp(pathRe, 'g')
          options.url = options.url.replace(regex, val)
        }
        break
      }
    }
    return Axios.create(conf)
  }
  // 请求实例
  request (options) {
    let instance = this.create(options)
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}
export default HttpRequest
