import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class CrowdsaleRepository extends BaseRepository {
  constructor() {
    super('/main/api/v1')
  }
  async getDataTable(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/crowdsales-transactions`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
