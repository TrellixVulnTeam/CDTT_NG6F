import { ModuleInterface } from '@/interface/module'
import homeModule from './home'
import authModule from './auth'
import customerModule from './customer'
import crowdsaleModule from './crowdsale'
const listModules: Record<string, ModuleInterface> = {
  homeModule,
  authModule,
  customerModule,
  crowdsaleModule
}

export default listModules
