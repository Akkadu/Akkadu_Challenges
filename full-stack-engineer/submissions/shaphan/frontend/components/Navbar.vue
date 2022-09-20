<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <nuxt-link class="navbar-brand" to="/">Market Place</nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <nuxt-link class="nav-link active" aria-current="page" to="/"
              >Products</nuxt-link
            >
          </li>
          <li class="nav-item">
            <a
              v-if="isLoggedIn"
              class="nav-link active"
              aria-current="page"
              style="cursor: pointer"
              @click.prevent="signOut()"
              >Sign out</a
            >
            <nuxt-link
              v-if="!isLoggedIn"
              class="nav-link active"
              aria-current="page"
              to="signin"
              >Sign in</nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NavBar',
  computed: {
    isLoggedIn () {
      return this.$store.getters["user/isLoggedIn"]
    }
  },
  mounted() {
    this.$store.dispatch("user/logOn")
  },
  methods: {
    signOut() {
      this.$store.dispatch("user/logOut")
      return this.$router.push('/signin')
    },
  },
})
</script>
