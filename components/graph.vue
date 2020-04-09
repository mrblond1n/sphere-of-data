<template>
  <div>
    <div id="3d-graph"></div>
  </div>
</template>

<script>
import ForceGraph3D from "3d-force-graph";
export default {
  directives: {
    // ForceGraph3D
  },
  data() {
    return {
      is_rotation_active: true
    }
  },
  mounted() {
    this.$store.dispatch('get_data');
    console.log(this.$store.getters['list']);
    ForceGraph3D()
    
  }
};
</script>

<style lang="scss" scoped>
</style>