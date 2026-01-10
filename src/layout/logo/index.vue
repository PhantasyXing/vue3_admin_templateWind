<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.img" alt="Logo" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  align-items: center;
  padding: 20px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-menu-title-fontsize;
    margin-left: 10px;
  }
}
</style>
