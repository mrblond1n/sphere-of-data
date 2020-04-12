<template>
  <v-dialog max-width="600" v-model="modal">
    <v-card>
      <v-card-title class="headline">Help to upload JSON file.</v-card-title>
      <v-card-text>
        <div>JSON the file should have the following construction</div>
        <code>
          {
          "items": [
          {title: 'example', link: 'https://example.com', filled: true},
          {title: 'example_2', link: 'https://example_2.com', filled: false},
          {title: 'example_3', link: 'https://example_3.com', filled: false},
          ]
          }
        </code>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="$store.dispatch('shared/modal', false)"
        >Understand</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    modal: {
      get() {
        return this.$store.getters["shared/modal"];
      },
      set(val) {
        this.$store.dispatch("shared/modal", val);
      }
    }
  }
};
</script>