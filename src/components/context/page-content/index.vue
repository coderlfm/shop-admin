<template>
  <div class="page-content">
    <h2 class="text-left text-xl font-bold mb-3">{{ title }}</h2>

    <div class="search-header p-5 mb-3 bg-white rounded-md">
      <Form :formList="form.search" @onSubmit="handleSearch" @onReset="handleReset" />
    </div>

    <main class="rounded-md overflow-hidden bg-white">
      <section class="flex justify-between items-center py-3 px-5">
        <slot name="tools-title">
          <span class="font-bold text-lg">{{ title + '列表' }} </span>
        </slot>
        <div>
          <slot name="tools"></slot>
        </div>
      </section>

      <Table
        :tableData="tableData.list"
        :columns="columns"
        :pageInfo="{ ...pageInfo, total: tableData.total }"
        @onPageChange="handleCurrentChange"
        @onPageSizeChange="handleSizeChange"
      >
        <template v-for="item in otherSlot" :key="item.key" #[item.slotName]="scope">
          <el-image
            v-if="item.slotName === 'image'"
            style="width: 100px; height: 100px"
            :src="scope.row[item.key]"
            :preview-src-list="[scope.row[item.key]]"
          />

          <template v-else-if="item.slotName === 'createdAt'">
            {{ $filters.formatDate(scope.row.createdAt) }}
          </template>

          <template v-else-if="item.slotName === 'updatedAt'">
            {{ $filters.formatDate(scope.row.updatedAt) }}
          </template>

          <!-- <template v-else-if="item.slotName === 'handle'">
            <slot :name="item.slotName" :row="scope.row">
              <el-button icon="el-icon-edit" type="text" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button icon="el-icon-delete" type="text" @click="handleDelete(scope.row)">删除</el-button>
            </slot>
          </template> -->

          <slot v-else :name="item.slotName" :row="scope.row"></slot>
        </template>
      </Table>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, defineExpose, onMounted, ref, reactive, watch } from 'vue';
import { getListApi } from '@/service';
import { Table, Form, Dialog } from '@/components/context';
// import { useDelete } from '@/hooks';

// const emit = defineEmits(['onEdit', 'onDelete']);

const props = defineProps<{
  title: string;
  url: string;
  columns: any[];
  form: { search: any[] };
}>();

const pageInfo = ref({ page: 1, pageSize: 10 }); // 搜索
const tableData = reactive<{ list: any[]; total: number }>({ list: [], total: 0 }); // 展示数据

onMounted(() => getList());
watch(pageInfo.value, () => getList());

// 获取列表数据
const getList = async (reqData = pageInfo.value) => {
  const { data } = await getListApi(props.url, reqData);
  tableData.list = data.list;
  tableData.total = data.total;
};

const otherSlot = props.columns.filter((item) => item.slotName);

// 搜索
const handleSearch = (values: any) => {
  getList({ ...pageInfo.value, ...values });
};

// 重置
const handleReset = (values: any) => getList();

const handleSizeChange = (value: number) => (pageInfo.value.pageSize = value);
const handleCurrentChange = (value: number) => (pageInfo.value.page = value);

defineExpose({
  getList,
});
</script>
