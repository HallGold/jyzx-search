// 政务服务中心政策查询
import Main from '@/views/policy/main'
export default [
  {
    path: '/p-policy',
    name: 'p-policy',
    component: Main,
    children: [
      {
        path: '/policy/home',
        name: 'p-home',
        meta: {
          title: '政策性文件查询'
        },
        component: require('@/views/policy/home').default
      },
      {
        path: '/policy/gongcheng',
        name: 'p-gongcheng',
        meta: {
          title: '政策性文件查询--工程建设'
        },
        component: require('@/views/policy/gongcheng').default
      },
      {
        path: '/policy/huimin',
        name: 'p-huimin',
        meta: {
          title: '政策性文件查询--惠民政策'
        },
        component: require('@/views/policy/huimin').default
      },
      {
        path: '/policy/zhaoshang',
        name: 'p-zhaoshang',
        meta: {
          title: '政策性文件查询--招商引资'
        },
        component: require('@/views/policy/zhaoshang').default
      },
      {
        path: '/policy/admin',
        name: 'p-admin',
        component: require('@/views/policy/admin').default
      }
    ]
  }
]
