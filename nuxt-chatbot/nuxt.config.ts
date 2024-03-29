// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare-pages'
  },
  devtools: { enabled: true },
  routeRules: {
    '/api/auth/**': {
        cors: true,
     },
},  
})
