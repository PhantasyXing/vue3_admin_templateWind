// 引入 SvgIcon 组件
import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'

// 全局对象
const components: { [name: string]: Component } = { SvgIcon }

export default {
  // 务必叫做 install 方法
  install(app: App) {
    // 遍历 components 对象，注册每个组件
    Object.entries(components).forEach(([key, component]) => {
      app.component(key, component)
    })
  },
}
