// 登录接口需要携带参数ts类型  loginForm
export interface LoginForm {
  username: string
  password: string
}
// data中token的类型  dataType
interface DataType {
  token: string
}
// 登录接口返回数据类型 loginRespnseData
export interface LoginRespnseData {
  code: number
  data: DataType
}

// userInfo
interface UserInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
// user
interface User {
  checkUser: UserInfo
}
// 定义服务器返回用户相关的数据类型  userResponseData
export interface UserResponseData {
  code: number
  data: User
}
