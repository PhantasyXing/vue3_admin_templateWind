// 进行二次封装axios：使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 1. 引入进度条插件和样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 2. 这里的配置可以去掉进度条的小圆圈转圈效果，看个人喜好
nprogress.configure({ showSpinner: false })

// 第一步：利用axios对象的create方法，创建一个axios实例（配置基础配置，和请求响应拦截器）
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

// 第二步：request实例添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 开启进度条
    nprogress.start()
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 第三步：request实例添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 关闭进度条
    nprogress.done()
    // 简化数据，直接返回data
    return response.data
  },
  (error) => {
    // 关闭进度条
    nprogress.done()
    // 处理网络错误
    let msg = ''
    // 注意：error.response 可能不存在（例如断网或超时）
    const status = error.response ? error.response : 0

    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '网络出现问题'
    }
    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(error)
  },
)

export default request
