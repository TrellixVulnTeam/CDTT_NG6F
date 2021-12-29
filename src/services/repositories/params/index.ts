import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class ParamsRepository extends BaseRepository {
  constructor() {
    super('api/v1/district-params')
  }

  async getTypeReject(params?: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
  async getPramsHeader(): Promise<any> {
    try {
      const rs = await request.get(`main/api/v1/public/system-params`)
      return Promise.resolve(rs.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async getTokenFirebase(): Promise<any> {
    try {
      const rs = await request.post(`/api/v1/firebase/auth`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}
