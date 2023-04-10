<template>
  <el-card class="card"
    ><h2>请填写你的预约信息</h2>
    <el-form ref="form" :model="form" label-width="100px">
      <br /><br />
      <div class="p">
        预约发型
        <el-select
          v-model="form.hairstyle"
          placeholder="请选择发型"
          class="select1"
        >
          <el-option
            class="option"
            v-for="item in hairstyles"
            :key="item.id"
            :label="item.hairstyle"
            :value="item.hairstyle"
          >
            <span style="float: left">
              <img :src="item.image" alt="" height="60px" />
            </span>
            <span style="float: right; font-size: 15px; margin-top: 15px">
              {{ item.hairstyle }}
            </span>
          </el-option>
        </el-select>
      </div>
      <br />
      <div class="p">
        预约发型师
        <el-select
          v-model="form.stylist"
          placeholder="请选择发型师"
          class="select2"
        >
          <el-option
            class="option"
            v-for="item in stylists"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            @click.native="recommend(item)"
          >
            <span style="float: left"
              ><img :src="item.img" alt="" height="60px"
            /></span>
            <span style="float: right; font-size: 15px; margin-top: 15px">{{
              item.name
            }}</span>
          </el-option>
        </el-select>
      </div>
      <br />
      <div class="p">
        预约时间
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="选择日期"
          class="select3"
        >
        </el-date-picker
        ><br /><br />
        <el-time-picker
          class="select4"
          is-range
          v-model="form.date2"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        >
        </el-time-picker>
      </div>
      <br /></el-form
    ><br /><el-button type="primary" @click="onSubmit"
      >查看预约情况</el-button
    ></el-card
  >
</template>

<script>
export default {
  data() {
    return {
      stylists: [],
      hairstyles: [],
      form: {
        hairstyle: "",
        stylist: "",
        date1: "",
        date2: "",
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    load() {
      this.axios({
        method: "GET",
        url: "http://localhost:8090/graduation/design/hairstyle/list",
      }).then((result) => {
        console.log(result.data);
        this.hairstyles = result.data.data;
      });
      this.axios({
        method: "GET",
        url: "http://localhost:8090/graduation/design/hairstylist/list",
      }).then((result) => {
        console.log(result.data);
        this.stylists = result.data.data;
      });
    },
    recommend(item) {
      this.axios({
        method: "GET",
        url: "http://localhost:8090/graduation/design/hairstyle/recommend",
      }).then((result) => {
        console.log(result.data);
      });
    },
  },
};
</script>
<style scoped>
.card {
  width: 720px;
  margin: 0 auto;
  text-align: center;
}
.p {
  font-weight: bold;
  margin-left: 0px;
}
.select1 {
  margin-left: 60px;
}
.select2 {
  margin-left: 44px;
}
.select3 {
  margin-left: 60px;
}
.select4 {
  margin-left: 0px;
}
.option {
  height: 65px;
}
</style>
