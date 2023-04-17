<template>
  <div>
    <div class="div">
      <el-descriptions :column="1">
        <el-descriptions-item
          label="姓名"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ name }}</el-descriptions-item
        >
        <el-descriptions-item
          label="用户名"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ username }}</el-descriptions-item
        >
        <el-descriptions-item
          label="密码"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ password
          }}<el-button
            type="primary"
            class="button"
            style="width: 10%; margin-left: 50px"
            @click="passwordDialogForm = true"
            >修改密码</el-button
          ></el-descriptions-item
        >
        <el-descriptions-item
          label="个人技能"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ skill }}</el-descriptions-item
        >
        <el-descriptions-item
          label="个人描述"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ description }}</el-descriptions-item
        >
      </el-descriptions>

      <el-button type="primary" @click="infoDialogForm = true"
        >修改信息</el-button
      >
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="passwordDialogForm"
      width="30%"
      center
    >
      <el-form :model="passwordForm">
        <el-form-item label="新的密码">
          <el-input
            v-model="passwordForm.password1"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            v-model="passwordForm.password2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passwordDialogForm = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改信息"
      :visible.sync="infoDialogForm"
      width="30%"
      center
    >
      <el-form :model="infoForm">
        <el-form-item label="个人技能">
          <el-checkbox-group
            v-model="infoForm.hairstyle"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox v-for="hairstyle in hairstyles" :label="hairstyle" :key="hairstyle.id">{{
              hairstyle
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="个人描述">
          <el-input
            v-model="infoForm.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="infoDialogForm = false">取 消</el-button>
        <el-button type="primary" @click="updateInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",
      skill: "",
      description: "",
      passwordDialogForm: false,
      passwordForm: {
        password1: "",
        password2: "",
      },
      infoDialogForm: false,
      infoForm: {},
      hairstyles:[],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios({
        method: "GET",
        url: "http://localhost:8090/graduation/design/hairstylist/get",
        params: {
          username: window.localStorage.getItem("username"),
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 200 && res.data.data != null) {
            this.name = res.data.data.name;
            this.username = res.data.data.username;
            this.password = res.data.data.password;
            this.skill = res.data.data.skill;
            this.description = res.data.data.description;
            this.infoForm = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updatePassword() {
      if (this.passwordForm.password1 === this.password) {
        alert("新密码不能与老密码一致！");
      } else {
        if (this.passwordForm.password1 === this.passwordForm.password2) {
          this.axios({
            method: "PUT",
            url: "http://localhost:8090/graduation/design/user/update/password",
            params: {
              password: this.passwordForm.password1,
              username: this.username,
            },
          }).then((res) => {
            console.log(res.data);
            if (res.data.code === 200) {
              alert("修改密码成功！");
              this.passwordDialogForm = false;
              this.load();
            } else {
              alert(res.data.message);
            }
          });
        } else {
          alert("两次输入的密码不一致！");
        }
      }
    },
    updateInfo() {
      this.axios({
        method: "PUT",
        url: "http://localhost:8090/graduation/design/hairstylist/update/info",
        data: this.infoForm,
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          alert("修改信息成功！");
          this.infoDialogForm = false;
          this.load();
        } else {
          alert(res.data.message);
        }
      });
    },
  },
};
</script>

<style>
.my-label {
  font-weight: 800;
  font-size: 20px;
  margin-top: 60px;
  margin-left: 50px;
}
.my-content {
  font-weight: 800;
  font-size: 20px;
  margin-top: 60px;
  margin-left: 10px;
}
.div {
  margin-left: 60px;
}
</style>
