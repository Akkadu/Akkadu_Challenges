<template>
  <section class="profile__page">
    <div class="back__view">
      <nuxt-link to="/" class="back__view__link">
        <font-awesome-icon icon="arrow-left" />&nbsp;&nbsp; Back to Profiles
      </nuxt-link>
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
            <font-awesome-icon icon="envelope" class="user__profile__info--block--icon" />
            {{ user.email }}
          </li>
          <li class="user__profile__info--block">
            <font-awesome-icon icon="phone-alt" class="user__profile__info--block--icon" />
            {{ user.phone }}
          </li>
          <li class="user__profile__info--block">
            <font-awesome-icon icon="building" class="user__profile__info--block--icon" />
             <span>
                {{ user.company.name }}
              <br />
              <i>
              {{ user.company.catchPhrase }}</i>
             </span>
          </li>
          <li class="user__profile__info--block">
            <font-awesome-icon icon="map-pin" class="user__profile__info--block--icon" />
            {{ user.address.street }}
          </li>
          <li class="user__profile__info--block">
            <font-awesome-icon icon="globe-americas" class="user__profile__info--block--icon" />
            {{ user.website }}
          </li>
        </ul>

        <span class="user__profile__info--block">
          <button class="user__profile__info--block--btn" @click="deletUser">
            <font-awesome-icon
              icon="trash-alt"
              transform="shrink-4"
              class="user__profile__info--block--icon"
            />&nbsp;&nbsp;Delete
          </button>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
// Import vuex functions
import { mapGetters, mapActions } from "vuex";
export default {
// data obj
  data() {
    return {
      showUser: false,
      title: ""
    };
  },
  computed: {
    ...mapGetters({
      user: "currentUser"
    })
  },
  methods: {
    ...mapActions({
      getSpacificUser: "getSpacificUser",
      deleteSpecificUser: "deleteSpecificUser"
    }),
    //delete user method which call a vuex promise action and handle it after resolve/reject
    deletUser(user) {
      this.deleteSpecificUser(user.id)
        .then(res => {
          //nuxt router go back function
          this.$router.back();
        })
        .catch(err => {
          console.log("err ", err);
        });
    }
  },
  //setting page title
  head() {
    return {
      title: this.title
    };
  },
  //vue watch hook
  watch: {
    //watching user object
    user(newVal) {
      let that = this;
      if (newVal) { //if triger any new value page title will be set as user object name
        that.title = newVal.name;
      }
    }
  },
  //mounted hook
  mounted() {
    let that = this;
    //get router params
    let user = this.$route.params.username;
    //call a vuex promise action 
    this.getSpacificUser(user)
      .then(res => {
        //update showUser field
        that.showUser = true;
      })
      .catch(err => {
        //redirect to previous page if promise rejects
        this.$router.back();
        console.log(err.status);
      });
  }
};
</script>