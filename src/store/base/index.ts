import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

type coinMain = 'CLM' | 'LYNK'
export interface ISBase {
  popup: string[]
  coinMain: coinMain
  urlSystem: Record<string, any>
}

const state: ISBase = {
  popup: [],
  coinMain: 'CLM',
  urlSystem: {}
}

const beBase: Module<ISBase, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default beBase
