import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'
import { forEach } from 'lodash'

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
      const result = await request.post(`${this.prefix}/category`, params)
      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updateCategory(id: string | number, params: Record<string, any>): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.put(`${this.prefix}/category/${id}`, params)
      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async deleteCategory(id: string | number, data: Record<string, any>): Promise<Array<Record<string, any>>> {
    try {
      console.log(data)
      const result = await request.delete(`${this.prefix}/category/${id}`, { data })
      console.log(result)

      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async deleteCollection(id: string | number, params: Record<string, any>): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.delete(`${this.prefix}/bo/collection/${id}/delete`, { params })
      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async deleteNft(id: string | number, params: Record<string, any>): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.delete(`${this.prefix}/bo/item/${id}/delete`, { params })
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
  async getCategories(params: Record<string, any>): Promise<Record<string, any>> {
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

  async getNftCollection(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/bo/collection/list`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getNftItem(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/bo/item/list`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async editCollection(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.put(`${this.prefix}/bo/collection/update`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async createNft(data: Record<string, any>): Promise<any> {
    try {
      forEach(data.metaDatas, elm => {
        delete elm.id
      })

      if (data.isHot === 'NO') {
        data.hotPosition = ''
      }
      if (data.isTop === 'NO') {
        data.topPosition = ''
      }

      const result = await request.post(`${this.prefix}/bo/item/create`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updateNft(data: Record<string, any>): Promise<any> {
    try {
      forEach(data.metaDatas, elm => {
        if (elm.isAdd) {
          delete elm.id
        }
      })

      if (data.isHot === 'NO') {
        data.hotPosition = ''
      }
      if (data.isTop === 'NO') {
        data.topPosition = ''
      }

      const result = await request.put(`${this.prefix}/bo/item/update`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDetailNft(id: number): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/item/${id}/detail`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListBanners(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/banners`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async createBanner(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/banner`, params)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updateBanner(bannerId: number, params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.put(`${this.prefix}/banner/${bannerId}`, params)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async checkValidDeleteCollection(id: number): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/bo/collection/${id}/delete/validate`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async checkValidDeleteNft(id: number): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/bo/item/${id}/delete/validate`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDetailCollection(id: string | number): Promise<Record<string, any>> {
    try {
      const result = await request.get(`${this.prefix}/bo/collection/${id}/detail`)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListCurrency(params: Record<string, any>): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.get(`${this.prefix}/currencies`, { params })
      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async deleteBanner(bannerId: number, params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.delete(`${this.prefix}/banner/${bannerId}`, { data: params })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
