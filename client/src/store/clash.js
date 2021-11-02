export default {
  state: () => ({
    clash: {}
  }),
  mutations: {
    update_clash(state, clash) {
      state.clash = clash
    }
  },
  getters: {
    clash: (state) => state.clash
  }
}
