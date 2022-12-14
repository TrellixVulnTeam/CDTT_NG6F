import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'

const FeeNftRouters: RouteConfig[] = [
  {
    path: '/feenft',
    name: 'FeeNft',
    // redirect: { name: 'FeeNftLynk' },
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
            name: 'MainFeeNft',
            component: () => import('../view/MainView.vue'),
            children: [
              {
                path: 'LYNK',
                name: 'FeeNftLynk',
                component: () => import('../view/FeeNft.vue')
              },
              {
                path: 'CLM',
                name: 'FeeNftClm',
                component: () => import('../view/FeeNft.vue')
              },
              {
                path: 'BTC',
                name: 'FeeNftBtc',
                component: () => import('../view/FeeNft.vue')
              },
              {
                path: 'ETH',
                name: 'FeeNftEth',
                component: () => import('../view/FeeNft.vue')
              },
              {
                path: 'BNB',
                name: 'FeeNftBnb',
                component: () => import('../view/FeeNft.vue')
              },
              {
                path: 'USDT',
                name: 'FeeNftUsdt',
                component: () => import('../view/FeeNft.vue')
              },
              {
                path: 'USDC',
                name: 'FeeNftUsdc',
                component: () => import('../view/FeeNft.vue')
              },
              {
                path: 'BUSD',
                name: 'FeeNftBusd',
                component: () => import('../view/FeeNft.vue')
              },
              {
                path: "OTHERS",
                name: "FeeNftOthers",
                component: () => import('../view/FeeNft.vue')
              }
            ]
          }
        ]
      },
      {
        path: '*',
        redirect: '/feenft'
      }
    ]
  }
]

export default FeeNftRouters
