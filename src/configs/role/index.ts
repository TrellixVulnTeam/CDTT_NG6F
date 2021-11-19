import { UserRoleInterface } from '@/interface/role'
export type ROLE_TYPE = {
  ADMIN: 'ADMIN'
  SUPPORT: 'SUPPORT' //NV HỖ TRỢ
  MARKETING: 'MARKETING' //Quyền nhân viên marketing
  ACCOUNTANT: 'ACCOUNTANT' //Quyền kế toán
  NONE: 'NONE'
}
export const ROLE_CODE: ROLE_TYPE = {
  ADMIN: 'ADMIN',
  SUPPORT: 'SUPPORT',
  MARKETING: 'MARKETING',
  ACCOUNTANT: 'ACCOUNTANT',
  NONE: 'NONE'
}

export const ROLE_DEFINE: UserRoleInterface[] = [
  {
    userRole: ROLE_CODE.ADMIN,
    roles: [
      {
        module: 'crowd-sale',
        roles: ['all']
      },
      {
        module: 'kyc',
        roles: ['all']
      },
      {
        module: 'customer',
        roles: ['all']
      },
      {
        module: 'balance',
        roles: ['all']
      },
      {
        module: 'request',
        roles: ['all']
      },
      {
        module: 'transaction',
        roles: ['all']
      },
      {
        module: 'exception',
        roles: ['all']
      },
      {
        module: 'setting',
        roles: ['all']
      }
    ]
  },
  {
    userRole: ROLE_CODE.SUPPORT,
    roles: [
      {
        module: 'crowd-sale',
        roles: []
      },
      {
        module: 'kyc',
        roles: ['view']
      },
      {
        module: 'customer',
        roles: ['view', 'view-kyc-customer-detail']
      },
      {
        module: 'balance',
        roles: []
      },
      {
        module: 'request',
        roles: []
      },
      {
        module: 'transaction',
        roles: []
      },
      {
        module: 'exception',
        roles: []
      },
      {
        module: 'setting',
        roles: []
      }
    ]
  },
  {
    userRole: ROLE_CODE.MARKETING,
    roles: [
      {
        module: 'crowd-sale',
        roles: []
      },
      {
        module: 'kyc',
        roles: []
      },
      {
        module: 'customer',
        roles: ['view', 'view-kyc-customer-detail']
      },
      {
        module: 'balance',
        roles: []
      },
      {
        module: 'request',
        roles: []
      },
      {
        module: 'transaction',
        roles: []
      },
      {
        module: 'exception',
        roles: []
      },
      {
        module: 'setting',
        roles: []
      }
    ]
  },
  {
    userRole: ROLE_CODE.ACCOUNTANT,
    roles: [
      {
        module: 'crowd-sale',
        roles: ['view']
      },
      {
        module: 'kyc',
        roles: []
      },
      {
        module: 'customer',
        roles: ['view']
      },
      {
        module: 'balance',
        roles: ['view']
      },
      {
        module: 'request',
        roles: ['view']
      },
      {
        module: 'transaction',
        roles: ['view']
      },
      {
        module: 'exception',
        roles: ['view']
      },
      {
        module: 'setting',
        roles: ['view']
      }
    ]
  }
]
