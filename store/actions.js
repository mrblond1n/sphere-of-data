export default {
  async get_data({ commit }, payload) {
    try {
      let data = await this.$axios.get('/blocks.json');
      let nodes = [];
      Object.values(data.data).forEach(elems => {
        elems.forEach((el, i) => {
          i < payload ? el.show = false : el.show = true;
          nodes.push(el);
        });
      });
      commit('get_data', nodes)
    } catch (error) {
      throw error;
    }
  },
}