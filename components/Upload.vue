
<template>
  <v-card width="300" class="pa-5" color="indigo" dark>
    <v-layout justify-center align-center>
      <v-file-input ref="file" v-model="file" accept="application/json" label="JSON file"></v-file-input>
      <v-btn icon :loading="$store.getters['shared/loading']" @click="onUpload" class="ml-4">
        <v-icon>mdi-upload</v-icon>
      </v-btn>
      <v-btn icon @click="$store.dispatch('shared/modal', true)" class="ml-4">
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      file: [],
      imageData: null,
      picture: null,
      uploadValue: 0
    };
  },
  methods: {
    onUpload() {
      this.$store.dispatch("shared/loading", true);
      if (
        !this.file ||
        this.file.type !== "application/json" ||
        this.file.size > 2000000
      ) {
        this.$store.dispatch("shared/notify", {
          color: "error",
          text: "No correct file"
        });
        this.$store.dispatch("shared/loading", false);
        return;
      }

      this.$store.dispatch("storage/upload_file", this.file).then(() => {
        this.$refs.file.reset();
        this.$store.dispatch("shared/loading", false);
        this.$store.dispatch("storage/get_user_file", {
          show_titles: this.$store.getters["control/how_many_show_titles"],
          show_nodes: this.$store.getters["control/how_many_show_nodes"]
        });
        this.$store.dispatch("shared/init", false);
        setTimeout(() => {
          this.$store.dispatch("shared/init", true);
        }, 300);
      });
    }
  }
};
</script>