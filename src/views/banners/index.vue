<template>
  <div class="banners">
    <PageContent
      ref="pageContentRef"
      :title="title"
      :url="url"
      :columns="columns"
      :form="form"
      @onSelect="handleSelect"
    >
      <template #url="scope">
        <el-image style="width: 100%; height: auto" :src="scope.row.url" :preview-src-list="[scope.row.url]">
        </el-image>
        <!-- <img :src="scope.row.url" /> -->
      </template>

      <template #role="scope">
        <el-tag v-if="scope.row.role?.isAdmin === '1'" type="info" size="small">{{ scope.row.role?.title }}</el-tag>
        <el-tag v-else size="small">{{ scope.row.role?.title }}</el-tag>
      </template>

      <template #bannerStatus="scope">
        <el-tag v-if="scope.row.bannerStatus === '1'" size="small" effect="dark"> 启用 </el-tag>
        <el-tag v-else type="warning" size="small" effect="dark"> 停用 </el-tag>
      </template>

      <template #handle="scope">
        <template v-if="scope.row.role?.isAdmin !== '1'">
          <el-button icon="el-icon-edit" type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </template>

      <template v-slot:tools>
        <el-button type="primary" @click="handleFreeze">停用</el-button>
        <el-button type="primary" @click="handleUnFreeze">启用</el-button>
        <el-button type="primary" @click="handleCreate">新增{{ title }}</el-button>
      </template>
    </PageContent>

    <Dialog
      ref="pageDialogRef"
      :title="title"
      v-model:defaultFormVal="defaultFormVal"
      v-bind="modeFormlConfig"
      @onCreate="handleDialogCreate"
      @onEdit="handleDialogEdit"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { PageContent, Dialog } from '@/components/context';
import { BannerApi } from '@/service';
import { checkStatusAction, usePageConent } from '@/hooks';
import { sha1 } from '@/utils';
import { SALT, ACCOUNT_DEFAULT_PASSWORD } from '@/constant';
import { columns, form as defaultForm, model as defaultModel } from './config';

const form = ref(defaultForm()); // 搜索表单配置
const modeFormlConfig = ref(defaultModel()); // 编辑弹框表单配置
const defaultFormVal = ref<any>({}); // 新增/编辑表单 默认值
const selectRows = ref<(number | string)[]>(); // 勾选中的行

const url = BannerApi.list;
const title = 'Banner ';
const { pageContentRef, pageDialogRef, pageContentCreate, pageContentEdit, pageContentDelete } = usePageConent({ url });

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

// 停用
const handleFreeze = async () => checkStatus('停用所选banner', '0');

// 启用
const handleUnFreeze = () => checkStatus('启用所选banner', '1');

const checkStatus = async (title: string, status: '0' | '1') => {
  if (!selectRows.value?.length) return ElMessage.warning('请先勾选需要操作的数据');
  const data = {
    bannerIds: selectRows.value?.map((item: any) => item.id),
    status,
  };
  await checkStatusAction({ url: BannerApi.handle, title, data });
  (pageContentRef.value as any).getList();
};
</script>
<style lang="less" scoped>
.banners {
  img {
    // width: 300px;
  }
}
</style>
