import { createApp } from 'vue'
import App from '@/App.vue'
// 引入element-plus插件和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// SVG 插件脚本
import 'virtual:svg-icons-register'
// 注册全局组件
import globalComponent from '@/components/index'
// 引入自定义的全局样式
import '@/styles/index.scss'
// 引入路由
import router from './router'
// 引入pinia仓库
import pinia from './store/'
// 引入路由守卫
import '@/permission'

// 获取应用实例对象
const app = createApp(App)
// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn, //element-plus国际化配置
})
app.use(globalComponent)
// 安装路由
app.use(router)
// 安装大仓库
app.use(pinia)
// 将应用挂载到挂载点上
app.mount('#app')
