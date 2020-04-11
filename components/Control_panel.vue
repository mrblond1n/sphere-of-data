<template>
  <v-card class="panel pa-5" color="indigo" dark>
    <v-text-field
      label="show titles"
      v-model="how_many_show_titles"
      :rules="[rules.number]"
      @keydown.enter="reload_graph"
    ></v-text-field>
    <v-text-field
      label="show nodes"
      v-model="how_many_show_nodes"
      :rules="[rules.number]"
      @keydown.enter="reload_graph"
    ></v-text-field>
    <div class="caption">Default distance</div>
    <v-slider v-model="distance" min="500" max="3000"></v-slider>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        number: v => !isNaN(v) || "Should be a number"
      }
    };
  },
  computed: {
    how_many_show_titles: {
      get() {
        return this.$store.getters["control/how_many_show_titles"];
      },
      set(val) {
        this.$store.dispatch("control/how_many_show_titles", val);
      }
    },
    how_many_show_nodes: {
      get() {
        return this.$store.getters["control/how_many_show_nodes"];
      },
      set(val) {
        this.$store.dispatch("control/how_many_show_nodes", val);
      }
    },
    distance: {
      get() {
        return this.$store.getters["control/distance"];
      },
      set(val) {
        this.$store.dispatch("control/distance", val);
      }
    }
  },
  methods: {
    reload_graph() {
      // this.$store.dispatch("shared/init", false);
      // setTimeout(() => {
      //   this.$store.dispatch("shared/init", true);
      // }, 2000);
      this.$store.dispatch("storage/get_user_file", {
        show_titles: this.$store.getters["control/how_many_show_titles"],
        show_nodes: this.$store.getters["control/how_many_show_nodes"]
      });
      this.$store.dispatch("shared/init", false);
      setTimeout(() => {
        this.$store.dispatch("shared/init", true);
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>