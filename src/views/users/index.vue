<template>
  <div class="users">
    <PageContent
      ref="pageContentRef"
      :title="title"
      :url="url"
      :columns="columns"
      :form="form"
      @onSelect="handleSelect"
    >
      <template #expand="scope">
        <div class="expand-user flex mb-7 items-center" v-for="item in scope.row.addresss" :key="item.id">
          <div>收件人姓名: {{ item.name }}</div>
          <div>收件人手机号: {{ item.mobile }}</div>
          <div>收件人地址: {{ item.address }}</div>
          <div>
            <el-tag v-if="item.isDefault === '1'" size="small">默认地址</el-tag>
          </div>
        </div>
      </template>
      <template #avatar="scope">
        <img :src="scope.row.avatar" />
      </template>

      <template #status="scope">
        <el-tag v-if="scope.row.status === '1'" size="small" effect="dark"> 正常 </el-tag>
        <el-tag v-else type="warning" size="small" effect="dark"> 冻结 </el-tag>
      </template>

      <template #handle="scope">
        <template v-if="scope.row.role?.isAdmin !== '1'">
          <el-button icon="el-icon-edit" type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </template>

      <template v-slot:tools>
        <el-button type="primary" @click="handleFreeze">冻结</el-button>
        <el-button type="primary" @click="handleUnFreeze">解冻</el-button>
      </template>
    </PageContent>

    <Dialog
      ref="pageDialogRef"
      :title="title"
      :defaultFormVal="defaultFormVal"
      v-bind="modeFormlConfig"
      @onEdit="handleDialogEdit"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { PageContent, Dialog } from '@/components/context';
import { UserApi } from '@/service';
import { checkStatusAction, usePageConent } from '@/hooks';
import { sha1 } from '@/utils';
import { SALT, ACCOUNT_DEFAULT_PASSWORD } from '@/constant';
import { columns, form as defaultForm, model as defaultModel } from './config';

const form = ref(defaultForm()); // 搜索表单配置
const modeFormlConfig = ref(defaultModel()); // 编辑弹框表单配置
const defaultFormVal = ref<any>({}); // 新增/编辑表单 默认值
const selectRows = ref<(number | string)[]>(); // 勾选中的行

const url = UserApi.list;
const title = '用户';
const { pageContentRef, pageDialogRef, pageContentCreate, pageContentEdit, pageContentDelete } = usePageConent({ url });

// 编辑按钮
const handleEdit = (row: any) => {
  defaultFormVal.value = row;
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
    userIds: selectRows.value?.map((item: any) => item.id),
    status,
  };
  await checkStatusAction({ url: UserApi.handle, title, data });
  (pageContentRef.value as any).getList();
};
</script>

<style lang="less" scoped>
.users {
  img {
    width: 50px;
  }
  .expand-user {
    > * {
      margin-right: 100px;
    }
  }
}
</style>
