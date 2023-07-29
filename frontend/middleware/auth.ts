import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const token = useCookie('access_token');

  if (token.value) {
    const {data, error} = await useFetch('http://localhost:3001/api/auth/verify', {
      method: 'POST',
      body: {
        access_token: token
      }
    })
    if(data.value)
      authenticated.value = true
    else
      authenticated.value = false
  } else {
    authenticated.value = false
  }

  // if token exists and url is /login redirect to homepage
  if (authenticated.value && to?.name === 'login') {
    return navigateTo('/');
  }

  // if token doesn't exist redirect to log in
  if (!authenticated.value && to?.name !== 'login') {
    abortNavigation();
    return navigateTo('/login');
  }
  console.log('From auth middleware')
})
