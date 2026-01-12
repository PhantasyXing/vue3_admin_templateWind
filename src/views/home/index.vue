<template>
  <div>
    <h1>我是一级路由展示页{{ userStore.username }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped></style>
