<template>
  <div>
    <template v-for="menu in subMenu">
      <el-submenu
        v-if="menu.children && menu.children.length > 0"
        :index="menu.key"
        :key="menu.key"
      >
        <template slot="title">
          <!-- 自定义图标-->
          <i :class="'iconfont icon-' + menu.imageUrl" />
          {{ menu.name }}
        </template>
        <!-- 调用自身-->
        <my-sub-menu :subMenu="menu.children"></my-sub-menu>
      </el-submenu>
      <!-- 如果没有子菜单，则显示当前内容 -->
      <el-menu-item v-else :index="menu.key" :key="menu.key">
        <i :class="'iconfont icon-' + menu.imageUrl" />
        {{ menu.name }}
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  // inject: ["reload"],
  name: "MySubMenu",
  props: {
    subMenu: [],
  },
  watch: {},
  created() {},
  methods: {},
};
</script>

<style  >
.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title,
.el-submenu__title,
.el-submenu,
.el-menu-item,
.el-submenu.is-active,
.el-submenu__title,
.el-menu-item-group__title {
  color: rgb(41, 41, 48) !important;
}


.el-menu--horizontal .el-menu .el-menu-item:hover,
.el-menu--horizontal .el-menu .el-submenu__title:hover,
.el-submenu__title:hover,
.el-submenu:hover,
.el-menu-item:hover,
.el-submenu.is-active:hover,
.el-submenu__title:hover,
.el-menu-item-group__title:hover{
  color:    rgb(233, 51, 35) !important;
   
}
</style>
