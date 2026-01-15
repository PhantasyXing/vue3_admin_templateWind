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
    <el-table style="margin: 10px 0" border :data="trademarkArr">
      <el-table-column
        width="80px"
        label="序号"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称">
        <template #default="{ row }">
          <pre>{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <template #default="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #default>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
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
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark/'
// 当前页码
const currentPage = ref<number>(1)
// 每页显示几行
const limit = ref<number>(3)
//存储已有品牌数据总数
const total = ref<number>(0)
// data数据
const trademarkArr = ref<any>([])
const getHasTrademark = async () => {
  const result = await reqHasTrademark(currentPage.value, limit.value)
  if (result.code === 200) {
    // 存储已有品牌总个数
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
// 挂载完成先调用一次
onMounted(() => getHasTrademark())
</script>

<style scoped lang="scss"></style>
