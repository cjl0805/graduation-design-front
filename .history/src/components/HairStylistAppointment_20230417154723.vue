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
        <el-descriptions-item label="预约时间"
          >{{ item.time }}
          <el-link
            type="primary"
            @click="accept(item)"
            style="margin-left: 60px; font-size: 15px"
            >接受预约</el-link
          >
          <el-link
            type="primary"
            @click="cancel(item)"
            style="margin-left: 10px; font-size: 15px"
            >拒绝预约</el-link
          >
        </el-descriptions-item>
        <el-descriptions-item label="预约发型">{{
          item.hairstyle
        }}</el-descriptions-item>
        <el-descriptions-item label="预约发型师">{{
          item.hairstylist
        }}</el-descriptions-item>
        <el-descriptions-item label="预约状态"
          >{{ item.status }}
        </el-descriptions-item>
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
          "http://localhost:8090/graduation/design/appointmentInfo/get/byHairstylist/" +
          this.currentPage +
          "/" +
          this.pageSize,
        params: {
          hairstylist: window.localStorage.getItem("hairstylist"),
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
    accept(item) {
      this.axios({
        method: "PUT",
        url: "http://localhost:8090/graduation/design/appointmentInfo/update/status",
        params:{
          appointmentId:item.appointmentId,
          status:"已接受"
        }
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          alert("取消成功！");
          this.getPage();
        } else {
          alert(res.data.message);
        }
      });
    },
    cancel(item){
      if(item.status==='已成功结算'){
        alert('该订单已结算，不可拒绝！');
      }else{

      }
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
