<template lang="">
<div class="w-full flex justify-end">
  <el-dropdown>
    <span class="el-dropdown-link">
      <i class="ri-user-3-line text-xl hover:text-blue-500"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>

        <el-dropdown-item>
          <div class="flex items-center hover:text-blue-500"><i class="text-base ri-lock-unlock-line"></i> 修改密码</div>
          </el-dropdown-item>
        <el-dropdown-item>
          <div class="flex items-center hover:text-blue-500"><i class="text-base ri-logout-circle-r-line"></i> 退出登录</div>
          </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
