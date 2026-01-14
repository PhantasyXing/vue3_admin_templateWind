<template>
  <el-card>
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" size="default" icon="plus">添加品牌</el-button>
    <!-- 表格组件：用于展示已有得平台数据
      table-column
        label：显示的标题
        border：是否带有纵向边框
        width：对应列的宽度
        align：对齐方式
    -->
    <el-table style="margin: 10px 0" border>
      <el-table-column width="80px" label="序号" align="center" />
      <el-table-column label="品牌名称" />
      <el-table-column label="品牌LOGO" />
      <el-table-column label="品牌操作" />
    </el-table>
    <!-- 分页器组件
        pagination
          v-model:current-page：当前页数
          v-model:page-size：每页显示条目个数
          background：是否为分页按钮添加背景色
          total：总条目数
          layout：组件布局，子组件名用逗号分隔
          page-sizes：每页显示个数选择器的选项设置
      -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="limit"
      :page-sizes="[3, 6, 9, 12]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total,"
      :total="400"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentPage = ref(1)
const limit = ref(3)
</script>

<style scoped lang="scss"></style>
