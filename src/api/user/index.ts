// 统一管理项目用户相关的接口
import request from '@/utils/request'
import type { LoginForm, LoginRespnseData, UserResponseData } from './type'
// 统一管理接口
export const API = {
  LOGIN_URL: '/user/login',
  USERINFO_URL: '/user/info',
} as const

// 暴露请求函数
// 登录接口方法
export const reqLogin = (data: LoginForm) =>
  request.post<any, LoginRespnseData>(API.LOGIN_URL, data)
// 获取用户信息接口方法
export const reqUserInfo = () => request.get<UserResponseData>(API.USERINFO_URL)
