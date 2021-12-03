import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

type coinMain = 'CLM' | 'LYNK'
export interface ISBase {
  popup: string[]
  coinMain: coinMain
  urlSystem: Record<string, any>
  siteKey: string
}

const state: ISBase = {
  popup: [],
  coinMain: 'CLM',
  urlSystem: {},
  // site key live
  // siteKey: '6Ld51lIdAAAAAEF0cK0CBRSL9H_nnGWJfKUYmcHz'
  // site key test
  siteKey: '6LcbbKAcAAAAAGS9BixBvH4okIBVNsY7lywPDleX'
}

const beBase: Module<ISBase, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default beBase
