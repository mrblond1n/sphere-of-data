<template>
  <div>
    <client-only>
      <div id="d3graph" @mouseover="is_rotation_active = false" @mouseleave="is_rotation_active = true"></div>
      <v-btn @click="() => {how_many_show_title--; init(how_many_show_title)}">меньше</v-btn>
      <v-btn @click="() => {how_many_show_title++; init(how_many_show_title)}">больше</v-btn>
    </client-only>
  </div>
</template>

<script>
import ForceGraph3D from '3d-force-graph'
import  * as THREE from 'three';
import SpriteText from 'three-spritetext'
import { log } from 'three';
export default {
  data() {
    return {
      is_rotation_active: true,
      size: 500,
      distance: 700,
      angle: 0,
      how_many_show_title: 0
    }
  },
  computed: {
    list() {
      return this.$store.getters['list']
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
      .nodeColor(node => node.filled === true ? 'grey' : 'white')
      .enableNodeDrag(false)
      .enableNavigationControls(false)
      .showNavInfo(true)
      .cameraPosition({ z: this.distance })
      .nodeLabel(node => `${node.title}`)
      // .nodeVisibility(node => !node.filled ? true : false)
      .onNodeHover(node => (elem.style.cursor = node ? "pointer" : null))
      .onNodeClick(node => window.open(node.link, "_blank"))
      .nodeThreeObject(node => {
        // use a sphere as a drag handle
        if (node.show === true) return;
        
        const obj = new THREE.Mesh(
          new THREE.SphereGeometry(10),
          new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
        );

        // add text sprite as child
        const sprite = new SpriteText(node.title);
        sprite.color = 'grey';
        sprite.borderWidth = 1;
        sprite.padding = 3;
        sprite.textHeight = 8;
        sprite.position.y = -10;
        sprite.visible = true;
        // console.log(sprite);
        
        obj.add(sprite);

        return obj;
      });

      let angle = 0;
      setInterval(                                 
        () => {
          if (this.is_rotation_active) {
            Graph.cameraPosition({
              x: 700 * Math.sin(angle),
              z: 700 * Math.cos(angle),
            });
            angle += Math.PI / 300;
          }
          
        }, 20
      );
    },
    init(num) {
      this.$store.dispatch('get_data', num).then(() => {
        this.render_graph(this.list);
      });
    }
  },
  mounted() {
    this.init(0)
  }
};
</script>

<style lang="scss" scoped>
</style>