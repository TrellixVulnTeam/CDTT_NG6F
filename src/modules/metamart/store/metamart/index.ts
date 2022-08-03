import { ITabInfo, ITabSetting, IMetaTypes } from './../../interface/index'
import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

export interface IAuth {
  listReason: Array<Record<string, any>>
  initInfo: ITabInfo
  initBlockchain: Record<string, any>
  initSetting: ITabSetting
  initMetaData: Record<string, any>
  listCollection: Array<Record<string, any>>
  listCategory: Array<Record<string, any>>
  metaTypes: IMetaTypes[]
  metaDatas: Array<Record<string, any>>
}

const state: IAuth = {
  listReason: [],
  initInfo: {
    itemName: '',
    avatar: '',
    avatarType: '',
    productCode: '',
    thumb: '',
    medias: [],
    collectionId: null,
    categoryId: null,
    shortDescription: '',
    description: '<p><br></p>'
  },
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
  initSetting: {
    serviceFee: '',
    creatorFee: '',
    hotPosition: '',
    topPosition: '',
    statusTop: false,
    statusHot: false
  },
  listCollection: [],
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
