<template>
  <div class="container">
    <div class="row align-items-center justify-content-center mt-2 py-5">
      <div class="col-md-7 col-lg-6 ml-auto">
        <h3 class="mb-5">Sign in</h3>
        <form
          method="post"
          autocomplete="off"
          autocapitalize="off"
          class="max"
          @submit.prevent="submit()"
        >
          <div class="row">
            <fieldset class="form-group col-lg-12 mb-4">
              <div class="form-floating mb-3">
                <input
                  id="username"
                  v-model="form.username"
                  type="text"
                  class="form-control"
                  name="username"
                  placeholder="Username"
                />
                <label for="email">Username</label>
              </div>
            </fieldset>

            <fieldset class="form-group col-lg-12 mb-2">
              <div class="form-floating mb-3">
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                />
                <label for="password">Password</label>
              </div>
            </fieldset>

            <div class="d-grid mb-4">
              <button
                class="btn btn-primary btn"
                type="submit"
              >
                Signin
              </button>
            </div>

            <div class="text-center w-100 mt-4">
              <p class="text-muted font-weight-bold">
                No account?
                <nuxt-link to="signup" class="text-primary ml-2"
                  >Sign Up</nuxt-link
                >
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SigninPage',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    saveUser(id: number, name: string, token: string) {
      if (process.server) {
        return
      }

      this.$store.dispatch('user/setUser', {
        id, name, token
      })
    },

    async submit() {
      await this.$axios
        .$post('/signin', this.form)
        .then(({ success, token, user }) => {
          if (success) {
            this.saveUser(user.id, user.firstName, token)
            this.$toast.success('Welcome back ' + user.firstName)
            this.$router.push('/')
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
  },
})
</script>
