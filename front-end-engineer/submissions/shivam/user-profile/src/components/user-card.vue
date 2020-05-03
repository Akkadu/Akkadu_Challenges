<template>
  <div class="user-card">
    <i @click="$store.dispatch('deleteUser', user.id)" class="fas fa-times user-card__times-icon" />
    <div class="user-card__photo-wrapper">
      <img
        @click="$router.push({name: 'user-details', params: {id: user.id}})"
        :src="user.photo"
        alt="user picture"
        class="user-card__photo-wrapper__photo"
      />
    </div>
    <div class="user-card__user-info has-color-800">
      <div class="user-card__user-info__name pb-5">{{user.name}}</div>
      <div class="user-card__user-info__contact pb-10">
        <user-info
          :faIcon="'fa-envelope'"
          :infoText="user.email"
          :infoTextClass="'text-is-8-500'"
          class="pb-10"
        />
        <user-info :faIcon="'fa-phone'" :infoText="user.phone" :infoTextClass="'text-is-8-500'" />
      </div>
      <user-info
        :faIcon="'fa-hotel'"
        :infoText="user.company.name + ' - '"
        :infoTextClass="'text-is-8-500'"
        :infoSubtext="user.company.catchPhrase"
        :infoSubtextClass="'text-is-8-500 text-is-italic'"
      />
    </div>
  </div>
</template>

<script>
import UserInfo from "./user-info";
export default {
  components: {
    UserInfo
  },
  props: ["user"]
};
</script>

<style lang="scss">
.user-card {
  position: relative;
  background-color: $--color-050;
  width: 100%;
  min-width: 300px;
  margin: 5px 0;
  padding: 15px 20px;
  border: 1px solid $--color-150;
  border-radius: 6px;
  box-shadow: 0px 2px 4px 1px $--color-200;
  display: flex;

  &__times-icon {
    position: absolute;
    top: 0;
    right: 0;
    color: $--color-700;
    padding: 10px;
    font-size: 15px;
    cursor: pointer;
  }

  &__photo-wrapper {
    width: 100px;

    &__photo {
      border-radius: 50%;
      width: 100%;
      object-fit: cover;
      margin-right: 15px;
      border: 3px solid $--color-050;
      cursor: pointer;

      &:hover {
        border-color: $--color-800;
      }
    }
  }
  &__user-info {
    width: calc(100%-100px);
    padding-left: 16px;

    &__name {
      font-weight: 600;
      font-size: 1.8rem;
      @media only screen and (min-width: 576px) {
        font-size: 2.2rem;
      }
    }

    &__contact {
      @media only screen and (min-width: 576px) {
        display: flex;
      }
    }
  }
}
</style>