<template>
  <div class="qrcode" ref="qrCodeUrl"></div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  mounted() {
    this.creatQrCode();
  },
  creatQrCode() {
    var qrcode = new QRCode(this.$refs.qrCodeUrl, {
      text: "xxxx", // 需要转换为二维码的内容
      width: 100,
      height: 100,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
};
</script>

<style>
.qrcode {
  display: inline-block;
  width: 132px;
  height: 132px;
  background-color: #fff;
  padding: 6px;
  box-sizing: border-box;
}
</style>
