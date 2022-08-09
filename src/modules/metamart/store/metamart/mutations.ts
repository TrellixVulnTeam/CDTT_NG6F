import { ITabBlockchain, ITabInfo, ITabSetting, IMetaTypes } from './../../interface/index'
import { filter, forEach, map } from 'lodash'
import { MutationTree } from 'vuex'
import { IAuth } from '.'

const mutations: MutationTree<IAuth> = {
  SET_INIT_NFT: (state, data) => {
    state.initInfo = data
  },
  SET_INIT_METADATA: (state, { data, type }) => {
    state.initMetaData[type] = data
  },
  SET_LIST_COLLECTION: (state, data) => {
    state.listCollection = data
  },
  SET_LIST_CATEGORY: (state, data) => {
    state.listCategory = data
  },
  SET_INIT_FORM_BLOCKCHAIN: (state, collection: ITabBlockchain) => {
    state.initBlockchain = {
      totalSupply: '',
      totalMint: '',
      contractAddress: collection.contractAddress,
      tokenId: '',
      network: collection.network,
      networkName: collection.networkName,
      creatorName: collection.creatorName,
      creatorUsername: collection.creatorUsername,
      creatorId: collection.creatorId
    }
  },
  SET_LIST_META: (state, data) => {
    forEach(data.metaTypes, type => {
      const listData = filter(data.metaDatas, data => type.metaTypeId === data.metaTypeId)
      type.typeTab = listData.length ? listData[0].metaValueType : ''
    })
    const language = localStorage.getItem('bc-lang') || ''
    forEach(data.metaDatas, elm => {
      if (elm.metaValueType === 'TEXT' || elm.metaValueType === 'HTML') {
        const parseJson = JSON.parse(elm.metaValue)
        elm.metaValue = parseJson[language]
      }
    })

    state.metaDatas = data.metaDatas
    state.metaTypes = filter(data.metaTypes, elm => elm.metaType !== 'INFO')
  },
  SET_LIST_METADATA: (state, data) => {
    state.metaDatas = data
  },

  SET_DETAIL_NFT: (
    state,
    data: { initInfo: ITabInfo; initBlockchain: ITabBlockchain; initSetting: ITabSetting; metaTypes: Array<Record<string, any>>; metaDatas: IMetaTypes[] }
  ) => {
    const { initInfo, initBlockchain, initSetting, metaTypes, metaDatas } = data
    state.initInfo = initInfo
    state.initBlockchain = initBlockchain
    state.initSetting = initSetting

    const listId = map(metaDatas, meta => meta.metaTypeId)
    const listIdType = map(metaTypes, meta => meta.metaTypeId)
    console.log(listId)
    console.log(listIdType)

    forEach(metaTypes, type => {
      const listData = filter(metaDatas, data => type.metaTypeId === data.metaTypeId)
      console.log('listData', listData)

      type.typeTab = listData.length ? listData[0].metaValueType : ''
    })
    state.metaDatas = metaDatas
    state.metaTypes = filter(metaTypes, elm => elm.metaType !== 'INFO') as IMetaTypes[]
  },

  RESET_INIT: state => {
    state.initInfo = {
      collectionId: state.listCollection[0].id,
      itemName: '',
      avatar: '',
      avatarType: '',
      productCode: '',
      thumb: '',
      medias: [],
      categoryId: null,
      shortDescription: '',
      description: ''
    }
    state.initBlockchain = {
      totalSupply: '',
      totalMint: '',
      contractAddress: '',
      tokenId: '',
      network: '',
      networkName: '',
      creatorName: '',
      creatorUsername: '',
      creatorId: 0
    }
    state.initSetting = {
      serviceFee: '',
      creatorFee: '',
      hotPosition: '',
      topPosition: '',
      statusTop: false,
      statusHot: false
    }
  }
}
export default mutations
