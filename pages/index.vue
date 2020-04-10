<template>
  <v-layout column justify-center align-center>
    <client-only>
      <!-- <graph /> -->
      <upload></upload>
    </client-only>
  </v-layout>
</template>

<script>
import graph from "~/components/graph";
import upload from "~/components/upload";
export default {
  components: {
    graph,
    upload
  },
  data() {
    return {
      tags: []
    };
  }
};
</script>
