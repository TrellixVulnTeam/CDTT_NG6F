import { ModuleInterface } from '@/interface/module'
import homeModule from './home'
import authModule from './auth'
import customerModule from './customer'
const listModules: Record<string, ModuleInterface> = {
  homeModule,
  authModule,
  customerModule
}

export default listModules
