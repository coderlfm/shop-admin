<template>
  <div class="login-wrap flex flex-col justify-center items-center">
    <h3 class="font-bold text-xl text-center mb-5 -mt-20">商城管理后台</h3>
    <section class="w-80 flex flex-col p-5 pt-10 border border-gray-300 rounded">
      <el-form ref="form" :model="formValues" :rules="rules">
        <el-form-item label="账号" prop="account">
          <el-input v-model="formValues.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passowrd">
          <el-input v-model="formValues.passowrd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="primary">立即登录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
// const formRef = ref(null);
const formValues = ref({
  account: '',
  passowrd: '',
});

const rules = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  passowrd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};
</script>

<style lang="less" scoped>
.login-wrap {
  background: url(../../assets/images/login-bg.svg);
}
</style>
