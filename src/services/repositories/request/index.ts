import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class RequestRepository extends BaseRepository {
  constructor() {
    super('/main/api/v1')
  }
  async getDataTable(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/transaction/request/search`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getUserInfo(id: string | number): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/customers?userId=${id}`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
