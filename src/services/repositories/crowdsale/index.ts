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
  async getListRound(): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/crowdsales`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListAssetNetwork(): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/user/asset-network`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListUserInRound(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/crowdsales-users`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDetailRoundUser(id: number): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/crowdsales-users/${id}/rounds`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async createBuyer(data: Record<string, any>): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/crowdsales-users`, data)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updateBuyer(data: Record<string, any>): Promise<any> {
    try {
      const rs = await request.put(`${this.prefix}/crowdsales-users`, data)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async findCustomerByEmail(email: string): Promise<any> {
    try {
      const rs = await request.get(`main/api/v1/customer/detail-by-username/${email}`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
