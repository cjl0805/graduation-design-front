<template>
  <div>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt />
    </div>
    <br />
    <br />
    <br />
    <br />
    <div class="dl">
      <br />
      <table class="denglu">
        <br />
        <tr>
          <td>
            <router-link to="/" style="text-decoration: none"
              ><p class="p">在线美发预约</p></router-link
            >
          </td>
        </tr>
        <br /><br /><br />
        <tr>
          <td>
            <el-input
              v-model="loginForm.yonghuming"
              placeholder="请输入账号"
              class="shuru"
            ></el-input>
          </td>
        </tr>
        <br />
        <br />
        <tr>
          <td>
            <el-input
              placeholder="请输入密码"
              v-model="loginForm.mima"
              show-password
              class="shuru"
            ></el-input>
          </td>
        </tr>
        <br />
        <br />
        
        <br />
        <tr>
          <td>
            <el-button
              round
              type="primary"
              style="padding: 15px 100px"
              v-on:click="login"
              >登录</el-button
            >
          </td>
        </tr>
        <br />
        <tr>
          <td>
            <el-link type="primary" href="/register"
              >还没有账号？点击注册</el-link
            >
          </td>
        </tr>
      </table>
      <p id="cw" style="color: red; font-size: 16px"></p>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        yonghuming: "",
        mima: "",
      },
      imgSrc: require("../../assets/background.jpg"),
      radio: 3,
      userToken: "",
    };
  },
  methods: {
    changeRadio(val) {
      let dd = val;
      this.$session.set("sf", "用户");
      if (val === 3) {
        this.$session.set("sf", "用户");
      } else {
        this.$session.set("sf", "管理员");
      }
    },
    login() {
      if (this.loginForm.yonghuming === "" || this.loginForm.mima === "") {
        alert("用户名或密码不能为空");
      }
      this.axios({
        method: "GET",
        url: "http://localhost:8090/graduation/design/user/login",
        params: {
          username: this.loginForm.yonghuming,
          password: this.loginForm.mima,
        },
      }).then((result) => {
        if (result.data.code === 200) {
          this.userToken = result.data.data;
          window.localStorage.setItem("token", this.userToken);
          window.localStorage.setItem("username", this.loginForm.yonghuming);
          if(this.loginForm.yonghuming==='admin'){
            this.$router.push("/back/home");
          }else{
            this.$router.push("/");
          }
          
        } else {
          alert("用户名或者密码错误");
        }
      });
    },
  },
};
</script>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: fixed;
  margin-top: 0px;
}

.denglu {
  width: 80%;
  margin: 0 auto;
}
.dl {
  width: 30%;
  margin: 0 auto;
  border: 2px;
  border-radius: 0px;
  background: rgb(255, 255, 255, 0.9);
}

.shuru {
  font-size: 16px;
}

.p {
  font-size: 50px;
  color: #0088ff;
  font-weight: bold;
}
</style>