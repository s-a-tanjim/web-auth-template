<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth';
const store = useAuthStore();
const {logUserOut} = useAuthStore()

const { isAuthenticated, userInfo } = storeToRefs(store)


// export default {
//   computed: {
//     // ...mapGetters(["isAuthenticated", "loggedInUser"])
//   },
//   data(){
//     return {
//       isAuthenticated: false,
//       loggedInUser: false,
//     }
//   },
//   methods: {
//     async logout() {
//       // logout
//     }
//   }
// }


const logout = async () => {
  try {
    await logUserOut();
  } catch (err: any) {
    err.value.message = err;
  }
};

</script>
<template>
  <nav class="navbar is-light">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">Nuxt JWT Auth</nuxt-link>
        <button class="button navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div
            class="navbar-item has-dropdown is-hoverable"
            v-if="isAuthenticated"
          >
            <a class="navbar-link">
              {{ userInfo?.email }}
            </a>
            <div class="navbar-dropdown">
              <nuxt-link class="navbar-item" to="/profile"
                >My Profile</nuxt-link
              >
              <hr class="navbar-divider" />
              <a class="navbar-item" @click="logout">Logout</a>
            </div>
          </div>
          <template v-else>
            <nuxt-link class="navbar-item" to="/register">Register</nuxt-link>
            <nuxt-link class="navbar-item" to="/login">Log In</nuxt-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>
