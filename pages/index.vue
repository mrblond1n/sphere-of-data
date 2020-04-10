<template>
  <v-layout column justify-center align-center>
    <client-only>
      <graph />
      <!-- <upload /> -->
      <!-- <control /> -->
    </client-only>
  </v-layout>
</template>

<script>
import graph from "~/components/Sphere";
import upload from "~/components/Action_with_data";
import control from "~/components/Control_panel";
export default {
  components: {
    graph,
    upload,
    control
  }
};
</script>
