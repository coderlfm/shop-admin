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
          <el-button icon="ri-edit-2-line" type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button icon="ri-delete-bin-6-line" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </template>

      <template #tools>
        <el-button type="primary" @click="handleFreeze">停用</el-button>
        <el-button type="primary" @click="handleUnFreeze">启用</el-button>
        <el-button type="primary" @click="handleCreate">新增{{ title }}</el-button>
      </template>
    </PageContent>

    <Dialog
      ref="pageDialogRef"
      v-model:defaultFormVal="defaultFormVal"
      :title="title"
      v-bind="modeFormlConfig"
      @onCreate="handleDialogCreate"
      @onEdit="handleDialogEdit"
    >
      <template #bannerUrl>
        <el-upload
          class="banner-uploader"
          name="banner"
          :headers="uploadHeader"
          :action="BASE_URL + UploadApi.banner"
          :show-file-list="false"
          :on-success="handleUploadBannerSuccess"
        >
          <img v-if="uploadBanner" :src="uploadBanner" class="banner" />
          <div v-else class="py-24 w-full">
            <i class="ri-image-add-fill text-2xl"></i>
          </div>
        </el-upload>
      </template>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { PageContent, Dialog } from '@/components/context';
import { BannerApi, BASE_URL, UploadApi, uploadHeader } from '@/service';
import { checkStatusAction, usePageConent } from '@/hooks';
import { columns, form as defaultForm, model as defaultModel } from './config';

const form = ref(defaultForm()); // 搜索表单配置
const modeFormlConfig = ref(defaultModel()); // 编辑弹框表单配置
const defaultFormVal = ref<any>({}); // 新增/编辑表单 默认值
const selectRows = ref<(number | string)[]>(); // 勾选中的行

const uploadBanner = ref(''); // 上传的图片

const url = BannerApi.list;
const title = 'Banner ';
const { pageContentRef, pageDialogRef, pageContentCreate, pageContentEdit, pageContentDelete } = usePageConent({
  url,
  perSubmit,
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
  uploadBanner.value = row.url;
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

// 多选
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

// 图片上传
const handleUploadBannerSuccess = (res: any, file: any) => {
  const { data } = res;
  uploadBanner.value = data.url;
};

// 请求前的回调
function perSubmit(type: 'create' | 'update', data: any) {
  if (!uploadBanner.value) {
    ElMessage.warning('请先上传图片后再进行提交');
    return;
  }

  data.url = uploadBanner.value;
  return data;
}
</script>
<style lang="less" scoped>
.banners {
  img {
    // width: 300px;
  }
  .banner-uploader {
    /deep/ .el-upload--text {
      width: 100%;
    }
  }
}
</style>
