import { ROLE_TYPE } from '@/configs/role/index'
export type RoleActions = 'view' | 'edit' | 'remove' | 'all' | 'view-kyc-customer-detail'

//view-kyc-customer-detail: quyền xem tab kyc trong popup detail customer

export type UserRoles = ROLE_TYPE[keyof ROLE_TYPE]

export interface RoleInterface {
  module: string
  roles: RoleActions[]
}

export interface UserRoleInterface {
  userRole: UserRoles
  roles: RoleInterface[]
}

export interface UserRoleStoreInterface {
  userRole: UserRoles[]
  roles: RoleInterface[]
}
