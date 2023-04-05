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
      <br /><br />
      <router-link to="/" style="text-decoration: none"
        ><p class="p">在线美发预约</p></router-link
      >
      <br /><br /><br />
      <el-form label-width="100px" class="form">
        <el-form-item label prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            class="shuru"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
            class="shuru"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label prop="confirmPwd">
          <el-input
            v-model="form.confirmPwd"
            placeholder="请再次输入密码"
            show-password
            class="shuru"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item>
          <el-button round type="primary" v-on:click="register" class="button"
            >注册</el-button
          >
        </el-form-item>
        <el-link type="primary" href="/login">已拥有账号，点击登录</el-link>
        <br />
        <br />
        <br />
      </el-form>
      <p id="cw" style="color: red; font-size: 16px"></p>
    </div>
  </div>
</template>>

<script>
export default {
  data() {
    return {
      imgSrc: require("../../assets/background.jpg"),
      form: {
        username: "",
        password: "",
        confirmPwd: "",
      },
    };
  },
  methods: {
    register() {
      if (this.form.password === this.form.confirmPwd) {
        this.axios({
          method: "POST",
          url: "http://localhost:8090/graduation/design/user/register",
          params: {
            username: this.form.username,
            password: this.form.password,
          },
        }).then((result) => {
          console.log(result.data);
          if (result.data.code === 200) {
            alert("注册成功！");
            this.$router.push("/login");
          } else {
            this.form.username = "";
            this.form.password = "";
            this.form.confirmPwd = "";
            alert("用户名已存在");
          }
        });
      } else alert("两次输入的密码不一致");
    },
  },
};
</script>
<style scoped>
.dl {
  width: 30%;
  margin: 0 auto;
  border: 2px;
  border-radius: 0px;
  background: rgb(255, 255, 255, 0.9);
}

.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: fixed;
  padding: 0px;
}

.shuru {
  margin-left: -100px;
  font-size: 16px;
}

.button {
  height: 50px;
  width: 200px;
  margin-left: -100px;
  text-align: center;
  padding: 15px 100px;
}

.p {
  font-size: 50px;
  color: #0088ff;
  font-weight: bold;
}
</style>>