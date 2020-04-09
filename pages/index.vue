<template>
  <v-layout column justify-center align-center>
    <client-only>
      <!-- <graph /> -->
    </client-only>
  </v-layout>
</template>

<script>
import graph from "~/components/graph";
export default {
  components: {
    graph
  },
  data() {
    return {
      tags: []
    };
  }
};
</script>
