import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export default class ReportRepository extends BaseRepository {
  constructor() {
    super('log/api/v1')
  }

  async getListReport(params?: Record<string, any>): Promise<Record<string, any>> {
    try {
      const result = await request.get(`${this.prefix}/report/user/list`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getlistBalance(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/report/user/chart`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

}
