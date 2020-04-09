<template>
  <div>
    <client-only>
      <div
        id="d3graph"
        @mouseover="is_rotation_active = false"
        @mouseleave="is_rotation_active = true"
      ></div>
      <v-text-field
        label="сколько показать"
        v-model="how_many_show_title"
        @keydown.enter="change_show_title"
      ></v-text-field>
      <v-btn
        @click="() => {how_many_show_title++ >= list.nodes.length ? list.nodes.length: how_many_show_title; init(how_many_show_title)}"
      >больше</v-btn>
    </client-only>
  </div>
</template>

<script>
import ForceGraph3D from "3d-force-graph";
import * as THREE from "three";
import SpriteText from "three-spritetext";
import { log } from "three";
export default {
  data() {
    return {
      is_rotation_active: true,
      size: 500,
      distance: 700,
      angle: 0,
      how_many_show_title: 0
    };
  },
  computed: {
    list() {
      return this.$store.getters["list"];
    }
  },
  methods: {
    render_graph(data) {
      console.log(data);

      const elem = document.getElementById("d3graph");
      const Graph = ForceGraph3D()(elem)
        .width(this.size)
        .height(this.size)
        .graphData(data) // add data
        .nodeColor(node => (node.filled === true ? "grey" : "white"))
        .enableNodeDrag(false)
        .enableNavigationControls(false)
        .showNavInfo(true)
        .cameraPosition({ z: this.distance })
        .nodeLabel(node => `${node.title}`)
        // .nodeVisibility(node => !node.filled ? true : false)
        .onNodeHover(node => (elem.style.cursor = node ? "pointer" : null))
        .onNodeClick(node =>
          node.show !== true ? window.open(node.link, "_blank") : () => {}
        )
        .nodeThreeObject(node => {
          // use a sphere as a drag handle
          if (node.show === true) return;

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
          // console.log(sprite);

          obj.add(sprite);

          return obj;
        });

      let angle = 0;
      setInterval(() => {
        if (this.is_rotation_active) {
          Graph.cameraPosition({
            x: 700 * Math.sin(angle),
            z: 700 * Math.cos(angle)
          });
          angle += Math.PI / 300;
        }
      }, 20);
    },
    init(num) {
      this.$store.dispatch("get_data", num).then(() => {
        this.render_graph(this.list);
      });
    },
    change_show_title() {
      if (this.how_many_show_title < 0) {
        this.init(0);
      } else if (this.how_many_show_title > this.list.nodes.length) {
        this.init(this.list.nodes.length);
      } else {
        this.init(this.how_many_show_title);
      }
    }
  },
  mounted() {
    this.init(0);
  }
};
</script>

<style lang="scss" scoped>
</style>