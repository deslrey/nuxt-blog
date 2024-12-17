export default defineNuxtConfig({
  srcDir: 'src/',  // 确保项目结构正确
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  plugins: [
    { src: '~/plugins/ant-design-vue.js', ssr: false }  // 不需要 src 目录前缀
  ]
})
