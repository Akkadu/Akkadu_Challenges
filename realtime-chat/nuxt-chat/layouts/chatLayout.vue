<template>
  <v-app>
    <navbar />
    <sidebar />
    <Nuxt />
  </v-app>
</template>

<script>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";

export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
  components: {
    Navbar,
    Sidebar,
  },
};
</script>
