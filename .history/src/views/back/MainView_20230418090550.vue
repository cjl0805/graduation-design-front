<template>
  <div>
    <div class="div1">
      <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <h3 class="h">简介编辑</h3>
        </el-menu-item>
        <el-menu-item index="2">
          <h3 class="h">发型信息维护</h3>
        </el-menu-item>
        <el-menu-item index="3">
          <h3 class="h">发型师信息维护</h3>
        </el-menu-item>
        <el-menu-item index="4">
          <h3 class="h">顾客信息维护</h3>
        </el-menu-item>
        <el-menu-item index="5">
          <h3 class="h">预约信息维护</h3>
        </el-menu-item>
        <el-menu-item index="6">
          <h3 class="h">留言维护</h3>
        </el-menu-item>
      </el-menu>
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
  methods: {},
};
</script>

<style></style>
