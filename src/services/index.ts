import { VerifyRepository } from './repositories/verify'
import { AuthRepository } from './repositories/auth'
import { SettingRepository } from './repositories/setting'
import { KycRepository } from './repositories/kyc'
import { ParamsRepository } from './repositories/params'
import { CustomerRepository } from './repositories/customer'
import { CrowdsaleRepository } from './repositories/crowdsale'
import { BalanceRepository } from './repositories/balance'
import { RequestRepository } from './repositories/request'
import { TransactionRepository } from './repositories/transaction'
import { ExceptionRepository } from './repositories/exception'
import { MemberRepository } from './repositories/member'
import ReportRepository from './repositories/report'
import WalletRepository from '@/services/repositories/wallet'
import { FeeRepository } from './repositories/fee'
import { NftRepository } from './repositories/nft'
type RepositoryName =
  | 'verify'
  | 'auth'
  | 'setting'
  | 'kyc'
  | 'params'
  | 'customer'
  | 'crowdsale'
  | 'balance'
  | 'request'
  | 'transaction'
  | 'exception'
  | 'member'
  | 'wallet'
  | 'report'
  | 'fee'
  | 'nft'

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
    case 'request':
      return new RequestRepository()
    case 'transaction':
      return new TransactionRepository()
    case 'exception':
      return new ExceptionRepository()
    case 'member':
      return new MemberRepository()
    case 'wallet':
      return new WalletRepository()
    case 'report':
      return new ReportRepository()
    case 'fee':
      return new FeeRepository()
    case 'nft':
      return new NftRepository()
    default:
      return null
  }
}
