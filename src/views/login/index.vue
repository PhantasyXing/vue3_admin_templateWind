<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'

// 获取路由器
const router = useRouter()
const userStore = useUserStore()
const loginForms = ref()
// 收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' })
let loading = ref(false)
// 登录按钮的回调
const login = async () => {
  // 保证全部表单相校验通过再发请求
  await loginForms.value.validate()
  // 加载效果：开始加载
  loading.value = true
  // 点击登录按钮
  // 通知仓库发请求
  try {
    // 请求成功 -> 跳转首页
    await userStore.userLogin(loginForm)
    router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `Hi, ${getTime()}好`,
    })
  } catch (error) {
    // 请求失败 -> 展示登录失败的信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  } finally {
    loading.value = false
  }
}
// 自定义校验规则函数
const validateUsername = (rule: any, value: any, callback: any) => {
  // rule：即为校验规则对象
  // value：即为表单元素文本内容
  // 函数：如果符合条件callBack放行通过即为
  // 如果不符合条件callBack方法，注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号至少5位'))
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码至少6位'))
  }
}
// 定义表单校验需要配置对象
const rules = {
  username: [
    // {required:true, min:6,max:16, message:'用户名最少6位数',trigger:'change'}
    { trigger: 'change', validator: validateUsername },
  ],
  password: [
    // {required:true, min:6,max:16, message:'密码最少6位数',trigger:'change'}
    { trigger: 'change', validator: validatePassword },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: #fff;
      font-size: 40px;
    }
    h2 {
      color: #fff;
      font-size: 20px;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
