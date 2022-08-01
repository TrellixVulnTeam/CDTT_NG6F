import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

export interface IAuth {
  listReason: Array<Record<string, any>>
  initInfo: Record<string, any>
  initBlockchain: Record<string, any>
  initMetaData: Record<string, any>
  listCollection: Array<Record<string, any>>
}

const state: IAuth = {
  listReason: [],
  initInfo: {},
  initBlockchain: {
    copies: '',
    contractAddress: '0x1EACE3C7af307A5840c3eF44c5e01547BF2DEf0C',
    tokenId: '#15687',
    network: 'Ethereum',
    tokenStandard: 'ERC1155',
    creator: 'LynKey (lynkey@gmail.com)'
  },
  initMetaData: {
    description: ''
  },
  listCollection: []
}

const bcNft: Module<IAuth, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default bcNft
