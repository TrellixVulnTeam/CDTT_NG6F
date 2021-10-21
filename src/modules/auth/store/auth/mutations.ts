import { MutationTree } from 'vuex'
import { IAuth } from '.'

const mutations: MutationTree<IAuth> = {
  SET_USER_INFO: (state, data) => {
    state.user = data
    state.access_token = data.accessToken
    state.refresh_token = data.refreshToken
  },
  LOG_OUT: state => {
    state.user = {}
    state.access_token = ''
    state.refresh_token = ''
  }
}
export default mutations
