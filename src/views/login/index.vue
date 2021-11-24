<template>
  <div class="login-wrap flex flex-col justify-center items-center">
    <h3 class="font-bold text-xl text-center mb-5 -mt-20">商城管理后台</h3>
    <section class="w-80 flex flex-col p-5 pt-10 border border-gray-200 rounded">
      <el-form ref="formRef" :model="formValues" :rules="rules">
        <el-form-item label="账号" prop="account">
          <el-input v-model="formValues.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formValues.password" :type="showPassword ? 'text' : 'password'">
            <template #suffix>
              <i
                :class="['cursor-pointer hover:text-blue-400', showPassword ? 'ri-eye-line' : 'ri-eye-off-line']"
                @click="showPassword = !showPassword"
              ></i>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </section>
    <section class="w-80 flex mt-5">
      <el-button class="w-full" type="primary" @click="handleLoign">立即登录</el-button>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import router from '@/router';
import { setupStore } from '@/store';
import { loginApi } from '@/service';
import { ILoginData } from '@/service/type';
import { cryptoPassword } from '@/utils';

const formRef = ref<InstanceType<typeof ElForm>>();
const formValues = ref<ILoginData>({
  account: 'superadmin',
  password: '123456',
});
const showPassword = ref(false); // 展示密码

const rules = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const handleLoign = async () => {
  // // console.log(formRef.value);

  const valid = await formRef.value?.validate();
  if (!valid) return ElMessage.warning('请输入完整后再进行提交');

  // 加密后再进行登录
  const password = cryptoPassword(formValues.value.password);

  const { code, data, msg } = await loginApi({ ...formValues.value, password });
  if (code) return ElMessage.warning(msg ?? '请求超时');

  localStorage.setItem('token', data.token);
  ElMessage.success('登录成功');
  await setupStore();

  router.push('/products');
};
</script>

<style lang="less" scoped>
.login-wrap {
  background: url(../../assets/images/login-bg.svg);
}
</style>
