import axios from 'axios'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
// import store from '../store'
import i18n from '@/utils/language'
import { includes } from 'lodash'
import { formatNumber } from '@/configs/format'

// const isAlreadyFetchingAccessToken = false
// const subscribers: any[] = []
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

// function onAccessTokenFetched(access_token: string) {
//   subscribers = subscribers.filter((callback: any) => callback(access_token))
// }

// function addSubscriber(callback: any) {
//   subscribers.push(callback)
// }

request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const { config, data, status } = error.response

    // const originalRequest = config
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
      let message: any = ''
      //  mã lỗi buy crowdsale
      if (data.status === 'INVALID_ASSET_BALANCES') {
        message = i18n.tc('notify.invalid-asset-balance')
      }
      if (data.status === 'INVALID_TOKEN_ADDRESS') {
        message = i18n.tc('notify.invalid-token-address')
      }
      if (data.status === 'INVALID_TOKEN_AMOUNT') {
        message = i18n.tc('notify.invalid-token-amount')
      }
      if (data.status === 'INVALID_PAID_ADDRESS') {
        message = i18n.tc('notify.invalid-paid-address')
      }
      if (data.status === 'INVALID_PAID_AMOUNT') {
        message = i18n.tc('notify.invalid-paid-amount')
      }
      if (data.status === 'INVALID_TOKEN_TO_USD_EXCHANGE_RATE') {
        message = i18n.tc('notify.invalid-exchange-rate')
      }
      if (data.status === 'INVALID_PAID_TO_USD_EXCHANGE_RATE') {
        message = i18n.tc('notify.invalid-paid-to-usd-exchange-rate')
      }
      if (data.status === 'CODE_VALIDATION_FAILED') {
        message = i18n.tc('notify.code-validation-failed')
      }
      if (data.status === 'INVALID_MIN_TO_BUY_CROWDSALE') {
        const amount = data.message.replace(/[^0-9]/g, '')
        const _amount = formatNumber(amount)

        message = i18n.t('notify.min-to-buy-crowdsale', { amount: _amount })
      }
      // mã lỗi transfer

      if (data.message === 'Vesting month must be higher zero.') {
        message = i18n.tc('notify.vesting-invalid')
      }
      if (data.message === 'Amount must be higher zero.') {
        message = i18n.tc('notify.amount-transfer-invalid')
      }

      // end
      if (data.message === 'User not exits') {
        message = i18n.tc('notify.user-exits')
      }
      if (data.message === 'Kyc has been approved by another admin') {
        message = i18n.tc('notify.kyc-approved-already')
      }
      if (data.status === 'USER_NOT_EXISTS') {
        message = i18n.tc('notify.user-not-exits')
      }
      if (data.status === 'BAD_REQUEST' && includes(config.url, 'user/settings/kyc-requests')) {
        if (data.message === 'Kyc has been approved by another admin') {
          message = i18n.tc('notify.kyc-approved-already')
        } else {
          return Promise.reject(error)
        }
      }
      if (data.message === 'Username or password is incorrect') {
        message = i18n.tc('notify.invalid-username')
      }
      if (data.status === 'INVALID_PASSWORD') {
        message = i18n.tc('notify.pass-invalid')
      }
      if (data.status === 'INVALID_EMAIL') {
        message = i18n.tc('notify.email-invalid')
      }
      if (data.status === 'INVALID_CAPTCHA') {
        message = i18n.tc('notify.captcha-invalid')
      }
      if (data.message === 'Email already register') {
        message = i18n.tc('notify.email-register')
      }
      if (data.message === 'Wrong more than over times. User locked!') {
        message = i18n.tc('notify.user-locked')
      }
      if (data.message === 'An account already exists with this phone number') {
        message = i18n.tc('notify.account-exits')
      }
      if (data.status === 'USER_LOCKED') {
        message = i18n.tc('notify.user-locked')
        setTimeout(() => {
          window.location.href = '/login'
        }, 500)
      }
      if (data.status === 'USER_EXPIRED') {
        message = i18n.tc('notify.user-expired')
      }
      if (data.status === 'INVALID_VERIFICATION') {
        message = i18n.tc('notify.verify-fail')
      }
      if (data.status === 'EXPIRED_VERIFICATION') {
        message = i18n.tc('notify.experied-verify')
      }
      if (data.status === 'ACCOUNT_ALREADY_EXISTS') {
        message = i18n.tc('notify.account-exist')
      }
      if (data.status === 'INVALID_AMOUNT') {
        message = i18n.tc('notify.invalid-amount')
      }
      if (data.status === 'Invalid verification code') {
        message = i18n.tc('notify.verify-fail')
      }
      if (data.status == 'CATEGORY_CONTAIN_DATA') {
        message = i18n.tc('popup-delete-category-error')
      }
      if (data.status === 'BAD_REQUEST' && data.message === 'This investor is already listed') {
        message = i18n.tc('notify.buyer-already-listed')
      }

      if (data.status === 'BAD_REQUEST' && data.message === 'Incorrect old password' && includes(config.url, 'change-pass')) {
        message = i18n.tc('notify.incorrect-old-pass')
      }

      if (data.status === 'DONT_DELETE' && data.message === 'You can\'t delete this') {
        message = i18n.tc('notify.collection-has-nft')
      }
      
      if (!message) {
        message = i18n.tc('notify.' + data.status)
      }

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
