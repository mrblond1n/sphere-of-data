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
  position: absolute;
  left: 20px;
  bottom: 20px;
}
.control {
  position: absolute;
  left: 20px;
  top: 20px;
}
.graph {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
</style>