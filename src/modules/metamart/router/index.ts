import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'

const metamartRouters: RouteConfig[] = [
  {
    path: '/metamart',
    name: 'NftMain',
    redirect: { name: 'Nft' },
    component: Layout,
    children: [
      {
        path: '/',
        components: {
          default: LayoutSecond
        },
        children: [
          {
            path: 'nft',
            name: 'Nft',
            component: () => import('../view/Metamart.vue')
          },
          {
            path: 'collection',
            name: 'Collection',
            component: () => import('../view/Metamart.vue')
          }
        ]
      },
      {
        path: '*',
        redirect: '/metamart'
      }
    ]
  }
]

export default metamartRouters
