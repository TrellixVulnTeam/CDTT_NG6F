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
  }
}
export default mutations
