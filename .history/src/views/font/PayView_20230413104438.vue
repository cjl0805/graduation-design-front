<template>
  <div class="div">
    <div class="qrcode" ref="qrCodeUrl"></div>
    <div>
      <el-button type="primary" round>取消支付</el-button>
      <el-button type="primary" round>确定支付</el-button>
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
        text: "https://blog.csdn.net/weixin_42601136", // 需要转换为二维码的内容
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
  },
};
</script>

<style>
.qrcode {
  background-color: #000000;
  width: 232px;
  height: 232px;
  display: inline-block;
  padding: 6px;
  box-sizing: border-box;
}
.div {
  margin: auto;
}
</style>
