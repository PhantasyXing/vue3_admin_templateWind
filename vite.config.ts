import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 需先安装 @types/node
// 1. 引入 SVG 插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 2. 添加 SVG 插件配置
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定 symbolId 格式 (使用图标时的名字格式)
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      // 设置路径这里使用 path.resolve(__dirname, './src') 是最稳妥的
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api', 'import'],
        additionalData: '@import "@/styles/variable.scss";',
      },
    },
  },
})
