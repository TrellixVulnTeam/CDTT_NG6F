import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class TransactionRepository extends BaseRepository {
  constructor() {
    super('main/api/v1/transaction')
  }

  async getlistBalanceDetail(tab: string, params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/${tab}`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}
