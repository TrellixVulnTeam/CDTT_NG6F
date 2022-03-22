import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

export interface IAuth {
  listReason: Array<Record<string, any>>
}

const state: IAuth = {
  listReason: []
}

const memberKyc: Module<IAuth, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default memberKyc