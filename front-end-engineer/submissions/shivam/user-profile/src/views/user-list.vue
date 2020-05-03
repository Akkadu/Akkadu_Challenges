<template>
  <div class="user-list">
    <div class="user-list__wrapper">
      <h1 class="text-is-24-600 has-color-800 mb-5">User Profiles</h1>
      <p
        class="text-is-14-500 has-color-800 mb-20"
      >Here is a list of our some of our awesome users living in Long Horn, FuXingMen.</p>
      <no-user v-if="isUsersEmpty" />
      <user-card v-else v-for="user in users" :key="user.id" :user="user" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserCard from "../components/user-card";
import NoUser from "../components/no-user";

export default {
  components: {
    UserCard,
    NoUser
  },
  computed: {
    ...mapState(["users"]),
    isUsersEmpty() {
      for (let i in this.users) return false;
      return true;
    }
  }
};
</script>

<style lang="scss">
.user-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;

  &__wrapper {
    width: 100%;
    
    @media only screen and (min-width: 768px) {
      width: 700px;
    }
  }
}
</style>