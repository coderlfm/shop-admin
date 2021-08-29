<template>
  <el-table :data="tableData" row-key="id" v-bind="tableConfig" @select="handleSelect">
    <template v-for="item in columns" :key="item.key">
      <!-- 多选框 -->
      <el-table-column v-if="item.type === 'selection'" type="selection" reserve-selection v-bind="item" />
      <el-table-column v-else v-bind="item">
        <template #default="scope">
          <slot :name="item.slotName" :row="scope.row">
            {{ scope.row[item.key] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>

  <div class="flex justify-end py-3 pr-3">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
defineProps<{
  tableConfig?: any;
  tableData: any[];
  columns: any[];
  pageInfo: { page: number; pageSize: number; total: number };
}>();

const emit = defineEmits(['onPageChange', 'onPageSizeChange', 'onSelect']);

const handleSizeChange = (value: number) => emit('onPageSizeChange', value);

const handleCurrentChange = (value: number) => emit('onPageChange', value);

const handleSelect = (select: any, row: any) => emit('onSelect', select, row);
</script>
<style lang="less" scoped>
table {
  width: 100% !important;
}
</style>
