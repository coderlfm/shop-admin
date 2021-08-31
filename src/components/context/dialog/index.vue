<template lang="">
  <el-dialog
    custom-class="dialog-wrap"
    :title="(config.okText === '保存' ? '编辑' : '新增') + title"
    v-model="dialogVisible"
  >
    <Form
      ref="formRef"
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
import { ref, withDefaults, watch, defineProps, defineExpose, defineEmits } from 'vue';
import { Form } from '@/components/context';

const props = withDefaults(
  defineProps<{
    formProps: any;
    formList: any[];
    title?: string;
    config?: {
      okText?: '新增' | '保存';
      cancelText?: string;
    };
    defaultFormVal?: any;
  }>(),
  {
    title: '提示',
    config: () => ({
      okText: '新增',
      cancelText: '重置',
    }),
  },
);

const emit = defineEmits(['onCreate', 'onEdit', 'update:defaultFormVal']);

const dialogVisible = ref(false); // 弹出框
const formRef = ref<InstanceType<typeof Form>>(); // 弹出框
const config = ref(props.config); // 底部配置

// 默认值发生变化，点击编辑按钮时触发
watch(
  () => props.defaultFormVal,
  () => {
    if (Object.keys(props.defaultFormVal).length) {
      config.value.okText = '保存';
    } else {
      config.value.okText = '新增';
    }
  },
  { immediate: true },
);

// 关闭 dialog 时清空表单
watch(dialogVisible, (newVal) => {
  if (newVal === false) {
    (formRef.value as any).resetFormFidlds();
    emit('update:defaultFormVal', {});
  }
});

// 新增/编辑
const handleSubmit = async (values: any) => {
  let emitType: 'onCreate' | 'onEdit' = Object.keys(props.defaultFormVal).length ? 'onEdit' : 'onCreate';
  emit(emitType, values);
};

defineExpose({
  dialogVisible,
  formRef,
});
</script>
<style lang="less">
.dialog-wrap {
  padding: 0 20px;
  width: 600px !important;
}
</style>
