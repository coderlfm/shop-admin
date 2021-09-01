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
      <template #expand="scope">
        <div class="w-full flex justify-end">
          <Upload
            name="product"
            :action="BASE_URL + UploadApi.product"
            :onSuccess="(res) => handleUploadProductImgSuccess(res, scope.row)"
          >
            <el-button type="primary">添加详情图</el-button>
          </Upload>
        </div>
        <div v-for="item in scope.row.images" :key="item.id" class="flex flex-col">
          <div class="flex items-start">
            <el-image :src="item.url" style="width: 400px" :preview-src-list="scope.row.images.map((item) => item.url)">
            </el-image>
            <div class="ml-2 mt-2" @click="handleProductImgRemove(item.id)">
              <el-button type="danger" icon="ri-delete-bin-6-line " circle></el-button>
            </div>
          </div>
        </div>
      </template>

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
        <el-button icon="ri-edit-2-line" type="text" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button icon="ri-delete-bin-6-line" type="text" @click="handleDelete(scope.row)">删除</el-button>
      </template>

      <template #tools>
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
    >
      <template #coverUrl>
        <Upload name="product" :action="BASE_URL + UploadApi.product" :onSuccess="handleUploadProductSuccess">
          <img v-if="uploadProduct" :src="uploadProduct" class="banner" />
          <div v-else class="py-24 w-full">
            <i class="ri-image-add-fill text-2xl"></i>
          </div>
        </Upload>
      </template>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { PageContent, Dialog, Upload } from '@/components/context';
import {
  BASE_URL,
  getCateogriesListAPI,
  ProductsApi,
  UploadApi,
  addProductImgByIdAPI,
  removeProductImgByIdAPI,
} from '@/service';
import { usePageConent, checkStatusAction } from '@/hooks';
import { columns, form as defaultForm, model as defaultModel } from './config';

const form = ref(defaultForm({})); // 搜索表单配置
const modeFormlConfig = ref(defaultModel({})); // 编辑弹框表单配置
const defaultFormVal = ref<any>({}); // 新增/编辑表单 默认值
const selectRows = ref<(number | string)[]>(); // 勾选中的行
const uploadProduct = ref(''); // 上传的图片

const url = ProductsApi.product;
const title = '商品';
const { pageContentRef, pageDialogRef, pageContentCreate, pageContentEdit, pageContentDelete } = usePageConent({
  url,
  perSubmit,
});

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
  defaultFormVal.value = {};
  (pageDialogRef.value as any).dialogVisible = true;
};

// 新增 提交
const handleDialogCreate = async (values: any) => {
  await pageContentCreate(values);
};

// 编辑按钮
const handleEdit = (row: any) => {
  uploadProduct.value = row.coverUrl;

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
  await checkStatusAction({ url: ProductsApi.handle, title, data });
  (pageContentRef.value as any).getList();
};

// 详情图添加
const handleUploadProductImgSuccess = async (res: any, row: any): Promise<void> => {
  const {
    data: { url },
  } = res;
  uploadProduct.value = url;
  await addProductImgByIdAPI(row.id, { url });
  ElMessage.success('添加成功');
  (pageContentRef.value as any).getList();
};

// 详情图删除
const handleProductImgRemove = async (imgId: number) => {
  await ElMessageBox.confirm('此操作将永久删除该详情图, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });

  await removeProductImgByIdAPI(imgId);
  ElMessage.success('删除成功');
  (pageContentRef.value as any).getList();
};

// 图片上传
const handleUploadProductSuccess = (res: any): void => {
  const { data } = res;
  uploadProduct.value = data.url;
};

// 请求前的回调
function perSubmit(type: 'create' | 'update', data: any) {
  if (!uploadProduct.value) {
    ElMessage.warning('请先上传图片后再进行提交');
    return;
  }

  data.coverUrl = uploadProduct.value;
  return data;
}
</script>
<style lang="less" scoped>
.product {
  .product-uploader {
    /deep/ .el-upload--text {
      width: 100%;
    }
  }

  .ri-delete-bin-6-line {
    margin-right: 0;
  }
}
</style>
