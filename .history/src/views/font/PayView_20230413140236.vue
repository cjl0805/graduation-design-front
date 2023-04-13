<template>
  <div class="div">
    <div class="qrcode" ref="qrCodeUrl"></div>
    <br /><br /><br />
    <div>
      <el-button type="primary" round @click="cancel()">取消支付</el-button>
      <el-button type="primary" round @click="confirm()">确定支付</el-button>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      appointmentId: window.localStorage.getItem("appointmentId"),
    };
  },
  mounted() {
    this.creatQrCode();
    console.log(this.appointmentId);
  },
  methods: {
    creatQrCode() {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: "https://gitee.com/cjl0805", // 需要转换为二维码的内容
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    cancel() {
      this.$router.push({ path: "/PersonalInfo?myAppointment=true" });
    },
    confirm() {
      this.axios({
        method: "PUT",
        url: "http://localhost:8090/graduation/design/appointmentInfo/update/status",
        params: {
          appointmentId: this.appointmentId,
        },
      }).then((result) => {
        console.log(result.data);
        if (result.data.code === 200) {
          alert("支付成功！");
          this.$router.push({ path: "/PersonalInfo?myAppointment=true" });
        } else {
          alert(result.data.message);
        }
      });
    },
  },
};
</script>

<style>
.div {
  margin: auto;
}
.qrcode {
  display: inline-block;
  position: relative;
  margin-top: 10rem;
}
</style>
