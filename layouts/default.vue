<template>
  <v-app dark>
    <v-app-bar color="indigo" app dark>
      <v-toolbar-title>DATA PRIME - test task</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <app-modal />
    <app-notify />
    <v-footer fixed app color="indigo" dark>
      <span class="mr-12">&copy; {{ new Date().getFullYear() }}</span>
      <span>
        author:
        <a
          style="color: white"
          href="mailto:nikita.kirdiapin@gmail.com"
          target="_blank"
        >Kirdiapin Nikita</a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import appModal from "~/components/Modal";
import appNotify from "~/components/Notify";
export default {
  components: {
    appModal,
    appNotify
  }
};
</script>
