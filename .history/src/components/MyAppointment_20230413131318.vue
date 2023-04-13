<template>
  <div class="appointment">
    <br />
    <el-card
      body-style="{ padding: '0px' }"
      class="box-card"
      v-for="item in items"
      :key="item.id"
    >
      <el-descriptions title="预约信息">
        <el-descriptions-item label="预约单号">{{
          item.appointmentId
        }}</el-descriptions-item>
        <el-descriptions-item label="预约日期">{{
          item.date
        }}</el-descriptions-item>
        <el-descriptions-item label="预约时间">{{
          item.time
        }}</el-descriptions-item>
        <el-descriptions-item label="预约发型">{{
          item.hairstyle
        }}</el-descriptions-item>
        <el-descriptions-item label="预约发型师">{{
          item.hairstylist
        }}</el-descriptions-item>
        <el-descriptions-item label="预约状态"
          >{{ item.status
          }}<a
            href="/pay"
            style="margin-left: 160px;font-size: 16px;color: #ffd04b;"
            v-if="item.status == '未支付'"
            >去支付</a
          ></el-descriptions-item
        >
      </el-descriptions>
    </el-card>
    <br /><br />
    <el-pagination
      class="pagination"
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
      pageSize: 3,
      total: 4,
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
          "http://localhost:8090/graduation/design/appointmentInfo/get/" +
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
.box-card {
  width: 1060px;
  height: 150px;
  margin: 0 auto;
  margin-top: 20px;
}

.pagination {
  text-align: right;
}

.appointment {
  margin: 0 auto;
  text-align: center;
  width: 90%;
  height: 100%;
}
</style>
