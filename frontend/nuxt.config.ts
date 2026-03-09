export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',
  devtools: { enabled: true },
  runtimeConfig: {
    public:
      apiBase: '/api'
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  nitro: {
    compressPublicAssets: true
  }
})