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
  async findCustomerByEmail(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`main/api/v1/customer/detail-by-username`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListCreatedBy(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`api/v1/user/members`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async exportTransaction(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/crowdsales-transactions/export`, {
        params,
        responseType: 'blob'
      })
      return Promise.resolve(rs)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListUserFrom(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/transfer/transferUsers`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async transferToUser(data: Record<string, any>): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/transfer/transferForTeam`, data)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async buyCrowdsale(data: Record<string, any>): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/crowdsales/buy-admin`, data)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async sendCodeAndGet2FATransfer(): Promise<any> {
    try {
      const rs = await request.post(`/main/api/v2/transfer/sendcode?isEmployee=true`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async sendCodeBuyCrowdsale(): Promise<any> {
    try {
      const rs = await request.post(`api/v1/user/crowdsales/sendcode`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async get2FABuyCrowdsale(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`api/v1/user/get2FA`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getExchangeRateTwoCoin(): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/exchange-rates/exchange/USDT/LYNK`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
