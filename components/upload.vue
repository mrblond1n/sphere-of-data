
<template>
  <v-card width="300" class="pa-5">
    <v-layout justify-center align-center>
      <v-file-input v-model="file" accept="application/json" label="File input"></v-file-input>
      <v-btn icon @click="onUpload" class="ml-4">
        <v-icon>mdi-upload</v-icon>
      </v-btn>
      <v-btn icon @click="onLoad" class="ml-4">
        <v-icon>mdi-load</v-icon>
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
    },
    onLoad() {
      this.$store.dispatch("get_user_file");
    }
  }
};
</script>

<style scoped="">
img.preview {
  width: 200px;
}
</style>