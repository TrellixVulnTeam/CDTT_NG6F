import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'

const crowdsaleRoute: RouteConfig[] = [
  {
    path: '/crowd-sale',
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
            name: 'Crowdsale',
            redirect: { name: 'CrowdsaleTransactions' },
            component: () => import('../view/Crowdsale.vue'),
            children: [
              {
                path: 'transaction',
                name: 'CrowdsaleTransactions',
                component: () => import('../view/Transactions.vue')
              },
              {
                path: 'round',
                name: 'CrowdsaleRound',
                component: () => import('../view/Round.vue')
              },
              {
                path: 'setting',
                name: 'CrowdsaleSetting',
                component: () => import('../view/SettingRound.vue')
              }
            ]
          }
        ]
      },
      {
        path: '*',
        redirect: '/crowd-sale'
      }
    ]
  }
]

export default crowdsaleRoute
