import { ModuleInterface } from '@/interface/module'
import homeModule from './home'
import authModule from './auth'
import customerModule from './customer'
import crowdsaleModule from './crowdsale'
import balanceModule from './balance'
import requestModule from './request'
import MemberModule from './member'
import ReportModule from './report'
import transactionModule from '@/modules/transaction'
import exceptionModule from '@/modules/exception'
import metamartModule from '@/modules/metamart'
import feeModule from './fee'
import inventoryModule from './inventory'
import transactionNftModule from './transactionNft'
import FeeNftModule from './feeNft'
const listModules: Record<string, ModuleInterface> = {
  homeModule,
  authModule,
  customerModule,
  crowdsaleModule,
  balanceModule,
  requestModule,
  transactionModule,
  MemberModule,
  exceptionModule,
  ReportModule,
  metamartModule,
  feeModule,
  inventoryModule,
  transactionNftModule,
  FeeNftModule
}

export default listModules
