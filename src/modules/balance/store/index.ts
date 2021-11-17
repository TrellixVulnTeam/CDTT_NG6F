import { Module } from 'vuex'
import bcBalance from './kyc'

const BalanceStores: Record<string, Module<any, any>> = {
  bcBalance
}

export default BalanceStores
