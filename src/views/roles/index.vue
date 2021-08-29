<template>
  <div class="product">
    <PageContent ref="pageContentRef" :title="title" :url="url" :columns="columns" :form="form">
      <template #icon="scope">
        <i :class="scope.row.icon" /><span>{{ scope.row.icon }}</span>
      </template>

      <template #handle="scope">
        <el-button icon="el-icon-edit" type="text" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button icon="el-icon-delete" type="text" @click="handleDelete(scope.row)">删除</el-button>
      </template>

      <template v-slot:tools>
        <el-button type="primary" @click="handleCreate">新增{{ title }}</el-button>
      </template>
    </PageContent>

    <Dialog
      ref="pageDialogRef"
      :title="title"
      :defaultFormVal="defaultFormVal"
      v-bind="modeFormlConfig"
      @onCreate="handleDialogCreate"
      @onEdit="handleDialogEdit"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { PageContent, Dialog } from '@/components/context';
import { getPermissionListAPI, RoleApi } from '@/service';
import { usePageConent, checkStatusAction } from '@/hooks';
import { columns, form as defaultForm, model as defaultModel } from './config';

const form = ref(defaultForm()); // 搜索表单配置
const modeFormlConfig = ref(defaultModel({})); // 编辑弹框表单配置
const defaultFormVal = ref<any>({}); // 新增/编辑表单 默认值
const selectRows = ref<(number | string)[]>(); // 勾选中的行

const url = RoleApi.list;
const title = '角色';
const { pageContentRef, pageDialogRef, pageContentCreate, pageContentEdit, pageContentDelete } = usePageConent({ url });

onMounted(async () => {
  // 获取权限列表
  const { data } = await getPermissionListAPI({ page: 1, pageSize: 1000 });
  modeFormlConfig.value = defaultModel({
    permissionOptions: data.list.map((item: any) => ({ label: item.title, value: item.id })),
  });
});

// 新增按钮
const handleCreate = async () => {
  defaultFormVal.value = {};
  (pageDialogRef.value as any).dialogVisible = true;
};

// 新增 提交
const handleDialogCreate = async (values: any) => {
  await pageContentCreate(values);
};

// 编辑按钮
const handleEdit = (row: any) => {
  const permissionIds = row.permissions?.map((item: any) => item.id) || [];
  defaultFormVal.value = { ...row, permissionIds };
  (pageDialogRef.value as any).dialogVisible = true;
};

// 编辑 提交
const handleDialogEdit = async (values: any) => {
  await pageContentEdit(defaultFormVal.value.id, values);
};

// 删除 提交
const handleDelete = async (row: { id: number | string }) => {
  await pageContentDelete(row.id);
};
</script>
