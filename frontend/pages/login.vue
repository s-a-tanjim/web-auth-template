<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Welcome back!</h2>

          <NotificationBanner :message="error.message" v-if="error.message"/>

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="user.email"
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
                  v-model="user.password"
                />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Log In</button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Don't have an account? <nuxt-link to="/register">Register</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const { loginWithLocal } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const user = ref({
  email: 'test@test.com',
  password: 'password',
});

const error = ref({
  message: ""
})

const router = useRouter();

definePageMeta({
  middleware: 'auth' // this should match the name of the file inside the middleware directory 
})

const login = async () => {
  try {
    await loginWithLocal(user.value);
  
    if (authenticated) {
      router.push('/');
    }
  } catch (err: any) {
    error.value.message = err;
  }
};

// export default {
//   middleware: 'guest',
//   data() {
//     return {
//       email: '',
//       password: '',
//       error: null
//     }
//   },

//   methods: {
//     async login() {
//       try {
//         await this.$auth.loginWithLocal({
//           email: this.email,
//           password: this.password
//         })

//         this.$router.push('/')
//       } catch (e) {
//         console.log(e)
//         this.error = e?.response?.data?.message
//       }
//     }
//   }
// }
</script>