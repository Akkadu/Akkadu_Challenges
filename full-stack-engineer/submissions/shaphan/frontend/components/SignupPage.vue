<template>
  <div class="container">
    <div class="row align-items-center justify-content-center mt-2 py-5">
      <div class="col-md-7 col-lg-6 ml-auto">
        <h3 class="mb-5">Sign Up</h3>
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
                  id="fullName"
                  v-model="form.fullName"
                  type="text"
                  class="form-control"
                  name="fullName"
                  placeholder="Full Name"
                />
                <label for="email">Full Name</label>
              </div>
            </fieldset>

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

            <fieldset class="form-group col-lg-12 mb-2">
              <div class="form-floating mb-3">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  type="password"
                  class="form-control"
                  name="confirmPassword"
                  placeholder="Password"
                />
                <label for="confirmpassword">Repeat Password</label>
              </div>
            </fieldset>

            <div class="d-grid mb-4">
              <button
                class="btn btn-primary btn"
                type="submit"
              >
                Sign up
              </button>
            </div>

            <div class="text-center w-100 mt-4">
              <p class="text-muted font-weight-bold">
                Already have account?
                <nuxt-link to="signin" class="text-primary ml-2"
                  >Sign in</nuxt-link
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
  name: 'SignupPage',
  data() {
    return {
      form: {
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  methods: {
    async submit() {
      await this.$axios
        .$post('/signup', this.form)
        .then(({ success }) => {
          if (success) {
            this.$toast.success('Signup successful')
            this.$router.push('/signin')
          }
        })
        .catch((e) => {
          this.$toast.error(e.response.data.message)
        })
    },
  },
})
</script>
