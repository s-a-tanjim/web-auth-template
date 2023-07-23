import { defineStore } from 'pinia';

interface UserPayloadInterface {
  email: string;
  password: string;
}

interface UserDataInterface {
  email: string,
  user_name: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    userData: null
  }),
  actions: {
    async loginWithLocal({ email, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data, pending, error }: any = await useFetch('http://localhost:3001/api/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
        },
      });
      this.loading = pending;

      if (data.value) {
        const access_token = useCookie('access_token');
        access_token.value = data?.value?.access_token;
        const refresh_token = useCookie('refresh_token');
        refresh_token.value = data?.value?.refresh_token;
        
        this.userData = data?.value?.user;
        this.authenticated = true;
      } else {
        throw error?.value?.data?.message;
      }
    },
    logUserOut() {
      const token = useCookie('access_token');
      this.authenticated = false;
      token.value = null;
    },
  },
});