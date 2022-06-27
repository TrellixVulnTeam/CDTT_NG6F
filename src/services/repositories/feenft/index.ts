import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class FeeNftRepository extends BaseRepository {
  constructor() {
    super('nft/api/v1/transaction/fee')
  }

//   async getlistBalanceDetail(tab: string, params: Record<string, any>): Promise<any> {
//     try {
//       const rs = await request.get(`${this.prefix}/${tab}`, { params })
//       return Promise.resolve(rs.data.data)
//     } catch (error) {
//       console.log(error)
//       return Promise.reject(error)
//     }
//   }
  async getListFeeNft(tab: string, params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/${tab}`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
  async getFeeNftSummary(params: Record<string, any>):Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/summary`, {params})
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
