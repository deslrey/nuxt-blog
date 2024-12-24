export default defineNuxtConfig({
  srcDir: 'src/',
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
  ],
  css: [
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/display.css',
    '~/assets/css/global.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],
  nitro: {
    devProxy: {
      "/deslre": {
        target: "http://localhost:8080",
        changeOrigin: true,
        prependPath: true,
      },
    },
    // routeRules:{
    //   '/deslre/**':{
    //     proxy:'http://localhost:8080'
    //   }
    // }
  },
});
