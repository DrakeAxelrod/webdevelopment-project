import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import api from '@/services/api'
import BootstrapVue from 'bootstrap-vue'
import store from '@/store/index'
import Argon from './plugins/argon-kit'
import Particles from 'particles.vue'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'

Vue.use(BootstrapVue)
Vue.use(Argon)
Vue.use(Particles)

Vue.prototype.$http = api
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token
}

Vue.config.productionTip = false

new Vue({
  store: store,
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
