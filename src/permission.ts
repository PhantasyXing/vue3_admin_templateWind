// 路由鉴权：鉴权，项目当中路由能不能被的权限的设置
import router from '@/router'
import nProgress from 'nprogress'
nProgress.configure({ showSpinner: false })
// 引入token
import pinia from './store'
import useUserStore from './store/modules/user'
const userStore = useUserStore(pinia)
//
import setting from './setting'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 全局守卫：项目当中任意路由切换都会触发的钩子
// 前置路由守卫
router.beforeEach(async (to) => {
  document.title = `${setting.title}-${to.meta.title}`
  // to:要去哪个路由
  // form:来自哪个路由
  nProgress.start()
  // 获取token
  const token = userStore.token
  // 获取用户名字
  const username = userStore.username
  // 是否登录
  if (token) {
    // 登录状态，访问login，重定向到首页
    if (to.name === 'login') {
      return '/'
    } else {
      // 给其他六个路由放行
      // 判断是否有用户信息
      if (username) {
        return true
      } else {
        // 没有用户信息，重新发请求获取用户信息再放行
        try {
          // 获取用户信息
          await userStore.userInfo()
          // 放行
          return true
        } catch (error) {
          // token过期
          // 用户手动修改了本地存储
          console.log(error)
          userStore.userLogout()
          return { name: 'login', query: { redirect: to.path } }
        }
      }
    }
  } else {
    // 未登录状态
    if (to.name === 'login') {
      return true
    } else {
      return { name: 'login', query: { redirect: to.path } }
    }
  }
})

// 后置路由守卫
router.afterEach(() => {
  nProgress.done()
})

// 第一个问题：任意路由切换实现进度条业务 ---nprogress
// 第二个问题：路由鉴权（路由组件访问权限的设置）
// 全部的路由组件：登录 | 404| 任意路由| 首页| 数据大屏| 权限管理(三个子路由)| 商品管理(四个子路由)

// 未登录：可以访问Login，其余6个不能访问(指向Login)
// 登录：其余6个可以访问，Login不能访问(指向首页)
