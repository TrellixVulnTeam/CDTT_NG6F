import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'

const customerRouters: RouteConfig[] = [
  {
    path: '/customer',
    name: 'CustomerMain',
    redirect: { name: 'CustomerAll' },
    component: Layout,
    children: [
      {
        path: '/',
        components: {
          default: LayoutSecond
        },
        children: [
          {
            path: 'all',
            name: 'CustomerAll',
            component: () => import('../view/CustomerKyc.vue')
          },
          {
            path: 'verified',
            name: 'CustomerVerified',
            component: () => import('../view/CustomerKyc.vue')
          },
          {
            path: 'processing',
            name: 'CustomerProcessing',
            component: () => import('../view/CustomerKyc.vue')
          },
          {
            path: 'not-verified',
            name: 'CustomerNotVerified',
            component: () => import('../view/CustomerKyc.vue')
          },
          {
            path: 'locked',
            name: 'CustomerLocked',
            component: () => import('../view/CustomerKyc.vue')
          }
        ]
      },
      {
        path: '*',
        redirect: '/customer'
      }
    ]
  }
]

export default customerRouters
