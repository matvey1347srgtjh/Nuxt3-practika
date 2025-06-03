// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },


  runtimeConfig: {
    public:{
      apiBase : process.env.API_BASE_URL || 'http://localhost:3001'
    }
  },





    app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap', rel: 'stylesheet' }
      ]
    }
  },


  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/styles/_global.scss";`
        }
      }
    }
  },

  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt"
  ]
})