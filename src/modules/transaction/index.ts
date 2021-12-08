import { ModuleInterface } from '@/interface/module'
import transactionRouters from './router'
import TransactionStores from '@/modules/transaction/store'
const transactionModule: ModuleInterface = {
  router: transactionRouters,
  stores: TransactionStores
}

export default transactionModule
