<template>
  <div class="product">
    <PageContent
      ref="pageContentRef"
      :title="title"
      :url="url"
      :columns="columns"
      :form="form"
      :pageInfo="{ page: 1, pageSize: 20 }"
    >
      <template #icon="scope">
        <i :class="['text-xl', scope.row.icon]" /><span>{{ scope.row.icon }}</span>
      </template>

      <template #type="scope">
        <el-tag v-if="scope.row.type === 0" type="success" size="small"> 操作权限 </el-tag>
        <el-tag v-else size="small"> {{ scope.row.type }} 级菜单 </el-tag>
      </template>

      <template #handle="scope">
        <el-button icon="ri-edit-2-line" type="text" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button icon="ri-delete-bin-6-line" type="text" @click="handleDelete(scope.row)">删除</el-button>
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
import { getInterfaceListApi, PermissionApi } from '@/service';
import { usePageConent, checkStatusAction } from '@/hooks';
import { columns, form as defaultForm, model as defaultModel } from './config';

const form = ref(defaultForm()); // 搜索表单配置
const modeFormlConfig = ref(defaultModel({ typeSelectChange: handleFormTypeSelectChange })); // 编辑弹框表单配置
const defaultFormVal = ref<any>({}); // 新增/编辑表单 默认值
const selectRows = ref<(number | string)[]>(); // 勾选中的行

const url = PermissionApi.list;
const title = '权限';
const { pageContentRef, pageDialogRef, pageContentCreate, pageContentEdit, pageContentDelete } = usePageConent({ url });

onMounted(async () => {
  // 获取接口列表
  const { data } = await getInterfaceListApi();
  modeFormlConfig.value = defaultModel({ interfaceOptions: data.list, typeSelectChange: handleFormTypeSelectChange });
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
  formatPermissionType(row.type as number);
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

/**
 * 类型选择的事件
 */
function handleFormTypeSelectChange(type: number) {
  console.log('type', type);
  formatPermissionType(type);
}

/**
 * 权限类型选择
 * 不同类型需要填写的内容不一致
 */
const formatPermissionType = (type: number) => {
  /**
   * 隐藏指定的 fromItem
   * @param { [string] } hiddenList 需要隐藏的 formItem prop 名称
   */
  const _hiddenFormItem = (hiddenList: string[]) => {
    modeFormlConfig.value.formList.forEach((item) => {
      // 如果匹配到了，则将其隐藏
      if (hiddenList.includes(item.wrap.prop)) {
        item.hidden = true;
      } else {
        // 如果没有匹配到，则将其显示
        if (item.hidden === true) item.hidden = false;
      }
    });
  };

  switch (type) {
    case 0:
      return _hiddenFormItem(['pId', 'icon', 'path']);
    case 1:
      return _hiddenFormItem(['pId']);
    case 2:
      return _hiddenFormItem([]);
  }
};
</script>
