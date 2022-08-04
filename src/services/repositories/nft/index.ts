import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class NftRepository extends BaseRepository {
  constructor() {
    super('nft/api/v1')
  }

  async getTemplateMetaData(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/bo/setup/template/detail`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
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
  async createCategory(params: Record<string, any>): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.post(`${this.prefix}/category`, params )
      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async editCategory(params: Record<string, any>, id: Record<string, any>): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.put(`${this.prefix}/category/${id}`, params, id)
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
  async getListCreator(params: Record<string, any>): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.get(`${this.prefix}/account/search`, { params })
      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getCategories(params: Record<string, any>): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.get(`${this.prefix}/categories`, { params })
      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListTemplate(params: Record<string, any>): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.get(`${this.prefix}/bo/setup/templates`, { params })
      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    } 
  }
  
  async createCollection(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/bo/collection/create`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    } 
  }
}
