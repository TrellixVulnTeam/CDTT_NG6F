import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'

const exceptionRouters: RouteConfig[] = [

  {
    path: '/exception',
    name: 'Exception',
    redirect: { name: 'ExceptionDeposit' },
    component: Layout,
    children: [
      {
        path: '/',
        components: {
          default: LayoutSecond
        },
        children: [
          {
            path: 'deposit',
            name: 'ExceptionDeposit',
            component: () => import('../view/Exception.vue')
          },
          {
            path: 'withdraw',
            name: 'ExceptionWithdraw',
            component: () => import('../view/Exception.vue')
          },
          {
             path: 'crowdsale',
            name: 'ExceptionCrowdsale',
            component: () => import('../view/Exception.vue')
            }
        ]
      },
      {
        path: '*',
        redirect: '/exception'
      }
    ]
  }
]

export default exceptionRouters
