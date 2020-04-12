<template>
  <v-layout justify-center align-center>
    <client-only>
      <sphere class="graph" v-if="$store.getters['shared/init']" />
      <upload class="upload" />
      <control class="control" />
    </client-only>
  </v-layout>
</template>

<script>
import sphere from "~/components/Sphere";
import upload from "~/components/Upload";
import control from "~/components/Control_panel";
export default {
  components: {
    sphere,
    upload,
    control
  }
};
</script>

<style scoped>
.upload {
  position: fixed;
  left: 20px;
  bottom: 50px;
}
.control {
  position: fixed;
  left: 20px;
  top: 70px;
}
.graph {
  position: fixed;
  top: 0;
}
</style>