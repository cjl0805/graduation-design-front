<template>
  <div class="div31">
    <el-card
      ><el-descriptions :column="1">
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
      </el-descriptions></el-card
    >

    <div style="margin-top: 100px">
      <el-button type="primary" round @click="infoDialogForm = true"
        >修改简介</el-button
      >
    </div>
    <el-dialog
      title="修改信息"
      :visible.sync="infoDialogForm"
      width="30%"
      center
    >
      <el-form :model="infoForm">
        <el-form-item label="名称">
          <el-input v-model="infoForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-input
            v-model="infoForm.businessHours"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="infoForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="infoForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            v-model="infoForm.description"
            autocomplete="off"
            type="textarea"
            :rows="3"
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
      businessHours: "",
      address: "",
      phone: "",
      description: "",
      infoDialogForm: false,
      infoForm: {},
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
          this.infoForm = result.data.data[0];
        } else alert("获取失败");
      });
    },
    updateInfo() {
      this.axios({
        method: "PUT",
        url: "http://localhost:8090/graduation/design/hairdressing-shop-introduction/update",
        data: this.infoForm,
      }).then((result) => {
        console.log(result.data);
        if (result.data.code === 200) {
          alert("修改成功！");
          this.infoDialogForm = false;
          this.load();
        } else alert("修改失败！");
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
.div31 {
  width: 1200px;
  margin: 0 auto;
}
</style>
