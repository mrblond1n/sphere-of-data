<template>
  <div
    ref="d3graph"
    @mouseover="is_rotation_active = false"
    @mouseleave="is_rotation_active = true"
  ></div>
</template>

<script>
import ForceGraph3D from "3d-force-graph";
import * as THREE from "three";
import SpriteText from "three-spritetext";
export default {
  data() {
    return {
      is_rotation_active: true,
      angle: 0,
      disable_rotation: true
    };
  },
  computed: {
    list() {
      return this.$store.getters["storage/list"];
    },
    distance() {
      return this.$store.getters["control/distance"];
    }
  },
  methods: {
    init(num) {
      this.$store.dispatch("storage/get_data", num).then(() => {
        this.render_graph(this.list);
      });
    },
    render_graph(elem, data) {
      const Graph = ForceGraph3D()(elem)
        .height(window.innerHeight)
        .backgroundColor("white")
        .graphData(data)
        .nodeColor(node => (node.filled === true ? "grey" : "white"))
        .enableNodeDrag(false)
        .enableNavigationControls(true)
        .cameraPosition({ z: this.distance })
        .showNavInfo(false)
        .nodeLabel(node => `${node.title}`)
        .nodeVisibility(node => (node.show_node ? true : false))
        .onNodeHover(node => (elem.style.cursor = node ? "pointer" : null))
        .onNodeClick(node =>
          node.show_title === true && node.title !== "No correct"
            ? window.open(node.link, "_blank")
            : () => {}
        )
        .nodeThreeObject(node => {
          return this.render_node_object(node);
        });
      this.camera_rotation(Graph);
      return;
    },
    render_node_object(node) {
      const obj = new THREE.Mesh(
        new THREE.SphereGeometry(5),
        new THREE.MeshBasicMaterial({
          depthWrite: false,
          transparent: true,
          opacity: 1,
          color: node.filled ? "lightgrey" : "black",
          flatShading: true
        })
      );
      if (node.show_title === true) {
        const sprite = new SpriteText(node.title);
        sprite.color = "grey";
        sprite.borderWidth = 1;
        sprite.borderColor = "black";
        sprite.padding = 3;
        sprite.textHeight = 8;
        sprite.position.y = -15;
        sprite.visible = true;
        obj.add(sprite);
      }
      return obj;
    },
    camera_rotation(elem) {
      let angle = 0;
      setInterval(() => {
        if (this.is_rotation_active) {
          elem.cameraPosition({
            x: this.distance * Math.sin(angle),
            z: this.distance * Math.cos(angle)
          });
          angle += Math.PI / 300;
        }
      }, 10);
    }
  },
  mounted() {
    this.$store
      .dispatch("storage/get_user_file", {
        show_titles: this.$store.getters["control/how_many_show_titles"],
        show_nodes: this.$store.getters["control/how_many_show_nodes"]
      })
      .then(() => {
        this.render_graph(this.$refs.d3graph, this.list);
      });
  }
};
</script>