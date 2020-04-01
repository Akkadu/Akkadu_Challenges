<template>
  <section class="profile__page">
    <div class="back__view">
      <router-link to="/" class="back__view__link">
        <v-icon name="arrow-left" scale="1.4" />
        <span class="back__view__link--text">Back to Profiles</span>
      </router-link>
    </div>
    <div class="profile__view" v-if="showUser">
      <div class="profile__view__content--left">
        <img
          :src="user.photo"
          :alt="`${user.name} profile photo`"
          class="profile__view__content__avatar"
        />
        <p class="profile__view__content__name">{{ user.name }}</p>
      </div>
      <div class="profile__view__content--right">
        <h1 class="profile__view__user__name">{{ user.name }}</h1>
        <ul class="user__profile__info">
          <li class="user__profile__info--block">
            <v-icon name="envelope" class="user__profile__info--block--icon" />
            {{ user.email }}
          </li>
          <li class="user__profile__info--block">
            <v-icon name="phone-alt" class="user__profile__info--block--icon" />
            {{ user.phone }}
          </li>
          <li class="user__profile__info--block">
            <v-icon name="building" class="user__profile__info--block--icon" />
            <span>
              {{ user.company.name }}
              <br />
              <i>{{ user.company.catchPhrase }}</i>
            </span>
          </li>
          <li class="user__profile__info--block">
            <v-icon name="map-pin" class="user__profile__info--block--icon" />
            {{ user.address.street }}
          </li>
          <li class="user__profile__info--block">
            <v-icon name="globe" class="user__profile__info--block--icon" />
            {{ user.website }}
          </li>
        </ul>

        <span class="user__profile__info--block">
          <button class="user__profile__info--block--btn" @click="deletUser">
            <v-icon name="trash" class="user__profile__info--block--icon" />&nbsp;&nbsp;Delete
          </button>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
// Import vuex functions
import { mapGetters, mapActions } from 'vuex'
export default {
  // data obj
  data() {
    return {
      showUser: false,
      title: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'currentUser'
    })
  },
  methods: {
    ...mapActions({
      getSpacificUser: 'getSpacificUser',
      deleteSpecificUser: 'deleteSpecificUser'
    }),
    //delete user method which call a vuex promise action and handle it after resolve/reject
    deletUser(user) {
      this.deleteSpecificUser(this.user.id)
        .then(res => {
          //vue router go back function
          this.$router.go(-1)
        })
        .catch(err => {
          console.log('err ', err)
        })
    }
  },
  //mounted hook
  mounted() {
    let that = this
    //get router params
    let user = this.$route.params.username
    // call a vuex promise action
    this.getSpacificUser(user)
      .then(res => {
        //update showUser field
        that.showUser = true
      })
      .catch(err => {
        //redirect to previous page if promise rejects
        that.$router.go(-1)
        console.log(err.status)
      })
  }
}
</script>