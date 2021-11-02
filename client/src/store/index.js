import user from './user'
import concept from './concept'
import clash from './clash'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    user,
    concept,
    clash
  }
})
