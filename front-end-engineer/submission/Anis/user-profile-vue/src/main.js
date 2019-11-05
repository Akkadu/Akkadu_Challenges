import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import './registerServiceWorker'

//filters globally import
import './plugins/filters'

//scss globally import
import './assets/scss/main.scss'

//font awesome globally component
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
