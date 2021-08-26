<template>
  <div class="page-content">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <Form :formList="form.search" @onSearch="handleSearch" @onReset="handleReset" />
        </div>
      </template>
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
            <el-button icon="el-icon-edit" type="text">编辑</el-button>
            <el-button icon="el-icon-delete" type="text">删除</el-button>
          </template>

          <slot v-else :name="item.slotName" :row="scope.row"></slot>
        </template>
      </Table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, ref, reactive } from 'vue';
import { getListApi } from '@/service';
import { Table, Form } from '@/components/context';

const props = defineProps<{
  title: string;
  url: string;
  columns: any[];
  form: {
    search: any[];
  };
}>();

const pageInfo = ref({ page: 1, pageSize: 10 });
const tableData = reactive<{ list: any[] }>({ list: [] });

onMounted(() => getList());

// 获取列表数据
const getList = async (reqData = pageInfo.value) => {
  const { data } = await getListApi(props.url, reqData);
  tableData.list = data.list;
};

const otherSlot = props.columns.filter((item) => item.slotName);

// 搜索
const handleSearch = (values: any) => {
  getList({ ...pageInfo.value, ...values });
};

// 重置
const handleReset = (values: any) => getList();
</script>
