<template>
  <div>
    <div class="text-center">
      <h1>Web Auth Template</h1>
    </div>

    <div v-if="userData" class="text-center">
      <div>
        <p>Hi there!</p>
        <p>You are logged in as: {{ userData.email }}</p>
      </div>
      <div>
        <button class="button is-normal is-responsive" 
        @onclick="goToProfile">Go To Profile</button>
      </div>
    </div>
    
   
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const { userData } = storeToRefs(useAuthStore());
const router = useRouter();

const goToProfile = () => {
  router.push('/');
}
</script>

<style>
.text-center {
  text-align: center;
}
h1 {
  font-size: 2em;
  font-weight: bold;
}
</style>