// 引入创建小仓库方法
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin } from '@/api/user/index'
// 引入路由
import { constantRoute } from '@/router/routes'
// 引入数据类型
import type { LoginForm, LoginRespnseData } from '@/api/user/type'
import type { UserStatus } from './type/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
// 创建用户仓库
const useUserStore = defineStore('User', {
  // 用户数据
  state: (): UserStatus => {
    return {
      token: GET_TOKEN(), //用户的唯一标识
      menuStoreList: constantRoute,
    }
  },

  // 异步|逻辑的地方
  actions: {
    async userLogin(data: LoginForm) {
      // 登录请求
      const result: LoginRespnseData = await reqLogin(data)
      // 登录请求：成功200-token
      // 登录请求：失败201-登录失败的信息
      if (result.code == 200) {
        // pinia仓库存储一下token
        this.token = result.data.token as string //告诉 TS，这里的 token 一定是 string
        // 由于pinia|vuex存储数据其实利用js对象
        // 本地存储持久化存储一份
        SET_TOKEN(result.data.token as string)
        return 'OK'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

// 暴露（导出）出去
export default useUserStore
