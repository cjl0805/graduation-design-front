<template>
  <div class="div3">
    <el-descriptions :column="1">
      <el-descriptions-item
        label="名称"
        label-class-name="my-label1"
        content-class-name="my-content1"
        >{{ name }}</el-descriptions-item
      >
      <el-descriptions-item
        label="营业时间"
        label-class-name="my-label1"
        content-class-name="my-content1"
        >{{ businessHours }}</el-descriptions-item
      >
      <el-descriptions-item
        label="地址"
        label-class-name="my-label1"
        content-class-name="my-content1"
        >{{ address }}</el-descriptions-item
      >
      <el-descriptions-item
        label="联系方式"
        label-class-name="my-label1"
        content-class-name="my-content1"
        >{{ phone }}
      </el-descriptions-item>
      <el-descriptions-item
        label="简介"
        label-class-name="my-label1"
        content-class-name="my-content1"
        >{{ description }}</el-descriptions-item
      >
    </el-descriptions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      businessHours: "",
      address: "",
      phone: "",
      description: "",
    };
  },
};
</script>

<style>
.my-label1 {
  font-size: 20px;
  margin-top: 20px;
  margin-left: 100px;
}
.my-content1 {
  font-size: 20px;
  margin-top: 20px;
  margin-left: 10px;
}
</style>
