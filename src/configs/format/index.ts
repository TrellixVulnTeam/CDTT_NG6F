import JSEncrypt from 'jsencrypt'
import { includes } from 'lodash'
import i18n from '@/utils/language'

export const API_URL: string = process.env.VUE_APP_BASE_API

export function formatNumber(value: number): string {
  if (!value) return '0'
  // const val = (value / 1).toFixed(0).replace('.', ',')
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function numberWithCommas(value: string): string {
  if (!value) return '0'
  if (includes(value, '.')) {
    const afterDot = value.substr(value.indexOf('.'))
    const beforeDot = value.substring(0, value.indexOf('.'))
    const _beforeDot = +beforeDot
    const temp = _beforeDot.toLocaleString().replaceAll('.', ',')
    return temp + afterDot
  }
  const _value = +value
  // return _value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  return _value.toLocaleString('en-US')
}

export function roundingNumber(value: number): number | string {
  if (!value) return 0
  return value.toFixed(2)
}

export function digitNumber(value: number | null): string {
  let numberStr!: string
  if (value) {
    if (value < 10) {
      numberStr = '0' + value
    } else {
      numberStr = value + ''
    }
  }
  return numberStr
}

export function convertCurrency(value: number | string): string {
  if (!value) return '0'
  value = value.toString()
  if (includes(value, '.')) {
    const afterDot = value.substr(value.indexOf('.'))
    const beforeDot = value.substring(0, value.indexOf('.'))
    const _beforeDot = +beforeDot
    const temp = _beforeDot.toLocaleString().replaceAll('.', ',')
    return temp + afterDot
  }
  const _value = +value
  return _value.toLocaleString('en-US')
}

export function convertAmount8digit(amount: string | number): string {
  if (!amount) return '0'
  amount = amount.toString()
  if (includes(amount, '.')) {
    const afterDot = amount.substr(amount.indexOf('.'))
    const _afterDotString = Number(afterDot).toFixed(8)
    const _afterDot = _afterDotString.substr(_afterDotString.lastIndexOf('.') + 1)
    const beforeDot = amount.substring(0, amount.indexOf('.'))
    const _beforeDot = +beforeDot
    const temp = _beforeDot.toLocaleString().replaceAll('.', ',')
    return temp + '.' + _afterDot
  }
  const _value = +amount
  return _value.toLocaleString('en-US')
}

export function convertAmountDecimal(amount: string | number, currency: string): string {
  const objConvert = {
    LYNK: 2,
    CLM: 2,
    USD: 2,
    USDC: 2,
    USDT: 2,
    BNB: 5,
    ETH: 8,
    BTC: 8,
    BUSD: 2,
    PERCENT: 2,
    HUB: 2
  }

  if (!amount) {
    if (currency === 'PERCENT') {
      return '0'
    }
    amount = 0 // case amount = null | ''
    return amount.toLocaleString('en-US', { minimumFractionDigits: objConvert[currency] })
  }

  if (amount >= 100 && currency === 'PERCENT') {
    return '100'
  }

  amount = amount.toString()
  if (includes(amount, '.')) {
    const afterDot = amount.substr(amount.indexOf('.'))
    const _afterDotString = Number(afterDot).toFixed(objConvert[currency])
    const _afterDot = _afterDotString.substr(_afterDotString.lastIndexOf('.') + 1)
    let _beforeDot = 0
    const beforeDot = amount.substring(0, amount.indexOf('.'))
    if (Number(_afterDotString) === 1) {
      _beforeDot = +beforeDot + 1
    } else {
      _beforeDot = +beforeDot
    }
    const temp = _beforeDot.toLocaleString().replaceAll('.', ',')
    return temp + '.' + _afterDot
  }
  const _value = +amount
  return _value.toLocaleString('en-US', { minimumFractionDigits: objConvert[currency] })
}

export function convertAmountToReceive(amount: string | number): string {
  if (!amount) return '0'
  amount = amount.toString()
  if (includes(amount, '.')) {
    const afterDot = amount.substr(amount.indexOf('.'))
    const _afterDotString = Number(afterDot).toFixed(2)
    const _afterDot = _afterDotString.substr(_afterDotString.lastIndexOf('.') + 1)
    const beforeDot = amount.substring(0, amount.indexOf('.'))
    const _beforeDot = +beforeDot
    const temp = _beforeDot.toLocaleString().replaceAll('.', ',')
    return temp + '.' + _afterDot
  }
  const _value = +amount
  return _value.toLocaleString('en-US')
}

export function formatDateTime(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(+value)
  return (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.' + date.getFullYear()
}

export function formatDDMMYY(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' + date.getFullYear()
}

export function formatDateHourMs(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (
    (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
    '/' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    '/' +
    date.getFullYear() +
    ' ' +
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':' +
    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  )
}

export function formatMMDDYY(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (
    (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
    '/' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    '/' +
    date.getFullYear() +
    ' ' +
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':' +
    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  )
}

export function formatDateMMDDYY(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (
    (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + date.getFullYear() + ' '
  )
}

export function formatMMDDYYWithoutHour(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + date.getFullYear()
}

export function encryptPassword(pass: string): string | boolean {
  const PUBLIC_KEY =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgw0IeOV0DZL1ZfzsSSbZDRu9XPPBkb4EVsFKYODFJnEEMdVK3IBhCyehoUbJFufIvdQD78LyfRo46fB5B6k+EsLC/4vofQiYyE/R13r+Fd+xufTXpxDKkj544LtfBfvsh/fYFx+vUH1/5XtuCplBX4cOsIdMni026zZv46clJswIDAQAB'
  const RSAEncrypt = new JSEncrypt()
  RSAEncrypt.setPublicKey(PUBLIC_KEY)
  return RSAEncrypt.encrypt(pass)
}

export function timeAgo(time: string | number): string | undefined {
  if (time && time !== '') {
    const thisTime = new Date(time).getTime()
    const now = new Date().getTime()
    const elapsed = now - thisTime

    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const msPerMonth = msPerDay * 30
    const msPerYear = msPerDay * 365

    if (elapsed < 1000) {
      return i18n.tc('time.just-now')
    } else if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + i18n.tc('time.second-ago')
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + i18n.tc('time.minute-ago')
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + i18n.tc('time.hours-ago')
    } else if (elapsed < msPerMonth) {
      const day = Math.round(elapsed / msPerDay)
      if (day < 7) {
        return day + i18n.tc('time.day-ago')
      } else {
        return Math.round(day / 7) + i18n.tc('time.week-ago')
      }
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + i18n.tc('time.month-ago')
    } else {
      return Math.round(elapsed / msPerYear) + i18n.tc('time.year-ago')
    }
  }
}

export function formatTransactionCode(code: string | null, number = 10): string {
  if (!code) return ''
  const before = code.substring(0, number)
  const after = code.substring(code.length - number)
  return before + '...' + after
}

export function formatDateTimeBirthday(time: string | null): string {
  if (time !== null) {
    // const timeConvert: string[] = time.split(' ')
    // return timeConvert[0].replace(/-/g, '/')
    const date = new Date(time)
    return (
      (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + date.getFullYear()
    )
  } else return ''
}

export function formatIdentificationType(type: string | null): string {
  if (type !== null) {
    switch (type) {
      case 'ID_CARD':
        return 'ID Card'
      case 'PASSPORT':
        return 'Passport'
      case 'DRIVER_LICENSE':
        return 'Driver License'
      default:
        return ''
    }
  } else return ''
}

export function formatEmail(email: string | null): string {
  if (email) {
    const a = email.toString().split('@')
    const b = a[0] ? a[0] : ''
    const c = Math.floor(b.length * 0.5)
    const str: string = b.slice(0, b.length - c) + '*'.repeat(c) + '@' + a[1]
    return str
  } else return ''
}

export function formatNumberPhone(numberPhone: string | null, countryCode: string | null): string {
  if (numberPhone && countryCode) {
    const c = 5
    const str: string = '(' + countryCode + ')' + '*'.repeat(c) + numberPhone.slice(-5)
    return str
  } else return ''
}

export function formatType(type: string | null): string {
  if (type) {
    const arrStr = type.split('_')
    let strTotal = ''
    arrStr.map((value, i) => {
      const str: string = value.substr(0, 1)
      const str2: string = value.substring(1)
      strTotal += str.toUpperCase() + str2.toLowerCase() + ' '
    })
    return strTotal
  } else return ''
}
export function convertToLocalDate(utcTime: string | number) {
  if (utcTime) {
    const time: number = new Date(utcTime).getTime() / 1000 + 7 * 60 * 60
    const date = new Date(time * 1000)
    return (
      (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
      '/' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
      '/' +
      date.getFullYear() +
      ' ' +
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
      ':' +
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
      ':' +
      (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    )
  } else return ''
}

export function formatReferral(value: number): any {
  if (!value) {
    return ''
  }
  const gmt = new Date().getTimezoneOffset() / -60
  const ago = value - gmt * 60 * 60 * 1000
  const date = new Date(ago)
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
    '-' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    ' ' +
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':' +
    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  )
}

export function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

export function formatMetaText(text: string): string {
  if (!text) return ''
  return text.replace(/\n/g, '<br>')
}

export function formatMetaHtml(text: string): string {
  if (!text) return ''
  const language = localStorage.getItem('bc-lang') || ''
  const parseJson = JSON.parse(text)
  return parseJson[language]
}

export function validateFormatFile(file: Record<string, any>, type: 'THUMB_NFT' | 'MEDIA_NFT' | 'METADATA_FILE'): boolean {
  const ACCEPT_FILE = {
    THUMB_NFT: ['jpg', 'jpeg', 'png', 'gif'],
    MEDIA_NFT: ['jpg', 'jpeg', 'png', 'gif', 'mp4'],
    METADATA_FILE: ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'ppt', 'pptx']
  }
  const lastDot = file.name.lastIndexOf('.')
  const fileType = file.name.substring(lastDot + 1).toLowerCase()
  console.log(fileType, type)

  return includes(ACCEPT_FILE[type], fileType)
}
