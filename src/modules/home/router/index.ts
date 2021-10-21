import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'

const homeRouters: RouteConfig[] = [
  {
    path: '/kyc',
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
            name: 'Kyc',
            component: () => import('../view/Kyc.vue')
          }
        ]
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  }
]

export default homeRouters
