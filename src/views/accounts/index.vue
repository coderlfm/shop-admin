<template>
  <div class="product">
    <PageContent ref="pageContentRef" :title="title" :url="url" :columns="columns" :form="form">
      <template #role="scope">
        <el-tag v-if="scope.row.role?.isAdmin === '1'" type="info">{{ scope.row.role?.title }}</el-tag>
        <el-tag v-else>{{ scope.row.role?.title }}</el-tag>
      </template>

      <template #handle="scope">
        <template v-if="scope.row.role?.isAdmin !== '1'">
          <el-button icon="el-icon-edit" type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
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
import { PageContent, Dialog } from '@/components/context';
import { getRoleListAPI, AccountApi } from '@/service';
import { usePageConent } from '@/hooks';
import { sha1 } from '@/utils';
import { SALT, ACCOUNT_DEFAULT_PASSWORD } from '@/constant';
import { columns, form as defaultForm, model as defaultModel } from './config';

const form = ref(defaultForm()); // 搜索表单配置
const modeFormlConfig = ref(defaultModel({})); // 编辑弹框表单配置
const defaultFormVal = ref<any>({}); // 新增/编辑表单 默认值
const selectRows = ref<(number | string)[]>(); // 勾选中的行

const url = AccountApi.list;
const title = '账号';
const { pageContentRef, pageDialogRef, pageContentCreate, pageContentEdit, pageContentDelete } = usePageConent({ url });

onMounted(async () => {
  // 获取权限列表
  const { data } = await getRoleListAPI({ page: 1, pageSize: 1000 });
  modeFormlConfig.value = defaultModel({
    roleOptions: data.list.map((item: any) => ({ label: item.title, value: item.id })),
  });
});

// 新增按钮
const handleCreate = async () => {
  defaultFormVal.value = {};
  (pageDialogRef.value as any).dialogVisible = true;
};

// 新增 提交
const handleDialogCreate = async (values: any) => {
  // 默认密码 123456
  values.password = sha1(SALT + ACCOUNT_DEFAULT_PASSWORD);
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
