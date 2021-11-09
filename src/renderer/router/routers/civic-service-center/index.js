import Main from '@/views/civic-service-center/main'
export default [
  {
    path: '/civic-service-center',
    name: 'civic-service-center',
    component: Main,
    // redirect: '/civic-service-center/home',
    children: [
      {
        path: '/civic-service-center/home',
        name: 'c-home',
        meta: {
          title: '昌都市政务服务中心信息查询系统'
        },
        component: require('@/views/civic-service-center/home').default
      },
      {
        path: '/civic-service-center/brief',
        name: 'brief',
        meta: {
          title: '昌都市政务服务中心简介'
        },
        props: true,
        component: () => import('@/views/civic-service-center/brief')
      },
      // {
      //   path: '/civic-service-center/content',
      //   name: 'content',
      //   meta: {
      //   },
      //   props: true,
      //   component: () => import('@/views/civic-service-center/content')
      // },
      {
        path: '/civic-service-center/content/detail',
        name: 'detail',
        meta: {},
        props: true,
        component: () => import('@/views/civic-service-center/content/detail')
      }
    ]
  },
  {
    path: '/civic-service-center/content',
    name: 'content',
    meta: {},
    props: true,
    component: () => import('@/views/civic-service-center/content')
  },
  {
    path: '/civic-service-center/admin',
    name: 'admin',
    component: require('@/views/civic-service-center/admin').default
  },
  {
    path: '/civic-service-center/admin/articles',
    name: 'articleList',
    props: true,
    component: require('@/views/civic-service-center/admin/detail/list')
      .default
  },
  {
    path: '/civic-service-center/admin/articles/form',
    name: 'articleForm',
    props: true,
    meta: {
      keepAlive: false
    },
    component: require('@/views/civic-service-center/admin/detail/form')
      .default
  }
]
