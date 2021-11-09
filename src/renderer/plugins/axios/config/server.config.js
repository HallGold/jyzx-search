const ServerProxy = {
  /**
   * 开发环境
   */
  devProxy: {
    // '/api': {
    //   target: 'http://127.0.0.1:8088',
    //   pathRewrite: {
    //     '^/api': ''
    //   }
    // }
    '/api': {
      target: 'http://jyzx.changdu.gov.cn',
      pathRewrite: {
        '^/api': 'cms-search'
      }
    }
  },
  /**
   * 生产环境
   */
  proProxy: {
    '/api': {
      target: 'http://jyzx.changdu.gov.cn',
      pathRewrite: {
        '^/api': 'cms-search'
      }
    }
  }
}

export default {

  baseProxy:
    process.env.NODE_ENV === 'production'
      ? ServerProxy.proProxy
      : ServerProxy.devProxy
}
