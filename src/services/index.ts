import { VerifyRepository } from './repositories/verify'
import { AuthRepository } from './repositories/auth'
import { SettingRepository } from './repositories/setting'
import { KycRepository } from './repositories/kyc'
import { ParamsRepository } from './repositories/params'
import { CustomerRepository } from './repositories/customer'
import { CrowdsaleRepository } from './repositories/crowdsale'
import { BalanceRepository } from './repositories/balance'

type RepositoryName = 'verify' | 'auth' | 'setting' | 'kyc' | 'params' | 'customer' | 'crowdsale' | 'balance'

export default function getRepository(name: RepositoryName): any {
  switch (name) {
    case 'verify':
      return new VerifyRepository()
    case 'auth':
      return new AuthRepository()
    case 'setting':
      return new SettingRepository()
    case 'kyc':
      return new KycRepository()
    case 'params':
      return new ParamsRepository()
    case 'customer':
      return new CustomerRepository()
    case 'crowdsale':
      return new CrowdsaleRepository()
    case 'balance':
      return new BalanceRepository()
    default:
      return null
  }
}
