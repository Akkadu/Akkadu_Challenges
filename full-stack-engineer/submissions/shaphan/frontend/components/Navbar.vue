<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Market Place</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav">
        <li class="nav-item">
          <nuxt-link class="nav-link active" aria-current="page" to="/">Products</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "NavBar",
  })
</script>
