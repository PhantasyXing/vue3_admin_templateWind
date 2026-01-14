// 登录接口需要携带参数ts类型
// 用户登录接口携带参数的ts类型
export interface LoginFormData {
  username: string
  password: string
}

// 定义全部接口返回数据都拥有ts类型
export interface RespnseData {
  code: number
  message: string
  ok: boolean
}

// 定义登录接口返回的数据类型
export interface LoginRespnseData extends RespnseData {
  data: string
}

// 定义获取信息接口返回数据类型
export interface UserInfoRespnseData extends RespnseData {
  data: {
    avatar: string
    buttons: string[]
    name: string
    roles: string[]
    routes: string[]
  }
}
