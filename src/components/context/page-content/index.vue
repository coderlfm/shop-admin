<template>
  <div class="page-content">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
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

          <slot v-else :name="item.slotName" :row="scope.row"></slot>
        </template>
      </Table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, ref, reactive } from 'vue';
import { getListApi } from '@/service';
import { Table } from '@/components/context';

const props = defineProps<{
  title: string;
  url: string;
  columns: any[];
}>();

const pageInfo = ref({ page: 1, pageSize: 10 });
const tableData = reactive<{ list: any[] }>({ list: [] });

onMounted(() => getList());

const getList = async () => {
  const { data } = await getListApi(props.url, pageInfo.value);
  console.log('data', data);

  tableData.list = data.list;
  // Request.get({ url: props.url });
};

const otherSlot = props.columns.filter((item) => {
  if (item.slotName) {
    return true;
  }
  return false;
});
</script>
