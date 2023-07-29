<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
      <div class="content">
        <p>
          <strong>Email:</strong>
          {{ userInfo?.email }}
        </p>
        <p>
          <strong>Name:</strong>
          {{ userInfo?.user_name }}
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const { userInfo } = storeToRefs(useAuthStore());

// import { mapGetters } from "vuex";

// export default {
//   middleware: "auth",
//   computed: {
//     ...mapGetters(["loggedInUser"]),
//   },
// };
</script>