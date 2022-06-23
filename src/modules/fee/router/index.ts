import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'

const feeRouters: RouteConfig[] = [
  {
    path: '/fee',
    name: 'Fee',
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
            name: 'MainFee',
            component: () => import('../view/MainView.vue'),
            children: [
              {
                path: 'CLM',
                name: 'FeeClm',
                component: () => import('../view/Fee.vue')
              },
              {
                path: 'LYNK',
                name: 'FeeLynk',
                component: () => import('../view/Fee.vue')
              },
              
              {
                path: 'BTC',
                name: 'FeeBtc',
                component: () => import('../view/Fee.vue')
              },
              {
                path: 'ETH',
                name: 'FeeEth',
                component: () => import('../view/Fee.vue')
              },
              {
                path: 'BNB',
                name: 'FeeBnb',
                component: () => import('../view/Fee.vue')
              },
              {
                path: 'USDT',
                name: 'FeeUsdt',
                component: () => import('../view/Fee.vue')
              },
              {
                path: 'USDC',
                name: 'FeeUsdc',
                component: () => import('../view/Fee.vue')
              },
              {
                path: 'BUSD',
                name: 'FeeBusd',
                component: () => import('../view/Fee.vue')
              }
            ]
          }
        ]
      },
      {
        path: '*',
        redirect: '/fee'
      }
    ]
  }
]

export default feeRouters
