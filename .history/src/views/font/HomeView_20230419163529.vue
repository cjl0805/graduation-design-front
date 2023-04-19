<template>
  <div class="home">
    <NavigationBar></NavigationBar>
    <br /><br />
    <div>
      <div class="img">
        <img :src="imgSrc" width="100%" alt />
      </div>
      <div class="div">
        <el-card class="card"
          ><h1 class="h1">在线美发预约</h1>
          <h3>名称:&#32;{{ name }}</h3>
          <h3>营业时间:&#32;{{ businessHours }}</h3>
          <h3>地址:&#32;{{ address }}</h3>
          <h3>联系方式:&#32;{{ phone }}</h3>
          <h3>简介:&#32;{{ description }}</h3>
        </el-card>
        <el-card class="card1">
          <el-card v-for="item in items" :key="item.id"
            ><el-descriptions title="留言信息" :column="2"
              ><el-descriptions-item label="留言内容">{{
                item.content
              }}</el-descriptions-item>
              <el-descriptions-item label="留言时间">{{
                item.date
              }}</el-descriptions-item></el-descriptions
            ></el-card
          >
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationBar from "@/components/NavigationBar.vue";
export default {
  name: "HomeView",
  components: {
    NavigationBar,
  },
  data() {
    return {
      imgSrc: require("../../assets/background.jpg"),
      name: "",
      businessHours: "",
      address: "",
      phone: "",
      description: "",
      currentPage: 1,
      pageSize: 4,
      total: 6,
      items: [],
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
      this.axios({
        method: "GET",
        url:
          " http://localhost:8090/graduation/design/messageInfo/get/page/" +
          this.currentPage +
          "/" +
          this.pageSize,
        params: {
          query: "",
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.items = res.data.data.records;
          this.pageSize = res.data.data.size;
          this.currentPage = res.data.data.current;
          this.total = res.data.data.total;
        } else alert("获取失败");
      });
    },
  },
};
</script>
<style scoped>
.div {
  width: 100%;
  height: 100%;
}
.card {
  text-align: left;
  width: 600px;
  height: 400px;
  position: absolute;
  top: 25%;
  left: 50%;
  background: rgb(255, 255, 255, 0.8);
  color: #000;
}
.img {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: fixed;
  padding: 0px;
  margin-left: 0px;
}
.card1 {
  text-align: left;
  width: 600px;
  height: 400px;
  position: absolute;
  top: 25%;
  left: 1.7%;
  background: rgb(255, 255, 255, 0.8);
  color: #000;
}
</style>
