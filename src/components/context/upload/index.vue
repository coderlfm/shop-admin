<template lang="">
  <el-upload
    :class="`${name}-uploader`"
    :name="name"
    :headers="uploadHeader"
    :action="action"
    :show-file-list="false"
    :onSuccess="onSuccess"
  >
    <slot></slot>
  </el-upload>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import { uploadHeader } from '@/service';

defineProps<{
  name: string;
  action: string;
  onSuccess: (res: any, file: any) => void;
}>();
</script>
<style lang=""></style>
