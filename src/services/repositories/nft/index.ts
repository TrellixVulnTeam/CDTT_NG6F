import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class NftRepository extends BaseRepository {
  constructor() {
    super('nft/api/v1/')
  }

  async getListAccount(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/account/search`, { params })
      return Promise.resolve(rs.data.data.content)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
