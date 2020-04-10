
<template>
  <v-card width="300" class="pa-5" color="indigo" dark>
    <v-layout justify-center align-center>
      <v-file-input v-model="file" accept="application/json" label="JSON file"></v-file-input>
      <v-btn icon @click="onUpload" class="ml-4">
        <v-icon>mdi-upload</v-icon>
      </v-btn>
      <v-btn icon @click="$store.dispatch('shared/modal', true)" class="ml-4">
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-layout>
  </v-card>
</template>

<script>
import firebase from "firebase";
import { log } from "three";
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
      try {
        let resp = firebase
          .storage()
          .ref(`user_file`)
          .put(this.file);
      } catch (error) {
        throw error;
      }
    }
    // onLoad() {
    //   this.$store.dispatch("get_user_file");
    // }
  }
};
</script>

<style scoped="">
img.preview {
  width: 200px;
}
</style>