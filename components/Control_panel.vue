<template>
  <v-card class="panel pa-5" color="indigo" dark>
    <v-text-field label="show titles" v-model="how_many_show_titles" :rules="[rules.number]"></v-text-field>
    <v-text-field label="show nodes" v-model="how_many_show_nodes" :rules="[rules.number]"></v-text-field>
    <v-text-field label="default distance" :rules="[rules.number]" v-model="distance"></v-text-field>
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
  }
};
</script>

<style lang="scss" scoped>
</style>