<template>
  <v-snackbar v-model="notify" :color="notify.color">
    {{ notify.text }}
    <v-btn text @click="$store.dispatch('shared/notify', false)">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    notify: {
      get() {
        return this.$store.getters["shared/notify"];
      },
      set() {}
    }
  }
};
</script>

<style lang="scss" scoped>
</style>