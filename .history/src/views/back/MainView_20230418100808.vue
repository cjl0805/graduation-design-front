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
        <el-menu-item index="1" @click="click1()">
          <h3 class="h">简介编辑</h3>
        </el-menu-item>
        <el-menu-item index="2" @click="click2()">
          <h3 class="h">发型信息维护</h3>
        </el-menu-item>
        <el-menu-item index="3" @click="click3()">
          <h3 class="h">发型师信息维护</h3>
        </el-menu-item>
        <el-menu-item index="4" @click="click4()">
          <h3 class="h">顾客信息维护</h3>
        </el-menu-item>
        <el-menu-item index="5" @click="click5()">
          <h3 class="h">预约信息维护</h3>
        </el-menu-item>
        <el-menu-item index="6" @click="click6()">
          <h3 class="h">留言维护</h3>
        </el-menu-item>
        <el-menu-item index="7" @click="logout()" style="color: aqua;">
          <h3 class="h">退出</h3>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="div2">
      <IntroductionEditor v-if="menu === 1"></IntroductionEditor>
      <HairstyleMaintenance v-if="menu === 2"></HairstyleMaintenance>
      <HairstylistMaintenance v-if="menu === 3"></HairstylistMaintenance>
      <CustomerMaintenance v-if="menu === 4"></CustomerMaintenance>
      <AppointmentMaintenance v-if="menu === 5"></AppointmentMaintenance>
      <MessageMaintenance v-if="menu === 6"></MessageMaintenance>
    </div>
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
    return {
      menu: 1,
    };
  },
  methods: {
    click1() {
      this.menu = 1;
    },
    click2() {
      this.menu = 2;
    },
    click3() {
      this.menu = 3;
    },
    click4() {
      this.menu = 4;
    },
    click5() {
      this.menu = 5;
    },
    click6() {
      this.menu = 6;
    },
  },
};
</script>

<style>
.h {
  text-align: center;
  margin: auto;
}
.div2 {
  margin: 0 auto;
  margin-top: 40px;
}
.button {
  width: 100px;
  height: 30px;
  margin-right: -500px;
}
</style>
