export default {
  modal(state, payload) {
    state.modal = payload
  },
  notify(state, payload) {
    state.notify = payload
  },
  init(state, payload) {
    state.init = payload
  }
}