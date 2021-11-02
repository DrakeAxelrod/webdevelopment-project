import api from '@/services/api'
import router from '@/router/index'
const config = {
  withCredentials: true,
  'Access-Control-Allow-Origin': '/'
}

export default {
  state: () => ({
    status: '',
    token: localStorage.getItem('token') || '',
    context: {}
  }),
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token) {
      state.status = 'success'
      state.token = token
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state, notHome) {
      if (notHome) {
        router.push('/')
      }
      state.status = ''
      state.token = ''
      state.context = {}
    },
    update_profile(state, data) {
      state.context.profile = data
    },
    update_context(state, data) {
      state.context = data
    }
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        api
          .post('/users/login', data, config)
          .then((res) => {
            const token = res.data.token
            localStorage.setItem('token', token)
            api.defaults.headers.common.Authorization = 'Bearer ' + token
            commit('auth_success', token)
            api.get('/users/me').then((res) => {
              commit('update_context', res.data)
            })
            resolve(res)
          })
          .catch((err) => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        api
          .post('/users/register', data, config)
          .then((res) => {
            const token = res.data.token
            localStorage.setItem('token', token)
            api.defaults.headers.common.Authorization = 'Bearer ' + token
            commit('auth_success', token)
            api
              .get('/users/me')
              .then((res) => commit('update_context', res.data))
            resolve(res)
          })
          .catch((err) => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }, notHome) {
      return new Promise((resolve, reject) => {
        const data = { user: { _id: this.getters.user._id } }
        commit('logout', notHome)
        api
          .get('/users/logout', data, config)
          .then((res) => {
            localStorage.removeItem('token')
            delete api.defaults.headers.common.Authorization
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    edit_profile({ commit }, data) {
      return new Promise((resolve, reject) => {
        api
          .patch('/users/' + this.getters.user._id, data, config)
          .then((res) => {
            api
              .get('/users/' + this.getters.user._id)
              .then((res) => commit('update_profile', res.data.profile))
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    user: (state) => state.context
  }
}
