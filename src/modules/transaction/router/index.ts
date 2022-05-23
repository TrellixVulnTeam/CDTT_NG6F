import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'

const transactionRouters: RouteConfig[] = [
  {
    path: '/transaction',
    name: 'Transaction',
    redirect: { name: 'TransactionDeposit' },
    component: Layout,
    children: [
      {
        path: '/',
        components: {
          default: LayoutSecond
        },
        children: [
          {
            path: ':token',
            name: 'TransactionLynk',
            component: () => import('../view/Transaction.vue'),
            children: [
              {
                path: 'Deposit',
                name: 'TransactionDeposit',
                component: () => import('../view/Transaction.vue')
              },
              {
                path: 'Withdraw',
                name: 'TransactionWithdraw',
                component: () => import('../view/Transaction.vue')
              },
              {
                path: 'Transfer',
                name: 'TransactionTransfer',
                component: () => import('../view/Transaction.vue')
              },
              {
                path: 'Bonus',
                name: 'TransactionBonus',
                component: () => import('../view/Transaction.vue')
              },
              {
                path: 'crowdsale',
                name: 'TransactionCrowdsale',
                component: () => import('../view/Transaction.vue')
              }
            ]
          }

        ]
      },
      {
        path: '*',
        redirect: '/transaction'
      }
    ]
  }
]

export default transactionRouters
