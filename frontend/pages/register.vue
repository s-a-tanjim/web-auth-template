<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Register!</h2>

          <NotificationBanner :message="error" v-if="error"/>

          <form method="post" @submit.prevent="register">
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="username"
                  v-model="user_name"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                  required
                />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Register</button>
            </div>
          </form>

          <div class="has-text-centered" style="margin-top: 20px">
            Already got an account? <nuxt-link to="/login">Login</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- <script lang="ts">

definePageMeta({
  middleware: 'auth'
})
</script> -->
<script>
// definePageMeta({
//   middleware: 'auth',
//   auth: 'guest'
// })
export default {
  middleware: 'auth',
  data() {
    return {
      user_name: '',
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async register() {
      try {
        var res = await fetch('http://localhost:3001/api/user/signup', {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            user_name: this.user_name,
            email: this.email,
            password: this.password
          }),
        });
        console.log("Signup Successful. Redirecting to login page.")
        
        return navigateTo('/login')

        // await this.$auth.loginWith('local', {
        //   data: {
        //   email: this.email,
        //   password: this.password
        //   },
        // })

        // this.$router.push('/')
      } catch (e) {
        console.log(e)
        this.error = e
      }
    }
  }
}
</script>