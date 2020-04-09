<template>
  <v-app dark>
    <v-app-bar color="indigo" app>
      <v-toolbar-title>Data prime test task</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app color="indigo">
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
export default {};
</script>
