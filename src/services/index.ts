import { VerifyRepository } from './repositories/verify'
import { AuthRepository } from './repositories/auth'
import { SettingRepository } from './repositories/setting'
import { KycRepository } from './repositories/kyc'
import { ParamsRepository } from './repositories/params'

type RepositoryName = 'verify' | 'auth' | 'setting' | 'kyc' | 'params'

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
    default:
      return null
  }
}
