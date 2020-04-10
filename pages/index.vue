<template>
  <v-layout justify-center align-center>
    <client-only>
      <!-- <graph /> -->
      <upload class="upload" />
      <control class="control" />
    </client-only>
  </v-layout>
</template>

<script>
import graph from "~/components/Sphere";
import upload from "~/components/Upload";
import control from "~/components/Control_panel";
export default {
  components: {
    graph,
    upload,
    control
  }
};
</script>

<style scoped>
.upload {
  position: absolute;
  left: 20px;
  bottom: 20px;
}
.control {
  position: absolute;
  left: 20px;
  top: 20px;
}
</style>