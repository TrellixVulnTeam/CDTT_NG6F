import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'

const requestRoute: RouteConfig[] = [
  {
    path: '/request',
    name:'Request',
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
            name: 'Request',
            redirect: { name: 'RequestWithdraw' },
            component: () => import('../view/Request.vue'),
            children: [
              {
                path: ':token',
                // redirect: { name: 'RequestWithdraw' },
                component: () => import('../view/Request.vue'),
                children: [
                  {
                    path: 'withdraw',
                    name: 'RequestWithdraw',
                    component: () => import('../view/Request.vue')
                  },
                  {
                    path: 'transfer',
                    name: 'RequestTransfer',
                    component: () => import('../view/Request.vue')
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: '*',
        redirect: '/request'
      }
    ]
  }
]

export default requestRoute
