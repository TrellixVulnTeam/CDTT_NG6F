import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

type coinMain = 'CLM' | 'LYNK'
type email = 'support@cleverme.com' | 'support@lynkey.com'
type address = '9999 Bellaire Blvd, Ste 8B-1, Houston, TX 77036 (USA)' | '@Linkey Holdings Pte. Ltd. 2021'
export interface ISBase {
  popup: string[]
  coinMain: coinMain
  email: email
  address: address
}

const state: ISBase = {
  popup: [],
  coinMain: 'CLM',
  email: 'support@lynkey.com',
  address: '9999 Bellaire Blvd, Ste 8B-1, Houston, TX 77036 (USA)'
}

const beBase: Module<ISBase, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default beBase
