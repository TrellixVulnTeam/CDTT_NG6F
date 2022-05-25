import { RoleActions } from './../src/interface/role'
import Vue from 'vue'
type LIST_MODULE = 'crowd-sale' | 'kyc' | 'customer' | 'balance' | 'request' | 'transaction' | 'exception' | 'setting' | 'fee'

declare module 'vue/types/vue' {
  interface Vue {
    districtId: number
    checkPemission(module: LIST_MODULE, roles: Array<RoleActions>): boolean
  }
}
