import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

export interface ISBase {
  popup: string[]
}

const state: ISBase = {
  popup: []
}

const beBase: Module<ISBase, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default beBase
