import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class KycRepository extends BaseRepository {
  constructor() {
    super('api/v1/user/kyc-settings/kyc-requests')
  }

  async getListKyc(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}
