<template>
  <div class="product">
    <PageContent
      title="商品"
      url="product"
      :columns="columns"
      :form="form"
      @on-edit="handleEdit"
      @on-delete="handleDelete"
    >
      <template #discountPrice="scope">
        <span class="text-red-500">￥{{ scope.row.discountPrice }} </span>
      </template>
      <template #marketPrice="scope"> ￥{{ scope.row.marketPrice }}</template>

      <template v-slot:tools>
        <el-button>上架</el-button>
        <el-button>下架</el-button>
        <el-button>新增商品</el-button>
      </template>
    </PageContent>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { PageContent } from '@/components/context';
import { getCateogriesListAPI, removeProductByIdAPI } from '@/service';
import { columns, form as defaultForm } from './config';

const form = ref(defaultForm({}));

onMounted(async () => {
  const { data } = await getCateogriesListAPI({ page: 1, pageSize: 1000 });
  form.value = defaultForm({ categoryOptions: data.list.map((item: any) => ({ label: item.title, value: item.id })) });
});

const handleEdit = (row: any) => {
  console.log(row);
};

const handleDelete = async (row: any) => {
  await ElMessageBox.confirm('此操作将永久删除商品, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });

  console.log(row);
  await removeProductByIdAPI(row.id);
  ElMessage.success('删除成功!');
};
</script>
