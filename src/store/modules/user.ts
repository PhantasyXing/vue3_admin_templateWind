// 引入创建小仓库方法
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
// 引入路由
import { constantRoute } from '@/router/routes'
// 引入数据类型
import type { UserStatus } from './type/type'
import type {
  LoginFormData,
  LoginRespnseData,
  UserInfoRespnseData,
} from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 创建用户仓库
const useUserStore = defineStore('User', {
  // 用户数据
  state: (): UserStatus => {
    return {
      token: GET_TOKEN(), //用户的唯一标识
      menuStoreList: constantRoute,
      username: '',
      avatar: '',
    }
  },

  // 异步|逻辑的地方
  actions: {
    // 登录账号
    async userLogin(data: LoginFormData) {
      // 登录请求
      const result: LoginRespnseData = await reqLogin(data)
      // 登录请求：成功200-token
      // 登录请求：失败201-登录失败的信息
      if (result.code == 200) {
        // pinia仓库存储一下token
        this.token = result.data as string //告诉 TS，这里的 token 一定是 string
        // 由于pinia|vuex存储数据其实利用js对象
        // 本地存储持久化存储一份
        SET_TOKEN(result.data as string)
        return 'OK'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 获取用户信息
    async userInfo() {
      // 调用获取信息的接口
      const result: UserInfoRespnseData = await reqUserInfo()
      // 如果获取用户信息成功，那就存储用户信息
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(result.message)
      }
    },
    // 退出登录
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(result.message)
      }
    },
  },
  getters: {},
})

// 暴露（导出）出去
export default useUserStore
