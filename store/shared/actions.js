export default {
  modal({ commit }, payload) {
    commit('modal', payload)
  },
  notify({ commit }, payload) {
    commit('notify', payload)
  },
  init({ commit }, payload) {
    commit('init', payload)
  }

}