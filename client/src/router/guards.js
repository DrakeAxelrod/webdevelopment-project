import store from '@/store/index'

const checkUserLoggedIn = (router) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  })
}

export default {
  checkUserLoggedIn
}
