import { ModuleInterface } from '@/interface/module'
import homeModule from './home'
import authModule from './auth'
const listModules: Record<string, ModuleInterface> = {
  homeModule,
  authModule
}

export default listModules
