<template>
  <section class="home__page">
    <div v-if="isLoading">
      <loader />
    </div>
    <div v-if="users.length">
      <h1 class="home__page__title">User Profiles</h1>
      <div
        class="home__page__title-sub"
      >Here's a list of some of our awesome users living in Long Horn, FuXingMen.</div>
      <div class="home__page__users">
        <user v-for="(user , index)  in users" :key="index" :user="user" />
      </div>
    </div>
    <div v-if="!users.length && !isLoading">
      <div class="home__page__empty__view">
        <img
          src="@/assets/images/no-users-icon.png"
          class="home__page__empty__view__image"
          alt="No User Image"
        />
        <p class="home__page__empty__view__text">
          Looks like you have no more users to view. Click the "Request Users" button to request for more
          users.
        </p>
        <button class="button__request-user" @click="requestUsers">Request Users</button>
      </div>
    </div>
  </section>
</template>

<script>
// Import vuex functions
import { mapGetters, mapActions } from "vuex";
// Import local components
import user from "@/components/user";
import loader from "@/components/loader";
export default {
  //define components
  components: {
    user,
    loader
  },
  data() {
    return {};
  },
  //computed data from store
  computed: {
    ...mapGetters({
      users: "userList",
      isLoading: "isLoading"
    })
  },
  methods: {
    ...mapActions({
      getAllUsers: "getAllUsers"
    }),
  //local call to get all users using Vuex action
    requestUsers() {
      this.getAllUsers();
    }
  },
  mounted() {
    //get all users on mounted lifecycle hook
    console.log(this.users.length)
    if (!this.users.length) {
      console.log('called')
      this.getAllUsers();
    }
  }
};
</script>