import JSEncrypt from 'jsencrypt'

export function formatNumber(value: number): string {
  if (!value) return '0'
  const val = (value / 1).toFixed(0).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// export function numberWithCommas(value: string | number): string {
//   if (!value) return '0'
//   return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
// }

export function formatDateTime(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(+value)
  return (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.' + date.getFullYear()
}

export function formatDateHourMs(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    '/' +
    (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
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

export function validatePassword(password: string): boolean {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&(><#-])[A-Za-z\d@$!%*?&(><#-]{8,}$/g
  return regex.test(password)
}

export function encryptPassword(pass: string): string | boolean {
  const PUBLIC_KEY =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgw0IeOV0DZL1ZfzsSSbZDRu9XPPBkb4EVsFKYODFJnEEMdVK3IBhCyehoUbJFufIvdQD78LyfRo46fB5B6k+EsLC/4vofQiYyE/R13r+Fd+xufTXpxDKkj544LtfBfvsh/fYFx+vUH1/5XtuCplBX4cOsIdMni026zZv46clJswIDAQAB'
  const RSAEncrypt = new JSEncrypt()
  RSAEncrypt.setPublicKey(PUBLIC_KEY)
  return RSAEncrypt.encrypt(pass)
}
