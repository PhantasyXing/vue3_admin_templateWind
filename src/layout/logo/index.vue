<template>
  <div
    class="logo"
    v-if="setting.logoHidden"
    :class="{ fold: LayoutSettingStore.fold }"
  >
    <img :src="setting.img" alt="Logo" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useLayoutSettingStore from '@/store/modules/setting'
const LayoutSettingStore = useLayoutSettingStore()
</script>

<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  align-items: center;
  padding: 10px;
  overflow: hidden;
  img {
    min-width: 40px;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }
  p {
    font-size: $base-menu-title-fontsize;
    margin-left: 10px;
    white-space: nowrap;
    opacity: 1;
    transition: opacity 0.2s;
  }
  // 折叠时隐藏文字
  &.fold {
    p {
      opacity: 0;
      margin-left: 0;
    }
  }
}
</style>
