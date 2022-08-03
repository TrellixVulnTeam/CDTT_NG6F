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
  async exportExcel(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/export`, {
        params,
        responseType: 'blob'
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListCollection(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/category/detail`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListCategory(): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.get(`${this.prefix}/category/filter`)
      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListNetwork(): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.get(`${this.prefix}/nft-asset/list?type=NFT`)
      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListContractAddress(params: Record<string, any>): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.get(`${this.prefix}/nft-asset/list`, { params })
      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
