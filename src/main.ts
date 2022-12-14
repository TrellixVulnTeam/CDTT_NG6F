import Vue from 'vue'
import App from './App.vue'

import './registerServiceWorker'
import router from './router'
import './icons'

import i18n from '@/utils/language'

import store from './store'

// import module
import listModules from '@/modules'

//format
import * as format from '@/configs'

//plugins
import './plugins/element-ui'

import './assets/styles/index.scss'

// mixin
import PermissionMixin from './mixins/permisson'

// import module
import { forEach } from 'lodash'

// base components
import components from './components/base'

Vue.config.productionTip = false

forEach(components, (value, key) => {
  Vue.component(key, value)
})
// modules
forEach(listModules, module => {
  // register route
  forEach(module.router, value => {
    router.addRoute(value)
  })

  // // register store
  forEach(module.stores, (value, key) => {
    store.registerModule(key, value)
  })

  // //register component
  forEach(module.components, (value, key) => {
    Vue.component(key, value)
  })
})

Vue.mixin(PermissionMixin)

//register filter
Object.keys(format).forEach(key => {
  Vue.filter(key, (format as any)[key])
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
