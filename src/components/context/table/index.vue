<template>
  <el-table :data="tableData" v-bind="tableConfig">
    <template v-for="item in columns" :key="item.key">
      <el-table-column v-bind="item" show-overflow-tooltip>
        <template #default="scope">
          <slot :name="item.slotName" :row="scope.row">
            {{ scope.row[item.key] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps<{
  tableConfig?: any;
  tableData: any[];
  columns: any[];
}>();
</script>
<style lang="less" scoped>
table {
  width: 100% !important;
}
</style>
