import { MutationTree } from 'vuex'
import { IAuth } from '.'

const mutations: MutationTree<IAuth> = {
  SET_LIST_ROUND: (state, listRound) => {
    state.listRound = listRound
  }
}
export default mutations
