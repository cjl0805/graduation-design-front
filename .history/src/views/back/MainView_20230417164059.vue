<template>
  <div>
    <div class="div1">
      <el-col :span="3">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <span slot="title"><h2>简介编辑</h2></span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title"><h2>发型信息维护</h2></span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title"><h2>发型师信息维护</h2></span>
          </el-menu-item>
          <el-menu-item index="4">
            <span slot="title"><h2>顾客信息维护</h2></span>
          </el-menu-item>
          <el-menu-item index="5">
            <span slot="title"><h2>预约信息维护</h2></span>
          </el-menu-item>
          <el-menu-item index="6">
            <span slot="title"><h2>留言维护</h2></span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
    <div class="div2"></div>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.div1 {
  height: 2000px;
}
</style>
