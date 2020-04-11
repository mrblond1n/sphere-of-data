export default {
  modal({ commit }, payload) {
    commit('modal', payload)
  },
  loading({ commit }, payload) {
    commit('loading', payload)
  },
  notify({ commit }, payload) {
    commit('notify', payload)
  },
  init({ commit }, payload) {
    commit('init', payload)
  }

}