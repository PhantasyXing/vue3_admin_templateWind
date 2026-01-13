<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    alt="头像"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
const layoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
// 引入路由器对象和路由对象
const $router = useRouter()
const $route = useRoute()
// 刷新按钮的回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 全屏按钮的回调
const fullScreen = () => {
  // DOM对象的一个属性：可以用来判断当前是不是全屏模式[全屏：true，不是全屏：false]
  const full = document.fullscreenElement
  // 切换全屏模式
  if (!full) {
    // 文档根节点的方法requestFullscreen，实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 变为不是全屏模式->退出全屏模式
    document.exitFullscreen()
  }
}
// 退出登录的回调
const logout = () => {
  // 给定一个回调给服务器发请求、用户相关的数据清空、跳转登录页面、携带query参数重新登陆时重定向
  userStore.userLogout()

  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped lang="scss"></style>
