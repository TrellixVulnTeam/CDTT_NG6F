import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'

const homeRouters: RouteConfig[] = [
  {
    path: '/kyc',
    name: 'Kyc',
    redirect: { name: 'KycPending' },
    component: Layout,
    children: [
      {
        path: '/',
        components: {
          default: LayoutSecond
        },
        children: [
          {
            path: 'pending',
            name: 'KycPending',
            component: () => import('../view/Kyc.vue')
          },
          {
            path: 'verified',
            name: 'KycVerified',
            component: () => import('../view/Kyc.vue')
          },
          {
            path: 'rejected',
            name: 'KycRejected',
            component: () => import('../view/Kyc.vue')
          }
        ]
      },
      {
        path: '*',
        redirect: '/kyc'
      }
    ]
  }
]

export default homeRouters
