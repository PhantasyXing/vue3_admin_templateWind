// 统一管理项目用户相关的接口
import request from '@/utils/request'
// 引入ts类型
import type {
  LoginFormData,
  LoginRespnseData,
  UserInfoRespnseData,
} from './type'
// 统一管理接口
export const API = {
  LOGIN_URL: '/admin/acl/index/login', //登录接口
  USERINFO_URL: '/admin/acl/index/info', //获取信息接口
  LOGOUT_URL: '/admin/acl/index/logout', //登出接口
} as const

// 暴露请求函数
// 登录接口方法
export const reqLogin = (data: LoginFormData) =>
  request.post<any, LoginRespnseData>(API.LOGIN_URL, data)
// 获取用户信息接口方法
export const reqUserInfo = () =>
  request.get<any, UserInfoRespnseData>(API.USERINFO_URL)
// 退出登录接口方法
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
