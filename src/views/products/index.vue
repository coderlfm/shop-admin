<template>
  <div class="product">
    <PageContent
      ref="pageContentRef"
      :title="title"
      :url="url"
      :columns="columns"
      :form="form"
      showSelection
      @onSelect="handleSelect"
    >
      <template #categories="scope">
        <el-space>
          <el-tag v-for="item in scope.row.categories" :key="item.id" size="small"> {{ item.title }}</el-tag>
        </el-space>
      </template>

      <template #discountPrice="scope">
        <span class="text-red-500">￥{{ scope.row.discountPrice }} </span>
      </template>
      <template #marketPrice="scope">￥{{ scope.row.marketPrice }}</template>

      <template #status="scope">
        <el-tag v-if="scope.row.status === '1'" type="success" size="small" effect="dark"> 上架 </el-tag>
        <el-tag v-else type="warning" size="small" effect="dark"> 下架 </el-tag>
      </template>

      <template #handle="scope">
        <el-button icon="el-icon-edit" type="text" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button icon="el-icon-delete" type="text" @click="handleDelete(scope.row)">删除</el-button>
      </template>

      <template v-slot:tools>
        <el-button type="primary" @click="handleUnFreeze">上架</el-button>
        <el-button type="primary" @click="handleFreeze">下架</el-button>
        <el-button type="primary" @click="handleCreate">新增商品</el-button>
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
import { getCateogriesListAPI, ProductsApi } from '@/service';
import { usePageConent, checkStatusAction } from '@/hooks';
import { columns, form as defaultForm, model as defaultModel } from './config';

const form = ref(defaultForm({})); // 搜索表单配置
const modeFormlConfig = ref(defaultModel({})); // 编辑弹框表单配置
const defaultFormVal = ref<any>({}); // 新增/编辑表单 默认值
const selectRows = ref<(number | string)[]>(); // 勾选中的行

const url = ProductsApi.product;
const title = '商品';
const { pageContentRef, pageDialogRef, pageContentCreate, pageContentEdit, pageContentDelete } = usePageConent({ url });

onMounted(async () => {
  const { data } = await getCateogriesListAPI({ page: 1, pageSize: 1000 });
  const categoryOptions = formatCategory(data.list);

  form.value = defaultForm({ categoryOptions });
  modeFormlConfig.value = defaultModel({ categoryOptions });
});

// 格式化分类数组
const formatCategory = (data: any[]) => data.map((item: any) => ({ label: item.title, value: item.id }));

// 新增按钮
const handleCreate = async () => {
  (pageDialogRef.value as any).dialogVisible = true;
};

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

const handleSelect = (select: any, row: any) => {
  console.log('select', select, row);
  selectRows.value = select;
};

// 下架
const handleFreeze = async () => checkStatus('下架所选商品', '0');

// 上架
const handleUnFreeze = () => checkStatus('上架所选商品', '1');

const checkStatus = async (title: string, status: '0' | '1') => {
  if (!selectRows.value?.length) return ElMessage.warning('请先勾选需要操作的数据');
  const data = {
    productIds: selectRows.value?.map((item: any) => item.id),
    status,
  };
  await checkStatusAction({ url: 'product/handle', title, data });
  (pageContentRef.value as any).getList();
};
</script>
