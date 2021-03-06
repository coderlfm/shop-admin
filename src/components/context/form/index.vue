<template>
  <div>
    <el-form ref="formRef" :model="formData" v-bind="formProps">
      <el-row :gutter="20">
        <template v-for="item in formList" :key="item.wrap.prop">
          <el-col v-if="!item.hidden" v-bind="colConfig">
            <el-form-item v-if="!item.slotName" v-bind="item.wrap">
              <el-select
                v-if="item.wrap.type === 'select'"
                v-model="formData[item.wrap.prop]"
                clearable
                v-bind="item.props"
                @change="item.props.change"
              >
                <el-option
                  v-for="option in item.props.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                >
                </el-option>
              </el-select>

              <el-cascader
                v-else-if="item.wrap.type === 'cascader'"
                v-model="formData[item.wrap.prop]"
                v-bind="item.props"
              ></el-cascader>

              <el-input v-else v-model="formData[item.wrap.prop]" v-bind="item.props"></el-input>
            </el-form-item>

            <el-form-item v-else v-bind="item.wrap">
              <template #default>
                <slot :name="item.slotName" :row="formData[item.wrap.prop]"></slot>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="flex flex-row-reverse">
      <el-space>
        <el-button @click="handleReset">{{ config.cancelText }}</el-button>
        <el-button type="primary" @click="handleSubmit">{{ config.okText }}</el-button>
      </el-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { withDefaults, watch, defineEmits, defineProps, defineExpose, ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';

const props = withDefaults(
  defineProps<{
    formList: any[];
    defaultFormVal?: any;
    colConfig?: {
      xl?: number;
      lg?: number;
      md?: number;
      sm?: number;
      xs?: number;
    };
    formProps?: any;
    config?: {
      okText?: string;
      cancelText?: string;
    };
  }>(),
  {
    colConfig: () => ({
      xl: 8, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24,
    }),
    config: () => ({
      okText: '搜索',
      cancelText: '重置',
    }),
    defaultFormVal: null,
    formProps: () => ({}),
  },
);

const emit = defineEmits(['onSubmit', 'onReset']);

const setDefault = (type: 'create' | 'update' = 'create', souce?: any) => {
  let formValue: { [name: string]: any } = {};
  props.formList.forEach((item: any) => {
    if (type === 'create') item.wrap.prop && (formValue[item.wrap.prop] = undefined);
    if (type === 'update') item.wrap.prop && (formValue[item.wrap.prop] = souce[item.wrap.prop]);
  });
  return formValue;
};
const formData = ref(setDefault('create')); // 表单内容
const formRef = ref<InstanceType<typeof ElForm>>(); // 表单 ref

watch(
  () => props.defaultFormVal,
  () => {
    if (props.defaultFormVal && Object.keys(props.defaultFormVal).length)
      formData.value = setDefault('update', props.defaultFormVal);
  },
  {
    immediate: true,
  },
);

// 搜索/提交按钮
const handleSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (valid) {
    emit('onSubmit', formData.value);
  } else {
    return ElMessage.warning('请正确输入后再进行提交');
  }
};

// 重置按钮
const handleReset = async () => {
  resetFormFidlds();
  emit('onReset', formData.value);
};

const resetFormFidlds = () => {
  formData.value = setDefault('create');
  formRef.value?.resetFields();
};

defineExpose({
  resetFormFidlds,
  formData,
});
</script>
<style lang="less" scoped>
.el-form-item /deep/ .el-form-item__content {
  > *:not(.el-form-item__error) {
    width: 100%;
  }
}
</style>
