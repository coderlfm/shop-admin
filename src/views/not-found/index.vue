<template lang="">
  <div>
    <el-result icon="info" title="你迷路了~" subTitle="没有这个页面">
      <template #extra>
        <el-button type="primary" size="medium" @click="router.back()">返回</el-button>
      </template>
    </el-result>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router'

</script>
<style lang=""></style>
