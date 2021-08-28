<template>
  <div class="orders">
    <PageContent ref="pageContentRef" :title="title" :url="url" :columns="columns" :form="form">
      <template #snapshoot="scope">
        <p v-for="item in scope.row.snapshoot.products" :key="item.productId">商品名称：{{ item.title }}</p>
      </template>

      <template #discountPrice="scope">
        <span class="text-red-500">￥{{ scope.row.discountPrice }} </span>
      </template>
      <template #marketPrice="scope">￥{{ scope.row.marketPrice }}</template>

      <template #status="scope">
        <el-tag v-if="scope.row.status === '1'" type="info" size="small" effect="dark"> 待付款 </el-tag>
        <el-tag v-else-if="scope.row.status === '2'" type="warning" size="small" effect="dark"> 待发货 </el-tag>
        <el-tag v-else-if="scope.row.status === '3'" size="small" effect="dark"> 已发货 </el-tag>
        <el-tag v-else-if="scope.row.status === '4'" type="danger" size="small" effect="dark"> 已取消 </el-tag>
        <el-tag v-else-if="scope.row.status === '5'" size="small" effect="dark"> 已完成 </el-tag>
      </template>

      <template #handle="scope">
        <el-button icon="el-icon-edit" type="text" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button icon="el-icon-delete" type="text" @click="handleDelete(scope.row)">删除</el-button>
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
import { ref } from 'vue';
// import { ElMessage } from 'element-plus';
import { PageContent, Dialog } from '@/components/context';
import { OrderApi } from '@/service';
import { usePageConent } from '@/hooks';
import { columns, form as defaultForm, model as defaultModel } from './config';

const form = ref(defaultForm()); // 搜索表单配置
const modeFormlConfig = ref(defaultModel()); // 编辑弹框表单配置
const defaultFormVal = ref<any>({}); // 新增/编辑表单 默认值

const url = OrderApi.list;
const title = '订单';
const { pageContentRef, pageDialogRef, pageContentCreate, pageContentEdit, pageContentDelete } = usePageConent({ url });

// 新增 提交
const handleDialogCreate = async (values: any) => {
  await pageContentCreate(values);
};

// 编辑按钮
const handleEdit = (row: any) => {
  const categoryIds = row.categories?.map((item: any) => item.id) ?? [];
  defaultFormVal.value = { ...row, categoryIds };
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
