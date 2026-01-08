import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 需先安装 @types/node
// 1. 引入 SVG 插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 👇 引入 Mock 插件
import { viteMockServe } from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      // 2. 添加 SVG 插件配置
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定 symbolId 格式 (使用图标时的名字格式)
        symbolId: 'icon-[dir]-[name]',
      }),
      // 👇 Mock 数据配置
      viteMockServe({
        // 保证开发阶段可以使用 mock 接口
        // 注意：如果是新版插件，这里用 enable；如果是旧版，用 localEnabled
        enable: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        // 设置路径这里使用 path.resolve(__dirname, './src') 是最稳妥的
        '@': path.resolve(__dirname, './src'),
      },
    },
    // scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api', 'import'],
          additionalData: '@import "@/styles/variable.scss";',
        },
      },
    },
  }
})
