import { filter, forEach } from 'lodash'
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
  SET_LIST_META: (state, data) => {
    forEach(data.metaTypes, type => {
      const listData = filter(data.metaDatas, data => type.metaTypeId === data.metaTypeId)
      type.typeTab = listData.length ? listData[0].metaValueType : ''
    })
    state.metaDatas = data.metaDatas
    state.metaTypes = filter(data.metaTypes, elm => elm.metaType !== 'INFO')
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
  }
}
export default mutations
