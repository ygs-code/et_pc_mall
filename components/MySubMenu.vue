<template>



       <!-- <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                  <el-menu-item index="2-3">选项3</el-menu-item>
                  <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                  </el-submenu> -->

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

<style scoped></style>
