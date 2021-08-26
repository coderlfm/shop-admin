<template>
  <div class="page-content">
    <h2 class="text-left text-xl font-bold mb-3">{{ title }}</h2>

    <div class="search-header p-5 mb-3 bg-white rounded-md">
      <Form :formList="form.search" @onSearch="handleSearch" @onReset="handleReset" />
    </div>

    <main class="rounded-md overflow-hidden bg-white">
      <section class="flex justify-end py-3 pr-5">
        <slot name="tools"></slot>
      </section>

      <Table :tableData="tableData.list" :columns="columns">
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

          <template v-else-if="item.slotName === 'handle'">
            <el-button icon="el-icon-edit" type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button icon="el-icon-delete" type="text" @click="handleDelete(scope.row)">删除</el-button>
          </template>

          <slot v-else :name="item.slotName" :row="scope.row"></slot>
        </template>
      </Table>
      <div class="flex justify-end py-3 pr-3">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
        >
        </el-pagination>
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, onMounted, ref, reactive, watch } from 'vue';
import { getListApi } from '@/service';
import { Table, Form } from '@/components/context';

const emit = defineEmits(['onEdit', 'onDelete']);

const props = defineProps<{
  title: string;
  url: string;
  columns: any[];
  form: {
    search: any[];
  };
}>();

const pageInfo = ref({ page: 1, pageSize: 10 });
const tableData = reactive<{ list: any[]; total: number }>({ list: [], total: 0 });

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

const handleSizeChange = (value: number) => {
  console.log(value);
  pageInfo.value.pageSize = value;
};

const handleCurrentChange = (value: number) => {
  console.log(value);
  pageInfo.value.page = value;
};

const handleEdit = (row: any) => emit('onEdit', row);
const handleDelete = (row: any) => emit('onDelete', row);
</script>
