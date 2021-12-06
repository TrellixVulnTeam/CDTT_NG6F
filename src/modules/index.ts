import { ModuleInterface } from '@/interface/module'
import homeModule from './home'
import authModule from './auth'
import customerModule from './customer'
import crowdsaleModule from './crowdsale'
import balanceModule from './balance'
import requestModule from './request'
import MemberModule from './member'
import transactionModule from '@/modules/transaction'
import exceptionModule from '@/modules/exception'
const listModules: Record<string, ModuleInterface> = {
  homeModule,
  authModule,
  customerModule,
  crowdsaleModule,
  balanceModule,
  requestModule,
  transactionModule,
  MemberModule,
  exceptionModule
}

export default listModules
