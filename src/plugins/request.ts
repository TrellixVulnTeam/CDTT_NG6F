import axios from 'axios'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import store from '../store'
import i18n from '@/utils/language'
import { includes } from 'lodash'

const isAlreadyFetchingAccessToken = false
let subscribers: any[] = []
const API_URL: string = process.env.VUE_APP_BASE_API

const request = axios.create({
  baseURL: API_URL,
  withCredentials: false
})

request.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
request.defaults.headers.common['Authorization'] = Cookies.get('access_token') ? 'Bearer ' + Cookies.get('access_token') : ''

request.interceptors.request.use(request => {
  return request
})

function onAccessTokenFetched(access_token: string) {
  subscribers = subscribers.filter((callback: any) => callback(access_token))
}

function addSubscriber(callback: any) {
  subscribers.push(callback)
}

request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error.response)
    const { config, data, status } = error.response
    console.log(data)

    const originalRequest = config
    if (data.httpStatus === 401 || status === 401) {
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      request.defaults.headers.common['Authorization'] = ''
      location.href = '/login'
      // if (!isAlreadyFetchingAccessToken) {
      //   isAlreadyFetchingAccessToken = true
      //   store
      //     .dispatch('beAuth/refreshToken')
      //     .then(res => {
      //       isAlreadyFetchingAccessToken = false
      //       console.log('res', res)
      //       onAccessTokenFetched(res.accessToken)
      //     })
      //     .catch(err => {
      //       store.dispatch('beAuth/logout')
      //       setTimeout(() => {
      //         location.href = '/'
      //       }, 2000)
      //       return err
      //     })
      // }
      // const retryOriginalRequest = new Promise(resolve => {
      //   addSubscriber(access_token => {
      //     originalRequest.headers.Authorization = 'Bearer ' + access_token
      //     resolve(axios(originalRequest))
      //   })
      // })
      // return retryOriginalRequest
    }
    if (data.statusCode === 400) {
      let message = ''
      if (data.message === 'User not exits') {
        message = i18n.tc('notify.user-exits')
      }
      if (data.status === 'BAD_REQUEST' && includes(config.url, 'user/settings/kyc-requests')) {
        return Promise.reject(error)
      }
      if (data.status === 'INVALID_PASSWORD') {
        message = i18n.tc('notify.pass-invalid')
      }
      if (data.message === 'Email already register') {
        message = i18n.tc('notify.email-register')
      }
      if (data.message === 'Wrong more than over times. User locked!') {
        message = i18n.tc('notify.user-locked')
      }
      if (data.status === 'USER_LOCKED') {
        message = i18n.tc('notify.user-locked')
      }
      if (data.status === 'USER_EXPIRED') {
        message = i18n.tc('notify.user-expired')
      }
      if (data.status === 'INVALID_VERIFICATION') {
        message = i18n.tc('notify.verify-fail')
      }
      if (data.status === 'Invalid verification code') {
        message = i18n.tc('notify.verify-fail')
      }

      console.log(message)

      Message.error({ message, duration: 5000 })
    }
    if (!error.response || error.response.status >= 500) {
      // error.message = 'Không thể kết nối đến máy chủ'
      let message = ''
      message = i18n.tc('notify.500')
      Message.error({ message, duration: 5000 })
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default request
