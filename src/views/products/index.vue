<template>
  <div class="product">
    <PageContent ref="pageContentRef" :title="title" :url="url" :columns="columns" :form="form">
      <template #categories="scope">
        <el-tag v-for="item in scope.row.categories" :key="item.id" size="small"> {{ item.title }}</el-tag>
      </template>

      <template #discountPrice="scope">
        <span class="text-red-500">￥{{ scope.row.discountPrice }} </span>
      </template>
      <template #marketPrice="scope"> ￥{{ scope.row.marketPrice }}</template>

      <template #handle="scope">
        <el-button icon="el-icon-edit" type="text" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button icon="el-icon-delete" type="text" @click="handleDelete(scope.row)">删除</el-button>
      </template>

      <template v-slot:tools>
        <el-button>上架</el-button>
        <el-button>下架</el-button>
        <el-button @click="handleCreate">新增商品</el-button>
      </template>
    </PageContent>

    <Dialog
      ref="pageDialogRef"
      :url="url"
      :title="title"
      :defaultFormVal="defaultFormVal"
      v-bind="modeFormlConfig"
      @onSubmit="handleSubmit"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, provide } from 'vue';
import { PageContent, Dialog } from '@/components/context';
import { getCateogriesListAPI, ProductsApi } from '@/service';
import { useDelete, usePageConent, useCreate } from '@/hooks';
import { columns, form as defaultForm, model as defaultModel } from './config';

import Test from './test.vue';

const form = ref(defaultForm({})); // 搜索表单配置
const modeFormlConfig = ref(defaultModel({})); // 编辑弹框表单配置
const defaultFormVal = ref({}); // 新增/编辑 默认值

const [pageContentRef, pageDialogRef] = usePageConent();

const url = ProductsApi.product;
const title = '商品';

onMounted(async () => {
  const { data } = await getCateogriesListAPI({ page: 1, pageSize: 1000 });
  const categoryOptions = formatCategory(data.list);

  form.value = defaultForm({ categoryOptions });
  modeFormlConfig.value = defaultModel({ categoryOptions });
});

// 格式化分类数组
const formatCategory = (data: any[]) => data.map((item: any) => ({ label: item.title, value: item.id }));

// 编辑按钮
const handleEdit = (row: any) => {
  const categoryIds = row.categories?.map((item: any) => item.id) ?? [];
  defaultFormVal.value = { ...row, categoryIds };
  (pageDialogRef.value as any).dialogVisible = true;
};

// 删除
const handleDelete = async (row: { id: number | string }) => {
  await useDelete(url, row.id, '商品');
  (pageContentRef.value as any).getList();
};

// 新增按钮
const handleCreate = async () => {
  (pageDialogRef.value as any).dialogVisible = true;
};

// 新增/编辑 提交
const handleSubmit = async (values: any, cb: () => void) => {
  await useCreate({ url, data: values });
  cb();
  (pageContentRef.value as any).getList();
};
</script>
