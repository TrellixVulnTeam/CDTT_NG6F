import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'
import { IBodyApiVerify } from '@/interface'

export class SettingRepository extends BaseRepository {
  constructor() {
    super('api/v1/user')
  }

  async getKyc(data: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/kyc-settings`, { params: { ...data } })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async genCode(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/settings/gen-code`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
