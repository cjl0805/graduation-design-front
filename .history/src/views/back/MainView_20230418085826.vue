<template>
  <div>
    <div class="aside">
      <el-aside width="178px"
        ><el-menu
          height="800px"
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          mode="horizontal"
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
        </el-menu></el-aside
      >
    </div>
    <div class="div2"></div>
  </div>
</template>

<script>
import HairstylistMaintenance from "@/components/HairstylistMaintenance.vue";
import AppointmentMaintenance from "@/components/AppointmentMaintenance.vue";
import CustomerMaintenance from "@/components/CustomerMaintenance.vue";
import HairstyleMaintenance from "@/components/HairstyleMaintenance.vue";
import IntroductionEditor from "@/components/IntroductionEditor.vue";
import MessageMaintenance from "@/components/MessageMaintenance.vue";
export default {
  name: "MainView",
  components: {
    HairstylistMaintenance,
    AppointmentMaintenance,
    CustomerMaintenance,
    HairstyleMaintenance,
    IntroductionEditor,
    MessageMaintenance,
  },
  data() {
    return {};
  },
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
</style>
