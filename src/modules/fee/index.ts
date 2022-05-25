import { ModuleInterface } from '@/interface/module'
import feeRouters from './router'
import FeeStores from './store'
const feeModule: ModuleInterface = {
  router: feeRouters,
  stores: FeeStores
}

export default feeModule
