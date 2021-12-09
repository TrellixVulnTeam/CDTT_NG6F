import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'

const balanceRouters: RouteConfig[] = [
  {
    path: '/balance',
    name: 'Balance',
    redirect: { name: 'BalanceLynk' },
    component: Layout,
    children: [
      {
        path: '/',
        components: {
          default: LayoutSecond
        },
        children: [
          {
            path: '/',
            name: 'MainBalance',
            component: () => import('../view/MainView.vue'),
            children: [
              {
                path: 'LYNK',
                name: 'BalanceLynk',
                component: () => import('../view/Balance.vue')
              },
              {
                path: 'CLM',
                name: 'BalanceClm',
                component: () => import('../view/Balance.vue')
              },
              {
                path: 'BTC',
                name: 'BalanceBtc',
                component: () => import('../view/Balance.vue')
              },
              {
                path: 'ETH',
                name: 'BalanceEth',
                component: () => import('../view/Balance.vue')
              },
              {
                path: 'BNB',
                name: 'BalanceBnb',
                component: () => import('../view/Balance.vue')
              },
              {
                path: 'USDT',
                name: 'BalanceUsdt',
                component: () => import('../view/Balance.vue')
              },
              {
                path: 'USDC',
                name: 'BalanceUsdc',
                component: () => import('../view/Balance.vue')
              }
            ]
          }
        ]
      },
      {
        path: '*',
        redirect: '/balance'
      }
    ]
  }
]

export default balanceRouters
