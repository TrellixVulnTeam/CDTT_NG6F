import { ITabInfo, ITabSetting, IMetaTypes, ITabBlockchain } from './../../interface/index'
import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

export interface IAuth {
  listReason: Array<Record<string, any>>
  initInfo: ITabInfo
  initBlockchain: ITabBlockchain
  initSetting: ITabSetting
  initMetaData: Record<string, any>
  listCollection: Array<Record<string, any>>
  listOriginCollection: Array<Record<string, any>>
  listCategory: Array<Record<string, any>>
  metaTypes: IMetaTypes[]
  metaDatas: Array<Record<string, any>>
}

const state: IAuth = {
  listReason: [],
  initInfo: {
    itemName: '',
    avatar: '',
    avatarType: 'IMAGE',
    productCode: '',
    thumb: '',
    medias: [],
    collectionId: null,
    categoryId: null,
    shortDescription: '',
    description: ''
  },
  initBlockchain: {
    totalSupply: '',
    totalMint: '',
    contractAddress: '',
    tokenId: '',
    network: '',
    networkName: '',
    creatorName: '',
    creatorUsername: '',
    creatorId: 0
  },
  initMetaData: {
    description: ''
  },
  initSetting: {
    serviceFee: '',
    creatorFee: '',
    hotPosition: '',
    topPosition: '',
    isTop: false,
    isHot: false
  },
  listCollection: [],
  listOriginCollection: [],
  listCategory: [],
  metaTypes: [],
  metaDatas: []
}

const bcNft: Module<IAuth, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default bcNft
