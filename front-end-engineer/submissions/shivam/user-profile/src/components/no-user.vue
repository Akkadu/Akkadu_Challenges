<template>
  <div class="no-users">
    <div class="no-users__icon-wrapper">
      <img
        src="@/assets/icons/no-users-icon.png"
        alt="no users"
        class="no-users__icon-wrapper__icon"
      />
    </div>
    <p
      class="no-users__text has-color-800"
    >Looks like you have no more users to view. Click the "Request Users" button to request for more users.</p>
    <div @click="$store.dispatch('loadUsers')" class="no-users__request-button">Request Users</div>
  </div>
</template>

<style lang="scss">
.no-users {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;

  &__icon-wrapper {
    width: 100px;

    @media only screen and (min-width: 576px) {
      width: 150px;
    }

    &__icon {
      width: 100%;
      object-fit: cover;
    }
  }

  &__text {
    padding: 100px 24px;
    text-align: center;
    font-size: 1.8rem;

    @media only screen and (min-width: 576px) {
      width: 100%;
      font-size: 1.4rem;
    }
  }

  &__request-button {
    width: 180px;
    color: $--color-000;
    background-color: $--color-800;
    border-radius: 6px;
    padding: 20px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;

    @media only screen and (min-width: 576px) {
      width: 220px;
      padding: 24px;
      font-size: 1.4rem;
    }
  }
}
</style>