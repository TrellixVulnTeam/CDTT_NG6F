import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export default class ReportRepository extends BaseRepository {
  constructor() {
    super('log/api/v1')
  }

  async getListUserReport(params?: Record<string, any>): Promise<Record<string, any>> {
    try {
      const result = await request.get(`${this.prefix}/report/user/list`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDataChart(params?: Record<string, any>): Promise<Record<string, any>> {
    try {
      const result = await request.get(`${this.prefix}/report/user/chart`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
