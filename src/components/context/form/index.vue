<template>
  <div>
    <el-form :model="formData" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in formList" :key="item.wrap.prop">
          <el-col v-bind="colConfig">
            <el-form-item v-bind="item.wrap">
              <el-select
                v-if="item.wrap.type === 'select'"
                v-model="formData[item.wrap.prop]"
                clearable
                v-bind="item.props"
              >
                <el-option
                  v-for="option in item.props.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                >
                </el-option>
              </el-select>

              <el-input v-else v-model="formData[item.wrap.prop]" v-bind="item.props"></el-input>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="flex flex-row-reverse">
      <el-space>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { withDefaults, defineEmits, defineProps, ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';

const props = withDefaults(
  defineProps<{
    formList: any[];
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

const emit = defineEmits(['onSearch', 'onReset']);

let formValue: { [name: string]: string } = {};

props.formList.forEach((item: any) => {
  formValue[item.prop] = '';
});
const formData = ref(formValue);
const formRef = ref<InstanceType<typeof ElForm>>();

// 搜索
const handleSearch = async () => {
  const valid = await formRef.value?.validate();
  if (valid) {
    emit('onSearch', formData.value);
  } else {
    return ElMessage.warning('请正确输入后再进行提交');
  }
};

// 重置
const handleReset = async () => {
  formRef.value?.resetFields();
  emit('onReset', formData.value);
};
</script>
<style lang="less" scoped>
.el-form-item__content {
  > * {
    width: 100%;
  }
}
</style>
