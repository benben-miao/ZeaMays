import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import * as cv from 'opencv.js'

Vue.prototype.$cv = cv
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
