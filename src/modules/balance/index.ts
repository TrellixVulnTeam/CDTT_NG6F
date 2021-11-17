import { ModuleInterface } from '@/interface/module'
import balanceRouters from './router'
import BalanceStores from './store'
const balanceModule: ModuleInterface = {
  router: balanceRouters,
  stores: BalanceStores
}

export default balanceModule
