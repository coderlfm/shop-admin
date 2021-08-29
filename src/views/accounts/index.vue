<template>
  <div class="product">
    <PageContent
      ref="pageContentRef"
      :title="title"
      :url="url"
      :columns="columns"
      :form="form"
      @onSelect="handleSelect"
    >
      <template #role="scope">
        <el-tag v-if="scope.row.role?.isAdmin === '1'" type="info" size="small">{{ scope.row.role?.title }}</el-tag>
        <el-tag v-else size="small">{{ scope.row.role?.title }}</el-tag>
      </template>

      <template #status="scope">
        <el-tag v-if="scope.row.status === '1'" size="small" effect="dark"> 正常 </el-tag>
        <el-tag v-else type="warning" size="small" effect="dark"> 冻结 </el-tag>
      </template>

      <template #handle="scope">
        <template v-if="scope.row.role?.isAdmin !== '1'">
          <el-button icon="el-icon-refresh-left" type="text" @click="hadleResetPassword(scope.row)">重置密码</el-button>
          <el-button icon="el-icon-edit" type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </template>

      <template v-slot:tools>
        <el-button type="primary" @click="handleFreeze">冻结</el-button>
        <el-button type="primary" @click="handleUnFreeze">解冻</el-button>
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
import { ElMessage, ElMessageBox } from 'element-plus';
import { PageContent, Dialog } from '@/components/context';
import { getRoleListAPI, AccountApi, resetPasswordApi } from '@/service';
import { checkStatusAction, usePageConent } from '@/hooks';
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
  const roleId = row.role.id;
  defaultFormVal.value = { ...row, roleId };
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

const handleSelect = (select: any, row: any) => {
  selectRows.value = select;
};

// 冻结
const handleFreeze = async () => checkStatus('冻结所选账号', '0');

// 解冻
const handleUnFreeze = () => checkStatus('解冻所选账号', '1');

const checkStatus = async (title: string, status: '0' | '1') => {
  if (!selectRows.value?.length) return ElMessage.warning('请先勾选需要操作的数据');
  const data = {
    accountIds: selectRows.value?.map((item: any) => item.id),
    status,
  };
  await checkStatusAction({ url: 'account/handle', title, data });
  (pageContentRef.value as any).getList();
};

// 重置密码
const hadleResetPassword = async ({ account, id }: { account: string; id: number }) => {
  await ElMessageBox.confirm(`是否将账号 "${account}" 的登录密码重置为 "${ACCOUNT_DEFAULT_PASSWORD}" ?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  await resetPasswordApi(id, { password: sha1(SALT + ACCOUNT_DEFAULT_PASSWORD) });
  ElMessage.success('重置成功');
  (pageContentRef.value as any).getList();
};
</script>
