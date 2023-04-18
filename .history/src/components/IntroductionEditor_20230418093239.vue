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
        width="200px"
        >{{ description }}</el-descriptions-item
      >
    </el-descriptions>
    <br><br>
    <el-button type="primary" round>修改简介</el-button>
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
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios({
        method: "GET",
        url: "http://localhost:8090/graduation/design/hairdressing-shop-introduction/get",
      }).then((result) => {
        console.log(result.data);
        if (result.data.code === 200) {
          this.name = result.data.data[0].name;
          this.businessHours = result.data.data[0].businessHours;
          this.address = result.data.data[0].address;
          this.phone = result.data.data[0].phone;
          this.description = result.data.data[0].description;
        } else alert("获取失败");
      });
    },
  },
};
</script>

<style>
.my-label1 {
  font-size: 20px;
  margin-top: 20px;
  margin-left: 100px;
  font-weight: bolder;
}
.my-content1 {
  font-size: 20px;
  margin-top: 20px;
  margin-left: 10px;
}
.div3 {
  width: 1200px;
  margin: 0 auto;
}
</style>
