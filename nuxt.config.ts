export default defineNuxtConfig({
  srcDir: 'src/',  // 确保项目结构正确
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',        // 这里放置模块
    '@pinia/nuxt',               // Pinia 模块
  ],
  css: [
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/display.css',
    '~/assets/css/global.css'
  ],
});
