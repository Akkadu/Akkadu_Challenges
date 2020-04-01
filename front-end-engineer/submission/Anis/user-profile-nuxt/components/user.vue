<template>
  <div class="user__profile">
    <!-- Nuxt Link to go to user profile -->
    <nuxt-link :to="`./${user.username}`" class="user__profile__body">
      <img :src="user.photo" class="user__profile__body--avatar" />
      <div class="user__profile__info">
        <h2 class="user__profile__info--name">{{user.name}}</h2>
        <div class="user__profile__info--row">
          <span class="user__profile__info--block">
            <font-awesome-icon icon="envelope" transform="shrink-4" />
            {{user.email}}
          </span>
          <span class="user__profile__info--block">
            <font-awesome-icon icon="phone-alt" transform="shrink-6" />
            {{user.phone | phoneFilter}}
          </span>
        </div>
        <span class="user__profile__info--block">
          <font-awesome-icon icon="building" transform="shrink-3" />
          {{ user.name }} - <i>{{ user.company.catchPhrase }}</i>
        </span>
      </div>
    </nuxt-link>
    <font-awesome-icon
      icon="times"
      class="user__profile__info--close"
      transform="shrink-6"
      @click="delUser(user)"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "user",
  //prop to component which should be an object
  props: {
    user: Object
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    //using Vuex mapaction to call a method
    ...mapActions({
      deleteSpecificUser: "deleteSpecificUser"
    }),
    //pass user id to vuex action 
    delUser(user) {
      this.deleteSpecificUser(user.id);
    }
  }
};
</script>
