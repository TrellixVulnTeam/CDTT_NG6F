import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class CustomerRepository extends BaseRepository {
  constructor() {
    super('main/api/v1/customers')
  }

  async getListCustomer(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}
