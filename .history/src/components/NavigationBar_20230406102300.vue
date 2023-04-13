<template>
  <div class="nav">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        ><router-link to="/" style="text-decoration: none"
          ><p class="p">在线美发预约</p></router-link
        ></el-menu-item
      >
      <el-menu-item index="1"
        ><router-link to="/" style="text-decoration: none"
          ><p class="p1">首页</p></router-link
        ></el-menu-item
      >
      <el-menu-item index="2"
        ><router-link to="/hairstyle" style="text-decoration: none"
          ><p class="p1">发型推荐</p></router-link
        ></el-menu-item
      >
      <el-menu-item index="3"
        ><router-link to="/hairstylist" style="text-decoration: none"
          ><p class="p1">发型师简介</p></router-link
        ></el-menu-item
      >
      <el-menu-item index="4"
        ><router-link to="/appointment" style="text-decoration: none"
          ><p class="p1">预约美发</p></router-link
        ></el-menu-item
      >
      <el-menu-item index="5"
        ><router-link to="/PersonalInfo" style="text-decoration: none"
          ><p class="p1">个人中心</p></router-link
        >
      </el-menu-item>
      <el-button
        type="primary"
        round
        class="button"
        v-on:click="logout"
        v-if="isLogin"
        >退出</el-button
      >
      <el-button type="primary" round class="button" v-on:click="login" v-else
        >登录</el-button
      >
    </el-menu>
  </div>
</template>

<style scoped>
.p {
  font-size: 30px;
  color: #ffd04b;
  margin-top: 2px;
  font-weight: bold;
}
p:visited {
  color: #ffd04b;
}
.p1 {
  font-size: 18px;
  margin-top: 2px;
  font-weight: bold;
}
.button {
  margin-top: -200px;
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  z-index: 99;
}
.button {
  width: 100px;
  height: 40px;
  margin-top: 10px;
  margin-right: -500px;
}
</style>
<script>
export default {
  data() {
    return {
      isLogin: false,
      activeIndex: "1",
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      if (window.localStorage.getItem("token") === null) {
        this.isLogin = false;
      } else this.isLogin = true;
    },
    logout() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("username");
      this.$router.push("/login");
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>