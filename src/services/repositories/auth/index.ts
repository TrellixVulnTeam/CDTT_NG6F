import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'
import { IBodyApiVerify } from '@/interface'

export class AuthRepository extends BaseRepository {
  constructor() {
    super('api/v1/user')
  }

  async register(data: Record<string, any>, captcha: string): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/register`, data, {
        headers: {
          'captcha-response': captcha
        }
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async login(data: Record<string, any>): Promise<any> {
    try {
      delete request.defaults.headers.common['Authorization']
      const result = await request.post(`${this.prefix}/login`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async logout(): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/logout`)
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async get2FA(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/get2FA`, {
        params: params
      })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async validateUser(data: Record<string, any>, captcha: string): Promise<any> {
    try {
      delete request.defaults.headers.common['Authorization']
      const rs = await request.post(`${this.prefix}/validate`, data, {
        headers: {
          'captcha-response': captcha
        }
      })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async resendCode(data: Record<string, any>, userId = 0): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/${userId}/resendCode`, data)
      Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async verifyCode(type: string | (string | null)[], data: IBodyApiVerify, userId = 0): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/${userId}/verify/${type}`, data)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async verifyPhone(data: IBodyApiVerify): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/phone/verify`, data)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async forgetPassword(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/forget-pass`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async resetPassword(data: Record<string, any>, userId = 0): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.post(`${this.prefix}/${userId}/reset-pass`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      console.log(error)

      return Promise.reject(error)
    }
  }

  async changePassword(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/password`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async refreshToken(data: { email: string; refreshToken: string }): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/refresh-token`, data, {
        headers: {
          Authorization: ''
        }
      })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getInfo(): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/info`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
