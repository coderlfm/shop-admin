<template lang="">
  <div class="logo text-white text-2xl text-center">

    <span v-if="!isCollapse"></span>
    <!-- <span v-if="!isCollapse">茶叶商城管理系统</span> -->
    <div v-else class="p-3 flex justify-center"><img src="@/assets/images/logo.svg" /></div>

  </div>
   <el-menu
      :default-active="localtion.path"
      class="el-menu-vertical"
      :collapse="isCollapse"
      background-color="#213262"
      text-color="#fff"
      active-text-color="#fff"
      @open="handleOpen"
      @close="handleClose">
      <template v-for="item in menus" :key="item.path">

        <el-submenu v-if="item.children" :index="item.path" >
          <template #title>
            <div>
              <i :class="['text-base mr-2',item.icon]"></i>
              <span > {{ item.title }} </span>
            </div>
          </template>
          <!-- 暂时只支持2级菜单 -->
          <el-menu-item v-for="cItem in item.children" :key="cItem.path" :index="cItem.path" @click="handleMenuItemClick(cItem.path)"> {{ cItem.title }} </el-menu-item>
        </el-submenu>

        <el-menu-item v-else :index="item.path" @click="handleMenuItemClick(item.path)">
          <div>
            <i :class="['text-base mr-2',item.icon]"></i>
            <span > {{ item.title }} </span>
          </div>
        </el-menu-item>

      </template>

    </el-menu>
</template>
<script lang="ts" setup>
import { computed, defineProps,  } from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import router from '@/router';


defineProps<{
  isCollapse: boolean
}>()

const store = useStore();
const localtion = useRoute();

const menus = computed(() => store.state.permission?.menus)

const handleOpen = (key:any, keyPath:any) => {
  console.log(key, keyPath);
};
const handleClose = (key:any, keyPath:any) => {
  console.log(key, keyPath);
};

const handleMenuItemClick = (path:string) => router.push(path)

// console.log(router.getRoutes());
</script>
<style lang="less" scoped>
.logo{
  height: 68px;
  line-height: 68px;
  img{
    max-width: 40px;
  }
}

.el-menu-item {
  transition: none!important;
}
.el-menu-vertical{
  border: none;
  width: 220px;
  transition: .5s;
}

.el-menu--collapse{
  width:auto!important;
}

.is-active{
  background: #1890ff linear-gradient(315deg, #35fcff 0%, #0443fc 100%)!important;
}
[class^='ri-'],
[class*=' ri-'] {
  vertical-align: inherit;
  color: #eee;
}

</style>
