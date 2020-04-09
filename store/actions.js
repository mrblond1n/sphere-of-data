export default {
  async get_data({ commit }, { show_titles, show_nodes }) {
    try {
      let data = await this.$axios.get('/blocks.json');
      let nodes = [];
      Object.values(data.data).forEach(elems => {
        elems.forEach((el, i) => {
          i < +show_nodes ? el.show_node = true : el.show_node = false;
          i < +show_titles ? el.show_title = true : el.show_title = false;
          nodes.push(el);
        });
      });
      commit('get_data', nodes)
    } catch (error) {
      throw error;
    }
  },
}