<template>
  <div class="message">
    <br />
    <el-card class="message-card" v-for="item in items" :key="item.id">
      <el-descriptions title="留言信息" column="2"
        ><el-descriptions-item label="留言内容">{{
          item.content
        }}</el-descriptions-item>
        <el-descriptions-item label="留言时间">{{
          item.date
        }}</el-descriptions-item></el-descriptions
      >
    </el-card>
    <br /><br />
    <el-pagination
      class="pagination1"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 4,
      total: 6,
      items: [],
    };
  },
  created() {
    this.getPage();
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getPage();
    },
    getPage() {
      this.axios({
        method: "GET",
        url:
          "http://localhost:8090/graduation/design/messageInfo/get/" +
          this.currentPage +
          "/" +
          this.pageSize,
        params: {
          username: window.localStorage.getItem("username"),
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.items = res.data.data.records;
          this.pageSize = res.data.data.size;
          this.currentPage = res.data.data.current;
          this.total = res.data.data.total;
        }
      });
    },
  },
};
</script>

<style>
.message-card {
  width: 1060px;
  height: 100px;
  margin: 0 auto;
  margin-top: 20px;
}
.message {
  margin: 0 auto;
  text-align: center;
  width: 90%;
  height: 100%;
}
.pagination1 {
  text-align: right;
}
</style>