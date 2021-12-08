import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

export interface IAuth {
  listRound: Record<string, any>[]
}

const state: IAuth = {
  listRound: []
}

const crowdsaleBo: Module<IAuth, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default crowdsaleBo
