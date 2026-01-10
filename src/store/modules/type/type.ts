import type { RouteRecordRaw } from 'vue-router'

export interface UserStatus {
  token: string | null
  menuStoreList: RouteRecordRaw[]
}
