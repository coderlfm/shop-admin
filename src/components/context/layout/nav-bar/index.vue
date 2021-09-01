<template lang="">
  <div class="w-full flex justify-between">
    <slot></slot>

    <el-dropdown>
      <span class="el-dropdown-link">
        <i class="ri-user-3-line text-xl hover:text-blue-500"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <div class="flex items-center hover:text-blue-500" @click="resetPasswordVisibile = true">
              <i class="text-base ri-lock-unlock-line"></i> 修改密码
            </div>
            </el-dropdown-item>
          <el-dropdown-item >
            <div class="flex items-center hover:text-blue-500" @click="hadleLogout">
              <i class="text-base ri-logout-circle-r-line"></i> 退出登录
            </div>
            </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dialog
      title="修改密码"
      v-model="resetPasswordVisibile"
      width="550px"
    >

      <Form
        ref="formRef"
        :formList="formConfig.formList"
        :colConfig="{ lg: 24 }"
        :formProps="formConfig.formProps"
        @onSubmit="handleSubmit"
        :config="{ okText:'确认',cancelText:'取消' }"
      />
    </el-dialog>

  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { Form } from '@/components/context';
import { resetAccountPasswordApi } from '@/service'
import { cryptoPassword } from '@/utils';
import { formDefaultConfig } from './config'

const formConfig = formDefaultConfig({validatePass2})

const resetPasswordVisibile = ref(false)  // 弹出框
const formRef = ref<InstanceType<typeof Form>>(); // 表单 ref

const handleSubmit = async (values: any) => {
  console.log('value:', values);
   await resetAccountPasswordApi({oldPassword: cryptoPassword(values.oldPassword), newPassword:cryptoPassword(values.newPassword) })
   ElMessage.success('修改成功');
   hadleLogout();
}


const hadleLogout = ( )=> {
  localStorage.clear();
  router.removeRoute('main')
  router.push('/login')
}

// 校验密码
function validatePass2 ( rule: any, value: string, callback: (val?: any) => void) {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== (formRef.value as any).formData.newPassword) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
}


</script>
<style lang=""></style>
