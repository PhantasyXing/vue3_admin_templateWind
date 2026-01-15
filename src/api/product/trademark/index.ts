import request from '@/utils/request'

export const API = {
  TRADEMARK_URL: '/admin/product/baseTrademark/',
} as const

export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, any>(API.TRADEMARK_URL + `${page}/${limit}`)
