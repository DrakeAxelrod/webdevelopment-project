import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import guards from './guards'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

guards.checkUserLoggedIn(router)

export default router
