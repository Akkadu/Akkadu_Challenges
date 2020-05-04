<template>
  <div v-if="user" class="user-details">
    <div @click="$router.push({name: 'user-list'})" class="has-color-700 cursor-is-pointer">
      <i class="fas fa-arrow-left text-is-14" />
      <span class="text-is-16-500 pl-10">Back to Profiles</span>
    </div>
    <div class="user-details__wrapper">
      <div class="user-details__wrapper__name-with-photo">
        <div class="user-details__wrapper__name-with-photo__photo-wrapper">
          <img
            :src="user.photo"
            alt="user photo"
            class="user-details__wrapper__name-with-photo__photo-wrapper__photo"
          />
        </div>
        <h2 class="user-details__wrapper__name-with-photo__name">{{user.name}}</h2>
      </div>
      <div class="user-details__wrapper__info-wrapper">
        <h1
          class="user-details__wrapper__info-wrapper__name text-is-24-600 has-color-800"
        >{{user.name}}</h1>
        <div class="user-details__wrapper__info-wrapper__info">
          <user-info
            :infoIcon="mailIconClass"
            :infoText="user.email"
            :infoTextClass="infoTextClass"
            class="pb-20"
          />
          <user-info
            :infoIcon="phoneIconClass"
            :infoText="user.phone"
            :infoTextClass="infoTextClass"
            class="pb-20"
          />
          <user-info
            :infoIcon="companyIconClass"
            :infoText="user.company.name"
            :infoSubtext="user.company.catchPhrase"
            :infoTextClass="infoTextClass"
            :infoSubtextClass="infoSubtextClass"
            :isSubtextInline="isSubtextInline"
            class="pb-20"
          />
          <user-info
            :infoIcon="addressIconClass"
            :infoText="user.address.street"
            :infoTextClass="infoTextClass"
            class="pb-20"
          />
          <user-info
            :infoIcon="websiteIconClass"
            :infoText="user.website"
            :infoTextClass="infoTextClass"
          />
        </div>
        <div @click="deleteUser" class="user-details__wrapper__info-wrapper__delete-button">
          <i class="far fa-trash-alt" />
          <span class="text-is-10-600">Delete</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from "../components/user-info";
export default {
  components: {
    UserInfo
  },
  data() {
    return {
      infoTextClass: "text-is-12-500 has-color-700",
      infoSubtextClass: "text-is-12-500 has-color-700 text-is-italic",
      isSubtextInline: false,
      mailIconClass: "fas fa-envelope text-is-12 pr-10 has-color-800",
      phoneIconClass: "fas fa-phone text-is-12 pr-10 has-color-800",
      companyIconClass: "fas fa-hotel text-is-12 pr-10 has-color-800",
      addressIconClass: "fas fa-search text-is-12 pr-10 has-color-800",
      websiteIconClass: "fas fa-globe-africa text-is-12 pr-10 has-color-800"
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser(this.$route.params.id);
    }
  },
  methods: {
    deleteUser() {
      this.$store.dispatch("deleteUser", this.$route.params.id);
      this.$router.push({ name: "user-list" });
    }
  }
};
</script>

<style lang="scss">
.user-details {
  padding: 48px;

  &__wrapper {
    width: 100%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;

    @media only screen and (min-width: 992px) {
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
    }

    &__name-with-photo {
      display: flex;
      flex-direction: column;
      align-items: center;

      @media only screen and (min-width: 992px) {
        padding-left: 200px;
      }

      &__photo-wrapper {
        width: 180px;

        @media only screen and (min-width: 992px) {
          width: 250px;
        }

        &__photo {
          width: 100%;
          object-fit: cover;
        }
      }
      &__name {
        padding-top: 16px;
        font-size: 1.8rem;
        font-weight: 600;
        text-align: center;
        color: $--color-800;

        @media only screen and (min-width: 992px) {
          font-size: 1.4rem;
          font-weight: 500;
          color: $--color-700;
        }
      }
    }

    &__info-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 300px;

      @media only screen and (min-width: 992px) {
        padding-left: 80px;
        flex: 1;
      }

      &__name {
        display: none;

        @media only screen and (min-width: 992px) {
          display: block;
        }
      }

      &__info {
        padding: 60px 0;

        @media only screen and (min-width: 992px) {
          padding-top: 30px;
        }
      }

      &__delete-button {
        color: $--color-000;
        background-color: $--color-250;
        width: 100px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>