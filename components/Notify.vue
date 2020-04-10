<template>
  <v-snackbar v-model="notify">
    {{ notify.text }}
    <v-btn :color="notify.color" text @click="$store.dispatch('shared/notify', false)">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    notify: {
      get() {
        return this.$store.getters["shared/notify"];
      },
      set(val) {
        return this.$store.dispatch("shared/notify", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>