import { defineStore } from 'pinia';

interface UserPayloadInterface {
  email: string;
  password: string;
}

export interface UserDataInterface {
  email: string,
  user_name: string
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    userData: UserDataInterface;
  }
}


export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    userData: {
      email: "",
      user_name: ""
    }
  }),
  getters: {
    isAuthenticated: (state):boolean => state.authenticated,
    userInfo: (state): UserDataInterface => state.userData
  },
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
    async getUserInfo() {
      const access_token = useCookie('access_token')
      if (access_token.value) {
        const {data, error}: any = await useFetch('http://localhost:3001/api/user', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + access_token.value
          }
        })

        if(data.value) {
          this.authenticated = true
          this.userData = data.value
        } else {
          this.authenticated = false
          console.log(error.value)
        }
      } else {
        this.authenticated = false
      }

    },
    logUserOut() {
      useCookie('access_token').value = null
      useCookie('refresh_token').value = null
      this.authenticated = false;
      this.userData = {
        email: "",
        user_name: ""
      }
    },
  },
});