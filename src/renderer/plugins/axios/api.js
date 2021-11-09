import axios from '@/plugins/axios'
const HttpErrorCode = {
  400: '请求错误',
  401: '未授权，请登陆',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
}
function checkStatus (response = {}) {
  let { status, statusText } = response
  if (status === 200 || status === 304) {
    return response.data
  } else {
    let msg = statusText || HttpErrorCode[status]
    return {
      status: -1,
      code: status,
      msg: msg
    }
  }
}

function checkResult (result) {
  let { status } = result
  result.ok = function () {
    return false
  }
  if (status === 0) {
    result.ok = function () {
      return true
    }
  }
  if (status === -1) {
    // 请求数据失败
    // 提示错误信息
  }
  return result
}

export default {
  get: (url, params = {}) => {
    return axios
      .request({
        url: url,
        params,
        method: 'get'
      })
      .then(checkStatus)
      .then(checkResult)
  },
  uploadFile: (url, data) => {
    let options = {
      url: url,
      data,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-URL-PATH': location.pathname
      }
    }
    return axios
      .request(options)
      .then(checkStatus)
      .then(checkResult)
  },
  post: (url, data, hasParams = false) => {
    let options = {
      url: url,
      data,
      method: 'post'
    }
    if (hasParams) {
      options.params = data
    }
    return axios
      .request(options)
      .then(checkStatus)
      .then(checkResult)
  },
  delete: (url, params) => {
    return axios
      .request({
        url: url,
        params,
        method: 'delete'
      })
      .then(checkStatus)
      .then(checkResult)
  },
  put: (url, data, hasParams = false) => {
    let options = {
      url: url,
      data,
      method: 'put'
    }
    if (hasParams) {
      options.params = data
    }
    return axios
      .request(options)
      .then(checkStatus)
      .then(checkResult)
  }
}
