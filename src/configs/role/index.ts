import { UserRoleInterface } from '@/interface/role'
export type ROLE_TYPE = {
  SUPERADMIN: 'SUPERADMIN'
  ADMIN: 'ADMIN'
  SUPPORT: 'SUPPORT' //NV HỖ TRỢ
  MARKETING: 'MARKETING' //Quyền nhân viên marketing
  ACCOUNTANT: 'ACCOUNTANT' //Quyền kế toán
  NONE: 'NONE'
}
export const ROLE_CODE: ROLE_TYPE = {
  SUPERADMIN: 'SUPERADMIN',
  ADMIN: 'ADMIN',
  SUPPORT: 'SUPPORT',
  MARKETING: 'MARKETING',
  ACCOUNTANT: 'ACCOUNTANT',
  NONE: 'NONE'
}

export const ROLE_DEFINE: UserRoleInterface[] = [
  {
    userRole: ROLE_CODE.SUPERADMIN,
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
        roles: ['view', 'add-transfer', 'add-deposit', 'add-crowdsale']
      },
      {
        module: 'exception',
        roles: ['all']
      },
      {
        module: 'member',
        roles: ['all']
      },
      {
        module: 'report',
        roles: ['all']
      },
      {
        module: 'setting',
        roles: ['all']
      }
    ]
  },
  {
    userRole: ROLE_CODE.ADMIN,
    roles: [
      {
        module: 'crowd-sale',
        roles: ['view']
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
        roles: ['view']
      },
      {
        module: 'exception',
        roles: ['all']
      },
      {
        module: 'member',
        roles: []
      },
      {
        module: 'report',
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
        roles: ['view', 'view-kyc-customer-detail', 'view-detail-customer', 'view-detail-device']
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
        module: 'member',
        roles: []
      },
      {
        module: 'report',
        roles: ['all']
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
        module: 'member',
        roles: []
      },
      {
        module: 'report',
        roles: ['all']
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
        roles: ['view', 'export']
      },
      {
        module: 'kyc',
        roles: []
      },
      {
        module: 'customer',
        roles: ['view', 'view-detail-customer']
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
        roles: ['view', 'add-deposit']
      },
      {
        module: 'exception',
        roles: ['view']
      },
      {
        module: 'member',
        roles: []
      },
      {
        module: 'report',
        roles: []
      },
      {
        module: 'setting',
        roles: ['view']
      }
    ]
  }
]

export const MODULE_WITH_ROUTENAME: Record<string, any> = {
  'crowd-sale': 'Crowdsale',
  kyc: 'Kyc',
  customer: 'CustomerMain',
  balance: 'Balance',
  request: 'Request'
}
