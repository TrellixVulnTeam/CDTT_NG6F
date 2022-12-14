import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export default class WalletRepository extends BaseRepository {
  constructor() {
    super('main/api/v1')
  }

  async getInfoVesting(params?: Record<string, any>): Promise<Record<string, any>> {
    try {
      const result = await request.get(`${this.prefix}/vesting`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListRoundCrowdsale(): Promise<Record<string, any>[]> {
    try {
      const result = await request.get(`${this.prefix}/crowdsales`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
