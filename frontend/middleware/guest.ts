import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const token = useCookie('access_token');

  console.log("From middleware")
  if (token.value) {
    return navigateTo(from);
  }

  // // if token doesn't exist redirect to log in
  // if (!token.value && to?.name !== 'login') {
  //   abortNavigation();
  //   return navigateTo('/login');
  // }
  // console.log('From auth middleware')
})
