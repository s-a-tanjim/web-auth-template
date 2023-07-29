<template>
  <div>
    <navbar />
    <slot />
    <!-- <AppFooter /> -->
  </div>
</template>
<script>
import { useAuthStore } from '~/store/auth';

const { getUserInfo } = useAuthStore()
export default {
  async created() {
    await getUserInfo()
  }
}
</script>