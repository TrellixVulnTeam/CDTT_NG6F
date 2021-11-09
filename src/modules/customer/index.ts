import { ModuleInterface } from '@/interface/module'
import customerRouters from './router'
import CustomerStores from './store'
const customerModule: ModuleInterface = {
  router: customerRouters,
  stores: CustomerStores
}

export default customerModule
