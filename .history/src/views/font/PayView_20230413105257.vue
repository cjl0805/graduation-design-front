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
  mounted() {
    this.creatQrCode();
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
  },
  cancel() {
    this.$router.push("/appointment");
  },
  confirm() {},
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
