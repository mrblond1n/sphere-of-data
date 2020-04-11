import firebase from 'firebase'

export default {
  async get_data({ commit }, { show_titles, show_nodes, url }) {
    try {
      let data = await this.$axios.get(url);
      let nodes = [];
      console.log(`Показываем заголовков: ${show_titles}`, `Показываем нодов: ${show_nodes}`);

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
  async get_user_file({ dispatch }, { show_titles, show_nodes }) {

    let storage = firebase.storage();
    try {
      let gsReference = storage.refFromURL(
        "gs://sphere-of-data.appspot.com/user_file"
      );
      gsReference
        .getDownloadURL()
        .then(url => {
          let xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.open("GET", url);
          dispatch('get_data', { show_titles, show_nodes, url })
        })
        .catch((error) => {
          if (error.code === 'storage/object-not-found') {
            dispatch('get_default_file', { show_titles, show_nodes })
          } else {
            throw error
          };

        });
    } catch (error) {
      throw error;
    }
  },
  async get_default_file({ dispatch }, { show_titles, show_nodes }) {
    let storage = firebase.storage();
    try {
      let gsReference = storage.refFromURL(
        "gs://sphere-of-data.appspot.com/blocks.json"
      );
      gsReference
        .getDownloadURL()
        .then(url => {
          let xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.open("GET", url);
          dispatch('get_data', { show_titles, show_nodes, url })
        })
        .catch(error => {
          throw error
        });
    } catch (error) {
      throw error;
    }
  },
}