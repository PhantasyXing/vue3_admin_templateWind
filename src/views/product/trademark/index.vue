<template>
  <el-card>
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" size="default" icon="plus" @click="addTrademark">
      添加品牌
    </el-button>
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
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTrademark(row)"
          ></el-button>
          <el-popconfirm
            :title="`您确定要删除${row.tmName}吗？`"
            icon="Delete"
            width="200px"
            @confirm="deleteTrademark(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件
        pagination
          @current-change：分页器当前页码发生变化的时候会触发对于，当前页码发生变化自定义事件，组件pagination父组件回传了数据（当前的页码）
          v-model:current-page：当前页数
          v-model:page-size：每页显示条目个数
          background：是否为分页按钮添加背景色
          total：总条目数
          layout：组件布局，子组件名用逗号分隔
          page-sizes：每页显示个数选择器的选项设置
      -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="getHasTrademark"
      v-model:current-page="currentPage"
      v-model:page-size="limit"
      :page-sizes="[3, 6, 9, 12]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total,"
      :total="total"
    />
  </el-card>
  <!-- 对话框组件：在添加品牌与修改已有品牌的业务时候使用结构 -->
  <!-- v-model：属性用户的显示与隐藏的true、title：设置对话框左上角标题 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
  >
    <el-form
      style="width: 80%"
      :model="trademarkParams"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input
          placeholder="请您输入品牌名称"
          v-model="trademarkParams.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :headers="uploadHeaders"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 插槽 -->
    <template #footer>
      <el-button type="primary" @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark/'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
// 导入仓库
import useUserStore from '@/store/modules/user'
// 拿到用户仓库对象
const userStore = useUserStore()
// 定义请求头
const uploadHeaders = computed(() => {
  return {
    token: userStore.token,
  }
})
// 当前页码
const currentPage = ref<number>(1)
// 每页显示几行
const limit = ref<number>(3)
//存储已有品牌数据总数
const total = ref<number>(0)
// data数据
const trademarkArr = ref<Records>([])
// 控制对话框显示和隐藏
const dialogFormVisible = ref<boolean>(false)
// 定义收集新增品牌数据
const trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 获取 el-form 组件实例
const formRef = ref()
// 获取已有品牌的接口封装为一个函数：在任何情况下向获取数据，调用次函数即可
const getHasTrademark = async (pager = 1) => {
  currentPage.value = pager
  const result: TradeMarkResponseData = await reqHasTrademark(
    currentPage.value,
    limit.value,
  )
  if (result.code === 200) {
    // 存储已有品牌总个数
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
// 挂载完成先调用一次
onMounted(() => getHasTrademark())
// 当下拉菜单发生变化的时候触发此方法  ————  这个自定义事件，分页器组件会将下拉菜单选中数据返回
const sizeChange = () => getHasTrademark() // 当前每一页的数据量发生变化的时候，当前页码归1
// 添加品牌的回调
const addTrademark = () => {
  dialogFormVisible.value = true
  // 添加前先清空一次数据
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // 清空表单验证的错误提示信息
  // 第一种写法
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
}
// 编辑品牌的回调
const updateTrademark = (row: any) => {
  // 清空表单验证的错误提示信息
  // 第二种写法
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  dialogFormVisible.value = true
  // 使用Object.assign()方法合并两个数组
  Object.assign(trademarkParams, row)
}
// 取消按钮的回调
const cancel = () => (dialogFormVisible.value = false)
// 确定按钮的回调
const confirm = async () => {
  // 在发请求之前，要对整个表单进行校验
  // 调用这个方法进行全部表单的校验，如果校验成功则往下执行代码
  await formRef.value.validate()
  // 使用添加品牌的接口,传入参数
  const result: any = await reqAddOrUpdateTrademark(trademarkParams)
  // 判断是否成功
  if (result.code) {
    // 关闭对话框
    dialogFormVisible.value = false
    // 提示成功信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    // 重新获取数据，保证数据是最新的
    getHasTrademark(trademarkParams.id ? currentPage.value : 1)
    // 添加品牌成功回到第一页，修改品牌则是当前页
  } else {
    // 提示失败信息
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
    // 关闭对话框
    dialogFormVisible.value = false
  }
}
// 上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 钩子是在图片上传成功之前触发，上传文件之前可以约束文件类型与大小
  // 要求：上传文件格式png、jpg、gif，4M
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '文件大小需要小于4m',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '可以上传文件的格式为: png、jpg、gif',
    })
    return false
  }
}
// 图片上传成功的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  //uploadFile
  // response：为当前上传图片post请求服务器返回的数据
  // 收集上传图片的地址，添加一个新的品牌的时候带给服务器
  trademarkParams.logoUrl = response.data
  // 图片上传成功，清除掉对应图片校验结果
  formRef.value.clearValidate('logoUrl')
}
// 品牌名称的校验规则
const validatorTmName = (rule: any, value: any, callback: any) => {
  // 是当表单元素触候，会触发此方法
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callback()
  } else {
    // 校验未通过返回的错误的提示信息
    callback(new Error('品牌名称的长度要大于等于2'))
  }
}
//
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('没有上传LOGO图片'))
  }
}
// 定义自定义校验规则
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}
// 气泡确认框确定的按钮
const deleteTrademark = async (id: number) => {
  const result = await reqDeleteTrademark(id)
  if (result.code === 200) {
    // 成功删除
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    // 获取最新数据、并进行页数判定
    getHasTrademark(
      trademarkArr.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: `删除品牌失败—${result.message}`,
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
