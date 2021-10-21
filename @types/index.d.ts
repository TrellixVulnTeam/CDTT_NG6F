import Vue from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    districtId: number
    checkPemission(module: string, roles: Array<'view' | 'edit' | 'remove'>): boolean
  }
}
