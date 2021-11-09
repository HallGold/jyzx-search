import TradingMain from '@/views/trading-center/main'
export default [
  {
    path: '/trading-center',
    name: 'trading-center',
    component: TradingMain,
    children: [
      {
        path: '/trading-center/home',
        name: 't-home',
        meta: {
          title: '昌都市交易中心信息查询系统'
        },
        component: () => import('@/views/trading-center/home')
      },
      {
        path: '/trading-center/deal-info',
        name: 't-deal-info',
        meta: {
          title: '交易中心查询系统——交易信息'
        },
        component: () => import('@/views/trading-center/deal')
      },
      {
        path: '/trading-center/law-info',
        name: 't-law-info',
        meta: {
          title: '交易中心查询系统——政策法规'
        },
        component: () => import('@/views/trading-center/law')
      }, {
        path: '/trading-center/workflow',
        name: 't-workflow',
        meta: {
          title: '交易中心查询系统——办事流程'
        },
        component: () => import('@/views/trading-center/workflow')
      }, {
        path: '/trading-center/bidding-result',
        name: 't-bidding-result',
        meta: {
          title: '交易中心查询系统——中标结果'
        },
        component: () => import('@/views/trading-center/bidding')
      }
      // 友情链接

    ]
  },
  {
    path: '/trading-center/introduction',
    name: 't-introduction',
    component: () => import('@/views/trading-center/introduction')
  },
  {
    path: '/trading-center/link',
    name: 't-link',
    props: true,
    component: () => import('@/views/trading-center/link/FriendlLink')
  },
  {
    path: '/trading-center/link-view',
    name: 't-link-view',
    props: true,
    component: () => import('@/views/trading-center/link/WebViewer')
  }
]
