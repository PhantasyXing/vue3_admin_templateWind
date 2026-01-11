<template>
  <div class="tabber">
    <div class="tabber_left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabber_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style scoped lang="scss">
.tabber {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(
    to right,
    #ee9ca7,
    #ffdde1,
    #ee9ca7,
    #ffdde1
  );
  .tabber_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabber_right {
    display: flex;
    align-items: center;
  }
}
</style>
