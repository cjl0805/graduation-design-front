<template>
  <div class="hairstylist">
    <br /><br />
    <el-col :span="8" v-for="item in items" :key="item.id">
      <el-card class="box-card" :body-style="{ padding: '10px' }">
        <img :src="item.img" alt="" height="100px" />
        <p class="p">{{ item.name }}</p>
        <br />
        <el-tooltip
          class="item"
          effect="light"
          :content="item.description"
          placement="bottom"
          ><p class="p">
            {{ item.description }}
          </p></el-tooltip
        >
        <br />
        <el-tag
          size="small"
          v-for="skill in item.skill"
          :key="skill"
          class="tag"
        >
          {{ skill }}
        </el-tag>
        <br /><br />
        <a
          href="/appointment"
          class="a"
          style="text-decoration: none; font-size: 14px"
          >预约理发</a
        >
      </el-card>
      <br />
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      hairstyles: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios({
        method: "GET",
        url: "http://localhost:8090/graduation/design/hairstylist/list",
      })
        .then((result) => {
          console.log(result.data);
          if (result.data.code === 200) {
            this.items = result.data.data;
          } else alert("获取失败");
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
  width: 480px;
  height: 280px;
  margin: 0 auto;
  background: #ffffff;
}
.p {
  font-size: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.a {
  color: #409eff;
}
.tag {
  margin-left: 7px;
}
</style>