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
        :showSelection="showSelection"
        :pageInfo="{ page: search.page, pageSize: search.pageSize, total: tableData.total }"
        @onPageChange="handleCurrentChange"
        @onPageSizeChange="handleSizeChange"
        @onSelect="handleSelect"
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

          <slot v-else :name="item.slotName" :row="scope.row"></slot>
        </template>
      </Table>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineExpose, defineEmits, onMounted, ref, reactive, watch } from 'vue';
import { getListApi } from '@/service';
import { Table, Form } from '@/components/context';

const props = defineProps<{
  title: string;
  url: string;
  columns: any[];
  form: { search: any[] };
  showSelection?: boolean;
}>();

const emit = defineEmits(['onSelect']);

const search = ref<{ page: number; pageSize: number; [name: string]: string | number }>({ page: 1, pageSize: 10 }); // 搜索
const tableData = reactive<{ list: any[]; total: number }>({ list: [], total: 0 }); // 展示数据

onMounted(() => getList());
watch(search.value, () => getList());

// 获取列表数据
const getList = async (reqData = search.value) => {
  const { data } = await getListApi(props.url, reqData);
  tableData.list = data.list;
  tableData.total = data.total;
};

const otherSlot = props.columns.filter((item) => item.slotName && item.slotName).filter(Boolean);

// 搜索
const handleSearch = (values: any) => changeSearch(values);

// 重置
const handleReset = (values: any) => changeSearch(values);

const changeSearch = (values: any) => {
  for (const key in values) {
    search.value[key] = values[key];
  }
};

const handleSizeChange = (value: number) => (search.value.pageSize = value);
const handleCurrentChange = (value: number) => (search.value.page = value);
// 多选按钮
const handleSelect = (select: any, row: any) => emit('onSelect', select, row);

defineExpose({
  getList,
});
</script>
