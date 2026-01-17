import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'

// 统一定义接口
export const API = {
  // 获取品牌分页列表接口
  TRADEMARK_URL: '/admin/product/baseTrademark/',
  // 新增品牌接口和更新品牌接口
  ADDTRADEMARK_URL: '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL: '/admin/product/baseTrademark/update',
} as const

// 获取已有品牌的接口方法
// page:获取第几页---默认第一页
// //limit：获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

// 添加与修改已有品牌接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    // 更新品牌数据
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    // 新增一个品牌
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
