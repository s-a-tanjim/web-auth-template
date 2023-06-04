// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      title: 'Web Auth Test',
      htmlAttrs: {
        lang: 'en'
      },
      link: [{
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css'
        }
      ]
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
})
