<template>
  <div class="div3">
    <el-descriptions :column="2">
      <el-descriptions-item
        label="名称"
        label-class-name="my-label1"
        content-class-name="my-content1"
        >kooriookami</el-descriptions-item
      >
      <el-descriptions-item
        label="营业时间"
        label-class-name="my-label1"
        content-class-name="my-content1"
        >18100000000</el-descriptions-item
      >
      <el-descriptions-item
        label="地址"
        label-class-name="my-label1"
        content-class-name="my-content1"
        >苏州市</el-descriptions-item
      >
      <el-descriptions-item
        label="联系方式"
        label-class-name="my-label1"
        content-class-name="my-content1"
      >
      </el-descriptions-item>
      <el-descriptions-item
        label="简介"
        label-class-name="my-label1"
        content-class-name="my-content1"
        >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
      >
    </el-descriptions>
  </div>
</template>

<script>
export default {};
</script>

<style>
.my-label1 {
  font-size: 20px;
  margin-top: 60px;
  margin-left: 50px;
}
.my-content1 {
  font-size: 20px;
  margin-top: 60px;
  margin-left: 10px;
}
</style>
