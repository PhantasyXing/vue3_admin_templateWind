import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'

const router = createRouter({
  // 路由模式hash
  history: createWebHashHistory(),
  routes: constantRoute,
  // 滚动行为：切换路由时，页面滚动到顶部
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
