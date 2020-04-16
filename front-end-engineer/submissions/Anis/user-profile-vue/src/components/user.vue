<template>
  <div class="user__profile">
    <!-- Link to go to user profile -->
    <router-link
      :to="{name: 'Profile', params: {username: user.username}}"
      class="user__profile__body"
    >
      <img :src="user.photo" class="user__profile__body--avatar" />
      <div class="user__profile__info">
        <h2 class="user__profile__info--name">{{user.name}}</h2>
        <div class="user__profile__info--row">
          <span class="user__profile__info--block">
            <v-icon name="envelope" scale="0.7" />
            {{user.email}}
          </span>
          <span class="user__profile__info--block">
            <v-icon name="phone-alt" scale="0.7" />
            {{user.phone | phoneFilter}}
          </span>
        </div>
        <span class="user__profile__info--block">
          <v-icon name="building" scale="0.8" />
          {{ user.name }} -
          <i>{{ user.company.catchPhrase }}</i>
        </span>
      </div>
    </router-link>
    <div @click="delUser(user)">
      <v-icon name="times" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'user',
  //prop to component which should be an object
  props: {
    user: Object
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    //using Vuex mapaction to call a method
    ...mapActions({
      deleteSpecificUser: 'deleteSpecificUser'
    }),
    //pass user id to vuex action
    delUser(user) {
      this.deleteSpecificUser(user.id)
    }
  }
}
</script>
