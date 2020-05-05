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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: $--color-100;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;

  @media only screen and (min-width: 576px) {
    font-size: 14px;
  }

  @media only screen and (min-width: 768px) {
    font-size: 16px;
  }

  @include font-size(8, 24);
}
</style>
