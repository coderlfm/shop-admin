<template lang="">
  <el-dialog :title="(config.okText === '保存' ? '编辑' : '新增') + title" v-model="dialogVisible">
    <Form
      :formList="formList"
      :colConfig="{ lg: 24 }"
      :formProps="formProps"
      :defaultFormVal="defaultFormVal"
      @onSubmit="handleSubmit"
      :config="config"
    />
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, withDefaults, watch, defineProps, defineExpose, defineEmits, toRef } from 'vue';
import { Form } from '@/components/context';

const props = withDefaults(
  defineProps<{
    url: string;
    formProps: any;
    formList: any[];
    title?: string;
    config?: {
      okText?: '新增' | '保存';
      cancelText?: string;
    };
    defaultFormVal: any;
  }>(),
  {
    title: '提示',
    config: () => ({
      okText: '新增',
      cancelText: '重置',
    }),
  },
);

const emit = defineEmits(['onSubmit']);

const dialogVisible = ref(false); // 弹出框
const config = ref(props.config); // 底部配置

// 默认值发生变化，点击编辑按钮时触发

watch(
  () => props.defaultFormVal,
  () => {
    console.log('dialog编辑');
    if (props.defaultFormVal && Object.keys(props.defaultFormVal).length) {
      config.value.okText = '保存';
    }
  },
  { immediate: true },
);

const handleSubmit = async (values: any, cb: () => void) =>
  emit('onSubmit', values, () => {
    dialogVisible.value = false;
    cb();
  });

defineExpose({
  dialogVisible,
});
</script>
<style lang=""></style>
