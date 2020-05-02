<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("loadUsers");
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/main.scss";

body {
  margin: 0;
}

#app {
  background-color: $--color-100;
  font-family: sans-serif;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
}
</style>
