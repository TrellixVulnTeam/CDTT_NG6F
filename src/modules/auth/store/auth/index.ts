import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import Cookies from 'js-cookie'

export interface IAuth {
  access_token: string
  refresh_token: string
  user: Record<string, any>
}

const state: IAuth = {
  access_token: Cookies.get('access_token') || '',
  refresh_token: Cookies.get('refresh_token') || '',
  user: {}
}

const beAuth: Module<IAuth, unknown> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default beAuth
