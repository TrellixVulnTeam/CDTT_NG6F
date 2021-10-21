import request from '@/plugins/request'
import { AuthRepository } from '@/services/repositories/auth/index'
import getRepository from '@/services'
import { ActionTree } from 'vuex'
import { IAuth } from '.'
import Cookies from 'js-cookie'
import { trim } from 'lodash'

const authRes: AuthRepository = getRepository('auth')

const actions: ActionTree<IAuth, unknown> = {
  async login({ commit }, data: { username: string; password: string }) {
    try {
      const result = await authRes.login(data)
      commit('SET_USER_INFO', result)
      request.defaults.headers.common['Authorization'] = `Bearer ${result.accessToken}`
      Cookies.set('access_token', result.accessToken)
      Cookies.set('refresh_token', result.refreshToken)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async refreshToken({ commit, state }) {
    try {
      const data = {
        email: state.user.username,
        refreshToken: state.refresh_token
      }
      const result = await authRes.refreshToken(data)
      if (!result.access_token || trim(result.access_token) === '') {
        return Promise.reject({
          err: 401,
          msg: 'err'
        })
      }
      commit('SET_USER_INFO', result)
      request.defaults.headers.common['Authorization'] = `Bearer ${result.accessToken}`
      Cookies.set('access_token', result.accessToken)
      Cookies.set('refresh_token', result.refreshToken)
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  logout({ commit }) {
    commit('LOG_OUT')
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
  }
}

export default actions
