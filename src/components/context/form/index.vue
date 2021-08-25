<template>
  <div>
    <el-form :model="formData">
      <el-row>
        <template v-for="item in formList" :key="item.prop">
          <el-col v-bind="colConfig">
            <el-form-item v-bind="item">
              <el-input v-model="formData[item.prop]"></el-input>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { withDefaults, defineProps, ref } from 'vue';
import type ElCol from 'element-plus/es/el-col/src/col';

const props = withDefaults(
  defineProps<{
    formList: any;
    colConfig?: any;
  }>(),
  {
    colConfig: {
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24,
    },
  },
);

let formValue: { [name: string]: string } = {};

props.formList.forEach((item: any) => {
  formValue[item.prop] = '';
});
const formData = ref(formValue);
</script>
<style lang=""></style>
