<template>
  <!-- 顶部左侧动态 -->
  <el-icon style="margin-right: 10px">
    <Expand></Expand>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/">用户管理</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
