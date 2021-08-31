<template lang="">
  <div class="logo"></div>
   <el-menu
      default-active="/products"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#213262"
      text-color="#fff"
      active-text-color="#fff">
      <template v-for="item in menus" :key="item.path">

        <el-submenu :index="item.path" v-if="item.children" >
          <template #title>
            <div>
              <i :class="['text-base mr-2',item.icon]"></i>
              <span > {{ item.title }} </span>
            </div>
          </template>
          <!-- 暂时只支持2级菜单 -->
          <el-menu-item :index="cItem.path" v-for="cItem in item.children" :key="cItem.path" @click="handleMenuItemClick(cItem.path)"> {{ cItem.title }} </el-menu-item>
        </el-submenu>

        <el-menu-item :index="item.path" v-else @click="handleMenuItemClick(item.path)">
          <div>
            <i :class="['text-base mr-2',item.icon]"></i>
            <span > {{ item.title }} </span>
          </div>
        </el-menu-item>

      </template>

    </el-menu>
</template>
<script lang="ts" setup>
import { computed,defineProps } from 'vue';
import { useStore } from 'vuex'
import router from '@/router';


defineProps<{
  isCollapse: boolean
}>()

const store = useStore();

const menus = computed(() => store.state.permission?.menus)

const handleOpen = (key:any, keyPath:any) => {
  console.log(key, keyPath);
};
const handleClose = (key:any, keyPath:any) => {
  console.log(key, keyPath);
};

const handleMenuItemClick = (path:string) => {
  console.log(path);
  router.push(path)

}

// console.log(router.getRoutes());
</script>
<style lang="less" scoped>
.logo{
  height: 48px;
}

.el-menu-item {
  transition: none!important;
}
.el-menu-vertical{
  border: none;
  width: 200px;
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
}

</style>
