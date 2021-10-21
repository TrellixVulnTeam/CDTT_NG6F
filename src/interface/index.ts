export interface IQuery {
  page: number
  limit?: number
  search?: string
  [x: string]: any
}

export interface PaginationInterface {
  status?: number | null
  total?: number
  page: number
  limit: number
  [x: string]: any
}

// export interface IBodyApiVerifyCode {
//   email?: string | (string | null)[]
//   phone?: string | (string | null)[]
//   reason?: string | (string | null)[]
//   verificationCode: number | string
//   [x: string]: any
// }
export interface IBodyApiVerify {
  email?: string | (string | null)[]
  password?: string | (string | null)[]
  phone?: string | (string | null)[]
  reason?: string | (string | null)[]
  verificationCodeEmail?: string | number
  verificationCodeSms?: string | number
  verificationCodeGa?: string | number
  verificationCode?: string | number
  [x: string]: any
}

export interface IBodyApiLogin {
  email: string
  password: string
}
