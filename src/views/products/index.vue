<template>
  <div class="product">
    <PageContent title="商品管理" url="product" :columns="columns" :form="form">
      <template #discountPrice="scope">
        <span class="text-red-500">￥{{ scope.row.discountPrice }} </span>
      </template>
      <template #marketPrice="scope"> ￥{{ scope.row.marketPrice }}</template>
    </PageContent>
  </div>
</template>
<script lang="ts" setup>
import { PageContent } from '@/components/context';
import { columns, form } from './config';
</script>
