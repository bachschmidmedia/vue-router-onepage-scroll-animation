import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import { Ops } from '@/plugins/ops'

Vue.use(Ops, {
  debug: true,
})

Vue.config.productionTip = false

import './assets/styles/bundle.scss'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
