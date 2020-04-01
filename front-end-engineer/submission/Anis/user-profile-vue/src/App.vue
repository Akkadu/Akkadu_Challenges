<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
// Import vuex functions
import { mapGetters, mapActions } from "vuex";
// Import local components
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      getAllUsers: "getAllUsers"
    })
  },
  mounted(){
    //get all user on app launch
    this.getAllUsers()
  }
};
</script>