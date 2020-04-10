export default {
  get_data(state, payload) {
    state.list.nodes = payload;
  },
  set_link_to_file(state, payload) {
    state.link = payload;
  }
}