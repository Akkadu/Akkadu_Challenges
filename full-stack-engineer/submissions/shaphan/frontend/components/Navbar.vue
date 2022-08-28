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
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" v-if="user != null" style="cursor: pointer;" @click.prevent="signOut()">Sign out</a>
          <nuxt-link class="nav-link active" aria-current="page" v-if="user == null" to="signin">Sign in</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script lang="ts">
import Vue from 'vue'

interface User {
  id: number;
  fullName: string;
  token: string;
}

interface ComponentData {
  user: User | null;
}

export default Vue.extend({
    name: "NavBar",
    data(): ComponentData {
      return {
        user: null,
      }
    },
    mounted() {
      this.$store.commit('user/logOnUser')
      const { user } = this.$store.state.user
      this.user = user

    },
    methods: {
      signOut() {
        this.$store.commit('user/logOutUser')
        return this.$router.push('/signin')
      },
    }
  })
</script>
