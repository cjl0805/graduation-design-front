<template>
  <div>
    <div class="img">
      <el-upload
        class="userform.img !== '' ? 'avatar-uploader boxCardUploadImg' : 'avatar-uploader'"
        action=""
        :http-request="upFile"
        :show-file-list="false"
        :on-change="handleChange"
        :limit="2"
        :headers="headers"
      >
        <img v-if="userform.img" :src="userform.img" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i> </el-upload
      ><br />
      <el-button round type="primary" @click="saveImg">保存头像</el-button>
      <div class="div2">
        <div class="div3">
          <el-button class="button"
            ><p class="p" @click="click1">个人信息</p></el-button
          >
        </div>
        <div class="div3">
          <el-button class="button" @click="click2"
            ><p class="p">我的预约</p></el-button
          >
        </div>
        <div class="div3">
          <el-button class="button"
            ><p class="p" @click="click3">我的留言</p></el-button
          >
        </div>
      </div>
    </div>
    <div class="info">
      <UserInfo v-if="userInfo"></UserInfo>
      <myAppointment v-if="myAppointment" class="myAppointment"></myAppointment>
      <myMessage v-if="myMessage"></myMessage>
    </div>
  </div>
</template>

<script>
import UserInfo from "./UserInfo.vue";
import MyAppointment from "./MyAppointment.vue";
import MyMessage from "./MyMessage.vue";
export default {
  name: "UserDescription",
  components: {
    MyAppointment,
    MyMessage,
    UserInfo,
  },
  data() {
    return {
      imageUrl: "",
      headers: {},
      token: "",
      userform: {
        img: "",
      },
      file: " ",
      userInfo: false,
      myAppointment: this.$route.query.myAppointment,
      myMessage: false,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios({
        method: "GET",
        url: "http://localhost:8090/graduation/design/customInfo/get",
        params: {
          username: window.localStorage.getItem("username"),
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.data != null) {
          this.userform.img = res.data.data.img;
        }
      });
    },
    click1() {
      this.userInfo = true;
      this.myAppointment = false;
      this.myMessage = false;
    },
    click2() {
      this.userInfo = false;
      this.myAppointment = true;
      this.myMessage = false;
    },
    click3() {
      this.userInfo = false;
      this.myAppointment = false;
      this.myMessage = true;
    },
    handleChange(file, fileList) {
      const fileName = file.name; // 文件名字
      const fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
      if (fileType === "png" || fileType === "jpg") {
        this.file = file;
        return;
      } else {
        this.$message({
          type: "warning",
          message: "附件格式错误，请重新上传！",
        });
      }
    },
    upFile(item) {
      const formData = new FormData();
      formData.append("file", this.file.raw);
      this.axios({
        method: "POST",
        url: "http://localhost:8090/graduation/design/common/upload",
        data: formData,
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.userform.img = res.data.data;
        } else {
          alert(res.data.message);
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    saveImg() {
      this.axios({
        method: "POST",
        url: "http://localhost:8090/graduation/design/customInfo/save/img",
        params: {
          username: window.localStorage.getItem("username"),
          img: this.userform.img,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          alert("保存头像成功！");
        }
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px solid #d9d9d9;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: none;
}
.avatar-uploader-icon {
  margin-top: 20px;
  font-size: 120px;
  color: #8c939d;
}
.avatar {
  margin-top: 20px;
  width: 120px;
  height: 120px;
  display: block;
}

.boxCardUploadImg .el-upload:hover div {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border-radius: 50px;
  position: absolute;
  font-size: 18px;
  display: initial;
  z-index: 999;
  color: #fff;
  top: 0;
  left: 0;
  background-color: #17163c;
  opacity: 0.5;
}
.my-content {
  font-size: 20px;
}
.my-label {
  font-size: 20px;
}
.img {
  margin-left: 20px;
  text-align: center;
  width: 240px;
  height: 640px;
  border: 2px;
  background: rgb(255, 255, 255);
}
.info {
  margin-top: -640px;
  margin-left: 305px;
  text-align: center;
  width: 1210px;
  height: 640px;
  border: 2px;
  background: rgba(255, 255, 255);
}
.button {
  margin: 0 auto;
  width: 200px;
  height: 40px;
  margin-top: 0px;
}
.p {
  margin: 0 auto;
  font-size: 20px;
  font-weight: bold;
}
.div2 {
  margin-top: 120px;
}
.div3 {
  margin-top: 28px;
}
</style>