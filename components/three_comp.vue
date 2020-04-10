<template>
  <div id="container">
    <div id="elem">asd</div>
  </div>
</template>

<script>
import * as Three from "three";
import ForceGraph3D from "3d-force-graph";

export default {
  name: "ThreeTest",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    };
  },
  methods: {
    init: function() {
      let container = document.getElementById("container");
      let elem = document.getElementById("elem");
      this.camera = new Three.PerspectiveCamera(
        this.$store.getters["control/distance"], // 70
        container.clientWidth / container.clientHeight,
        0.01,
        10
      );
      this.camera.position.z = 1;

      this.scene = new Three.Scene();

      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();

      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);
      // const Graph = ForceGraph3D()(elem)
      //   .backgroundColor("white")
      //   .graphData(data)
      //   .nodeColor(node => (node.filled === true ? "grey" : "white"))
      //   .enableNodeDrag(false)
      //   .enableNavigationControls(this.disable_rotation)
      //   .cameraPosition({ z: this.distance })
      //   .showNavInfo(false)
      //   .nodeLabel(node => `${node.title}`)
      //   // .nodeVisibility(node => (node.show_node ? true : false))
      //   .onNodeHover(node => (elem.style.cursor = node ? "pointer" : null))
      //   .onNodeClick(node =>
      //     node.show !== true ? window.open(node.link, "_blank") : () => {}
      //   );
      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.03;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
};
</script>

<style scoped>
#container {
  width: 500px;
  height: 500px;
}
</style>