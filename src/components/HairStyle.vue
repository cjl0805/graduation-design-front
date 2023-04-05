<template>
  <div>
    <br />
    <el-col :span="4" v-for="item in items" :key="item.id"
      ><el-card class="box-card" :body-style="{ padding: '0px' }">
        <img :src="item.image" alt="" class="img" />
        <p class="p">{{ item.hairstyle }}</p>
        <a
          href="/appointment"
          class="a"
          style="text-decoration: none; font-size: 14px"
          >预约理发</a
        ><br /> </el-card
      ><br /><br />
    </el-col>
    <br /><br />
  </div>
</template>
<script>
export default {
  data() {
    return {
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
        url: "http://localhost:8090/graduation/design/hairstyle/list",
      })
        .then((result) => {
          console.log(result.data);
          if (result.data.code === 200) {
            this.items = result.data.data;
          } else alert(result.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.box-card {
  width: 200px;
  height: 300px;
  margin: 0 auto;
}
.p {
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.a {
  color: #409eff;
}
.img {
  width: 200px;
  height: 250px;
  margin-left: 0px;
}
</style>