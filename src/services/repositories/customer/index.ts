import { forEach } from 'lodash'
import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class CustomerRepository extends BaseRepository {
  constructor() {
    super('main/api/v1/customers')
  }

  private convertParams(params: Record<string, any>): Record<string, any> {
    const _params = { ...params }
    const objKey = Object.keys(_params)
    forEach(objKey, key => {
      console.log(key)

      if (_params[key] === '' && key !== 'type') {
        _params[key] = null
      }
    })
    return _params
  }

  async getListCustomer(params: Record<string, any>): Promise<any> {
    try {
      const _params = this.convertParams(params)
      const rs = await request.get(`${this.prefix}`, { params: _params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async getlistBalance(id: number, params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/${id}/balance`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
  async getlistTransaction(id: number, params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/transaction-histories/${id}`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
  async getlistAddress(id: number, params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/${id}/addresses`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
  async getlistReferral(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`api/v1/customers/invited-by-user`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}
