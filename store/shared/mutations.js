export default {
  modal(state, payload) {
    state.modal = payload
  },
  notify(state, payload) {
    state.notify = payload
  },
  loading(state, payload) {
    state.loading = payload
  },
  init(state, payload) {
    state.init = payload
  }
}