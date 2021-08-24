<template>
  <div class="login-wrap flex flex-col justify-center items-center">
    <h3 class="font-bold text-xl text-center mb-5 -mt-20">商城管理后台</h3>
    <section class="w-80 flex flex-col p-5 pt-10 border border-gray-300 rounded">
      <el-form ref="formRef" :model="formValues" :rules="rules">
        <el-form-item label="账号" prop="account">
          <el-input v-model="formValues.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formValues.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="primary" @click="handleLoign">立即登录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import router from '@/router';
import { loginApi } from '@/service';
import { ILoginData } from '@/service/type';
const formRef = ref<InstanceType<typeof ElForm>>();
const formValues = ref<ILoginData>({
  account: '',
  password: '',
});

const rules = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const handleLoign = () => {
  console.log(formRef.value);
  formRef.value?.validate(async (valid) => {
    if (valid) {
      const { code, data, msg } = await loginApi(formValues.value);
      if (code) return ElMessage.warning(msg ?? '请求超时');
      ElMessage.success('登录成功');
      localStorage.setItem('token', data.toekn);
      router.push('/');
    } else {
      return false;
    }
  });
};
</script>

<style lang="less" scoped>
.login-wrap {
  background: url(../../assets/images/login-bg.svg);
}
</style>
