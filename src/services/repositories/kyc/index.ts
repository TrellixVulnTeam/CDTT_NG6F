import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class KycRepository extends BaseRepository {
  constructor() {
    super('api/v1/user/settings')
  }

  async getListKyc(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/kyc-requests`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async getDetailKyc(id: string | number): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/kyc-requests/${id}`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
  async rejectKyc(data: Record<string, any>): Promise<any> {
    try {
      const rs = await request.put(`${this.prefix}/kyc-reject`, data)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
  async approveKyc(data: Record<string, any>): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/kyc-approval`, data)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}
