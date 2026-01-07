// 👇 SVG 图标插件的虚拟模块类型声明
declare module 'virtual:svg-icons-register' {
  const component: any
  export default component
}

declare module 'virtual:svg-icons-names' {
  const iconsNames: string[]
  export default iconsNames
}

/// <reference types="vite/client" />

// 解决 Element Plus 中文包的类型报错
declare module 'element-plus/dist/locale/zh-cn.mjs'

// 环境变量类型
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_SERVE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 解决 .vue 文件导入报错 (如果你的编辑器不报错，这段也可以不加)
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
