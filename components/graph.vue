<template>
  <div>
    <div
      id="d3graph"
      @mouseover="is_rotation_active = false"
      @mouseleave="is_rotation_active = true"
    ></div>
    <div class="panel">
      <v-text-field
        label="show titles"
        v-model="how_many_show_titles"
        :rules="[rules.number]"
        @keydown.enter="change_show_title"
      ></v-text-field>
      <v-text-field
        label="show nodes"
        v-model="how_many_show_nodes"
        :rules="[rules.number]"
        @keydown.enter="change_show_nodes"
      ></v-text-field>
      <v-text-field label="default distance" :rules="[rules.number]" v-model="distance"></v-text-field>
    </div>
  </div>
</template>

<script>
import ForceGraph3D from "3d-force-graph";
import * as THREE from "three";
import SpriteText from "three-spritetext";
export default {
  data() {
    return {
      is_rotation_active: true,
      size: 500,
      distance: 3000,
      angle: 0,
      how_many_show_titles: 0,
      how_many_show_nodes: 20,
      disable_rotation: true,
      rules: {
        number: v => !isNaN(v) || "Should be a number"
      }
    };
  },
  computed: {
    list() {
      return this.$store.getters["list"];
    }
  },
  methods: {
    init(num) {
      this.$store.dispatch("get_data", num).then(() => {
        this.render_graph(this.list);
      });
    },
    render_graph(data) {
      const elem = document.getElementById("d3graph");
      const Graph = ForceGraph3D()(elem)
        .graphData(data) // add data
        .nodeColor(node => (node.filled === true ? "grey" : "white"))
        .enableNodeDrag(false)
        .enableNavigationControls(this.disable_rotation)
        .showNavInfo(false)
        .nodeLabel(node => `${node.title}`)
        .nodeVisibility(node => (node.show_node ? true : false))
        .onNodeHover(node => (elem.style.cursor = node ? "pointer" : null))
        .onNodeClick(node =>
          node.show !== true ? window.open(node.link, "_blank") : () => {}
        )
        .nodeThreeObject(node => {
          // use a sphere as a drag handle
          if (node.show_title === true) return;
          const obj = new THREE.Mesh(
            new THREE.SphereGeometry(5),
            new THREE.MeshBasicMaterial({
              depthWrite: false,
              transparent: true,
              opacity: 1,
              color: "grey",
              flatShading: true
            })
          );
          // add text sprite as child
          const sprite = new SpriteText(node.title);
          sprite.color = "grey";
          sprite.borderWidth = 1;
          sprite.padding = 3;
          sprite.textHeight = 8;
          sprite.position.y = -15;
          sprite.visible = true;
          obj.add(sprite);
          return obj;
        });

      let angle = 0;
      setInterval(() => {
        if (this.is_rotation_active) {
          Graph.cameraPosition({
            x: this.distance * Math.sin(angle),
            z: this.distance * Math.cos(angle)
          });
          angle += Math.PI / 300;
        }
      }, 15);
    },
    // panel
    change_show_title() {
      if (this.how_many_show_titles === "" || isNaN(this.how_many_show_titles))
        return;
      if (this.how_many_show_titles < 0) {
        this.init({ show_titles: 0, show_nodes: this.how_many_show_nodes });
      } else if (this.how_many_show_titles > this.list.nodes.length) {
        this.init({
          show_titles: this.list.nodes.length,
          show_nodes: this.how_many_show_nodes
        });
      } else {
        this.init({
          show_titles: this.how_many_show_titles,
          show_nodes: this.how_many_show_nodes
        });
      }
    },
    change_show_nodes() {
      if (this.how_many_show_nodes === "" || isNaN(this.how_many_show_nodes))
        return;
      if (this.how_many_show_nodes < 0) {
        this.init({ show_titles: this.how_many_show_titles, show_nodes: 0 });
      } else if (this.how_many_show_nodes > this.list.nodes.length) {
        this.init({
          show_titles: this.how_many_show_titles,
          show_nodes: this.list.nodes.length
        });
      } else {
        this.init({
          show_titles: this.how_many_show_titles,
          show_nodes: this.how_many_show_nodes
        });
      }
    }
  },
  mounted() {
    this.init({
      show_titles: this.how_many_show_titles,
      show_nodes: this.how_many_show_nodes
    });
  }
};
</script>

<style lang="scss" scoped>
.panel {
  position: absolute;
  left: 20px;
  top: 20px;
}
</style>