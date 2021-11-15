import { ModuleInterface } from '@/interface/module'
import homeModule from './home'
import authModule from './auth'
import customerModule from './customer'
import crowdsaleModule from './crowdsale'
import requestModule from './request'
const listModules: Record<string, ModuleInterface> = {
  homeModule,
  authModule,
  customerModule,
  crowdsaleModule,
  requestModule
}

export default listModules
