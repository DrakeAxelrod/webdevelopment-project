export default {
  state: () => ({
    concept: {}
  }),
  mutations: {
    update_concept(state, concept) {
      state.concept = concept
    }
  },
  getters: {
    concept: (state) => state.concept
  }
}
