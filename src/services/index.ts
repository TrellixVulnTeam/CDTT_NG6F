import { VerifyRepository } from './repositories/verify'
import { AuthRepository } from './repositories/auth'
import { SettingRepository } from './repositories/setting'
import { KycRepository } from './repositories/kyc'

type RepositoryName = 'verify' | 'auth' | 'setting' | 'kyc'

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
    default:
      return null
  }
}
