<template>
  <v-layout column justify-center align-center>
    <client-only>
      <!-- <tags-ball
        :style="{'border':'2px solid black'}"
        :width="500"
        :height="500"
        :radius="200"
        :tags="tags"
        :stop="true"
      />-->
      <vue-balls
        :style="{'border':'2px solid black'}"
        :width="500"
        :height="500"
        :radius="200"
        :tags="tags"
        :stop="true"
      />
    </client-only>
  </v-layout>
</template>

<script>
import vueBalls from "~/components/tags_ball";
export default {
  components: {
    vueBalls
  },
  data() {
    return {
      tags: []
    };
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.tags.push(i);
    }
  }
};
</script>
