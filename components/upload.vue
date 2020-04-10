
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
    // previewImage(event) {
    //   this.uploadValue = 0;
    //   this.picture = null;
    //   this.imageData = event.target.files[0];
    // },

    onUpload() {
      try {
        let resp = firebase
          .storage()
          .ref(`user_file`)
          .put(this.file);

        console.log(resp);
      } catch (error) {
        throw error;
      }
    },
    onLoad() {
      try {
        let resp = this.$axios.get(
          "https://firebasestorage.googleapis.com/v0/b/sphere-of-data.appspot.com/o/user_file?alt=media&token=bad95c57-b481-4a29-84e4-fe6f3d8d9acc"
        );
        // let resp = this.$axios.get("gs://sphere-of-data.appspot.com/user_file");
        // var storage = firebase.storage();
        // var pathReference = storage.ref("user_file");

        // // Create a reference from a Google Cloud Storage URI
        // var gsReference = storage.refFromURL(
        //   "gs://sphere-of-data.appspot.com/user_file"
        // );
        // var getUrl = gsReference.getDownloadURL();
        // getUrl
        //   .then(function(url) {
        //     // `url` is the download URL for 'images/stars.jpg'

        //     // This can be downloaded directly:
        //     var xhr = new XMLHttpRequest();
        //     xhr.responseType = "blob";
        //     xhr.onload = function(event) {
        //       var blob = xhr.response;
        //     };
        //     xhr.open("GET", url);
        //     xhr.send();

        //     // console.log(url + "");

        //     // Or inserted into an <img> element:
        //     // var img = document.getElementById("myimg");
        //     // img.src = url;
        //   })
        //   .catch(function(error) {
        //     // Handle any errors
        //   });

        // console.log(resp);
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>

<style scoped="">
img.preview {
  width: 200px;
}
</style>