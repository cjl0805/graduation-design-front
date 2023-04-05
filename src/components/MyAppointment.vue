<template>
  <div class="div">
    <br />
    <el-card
      body-style="{ padding: '0px' }"
      class="box-card"
      v-for="item in 3"
      :key="item"
    >
      <el-descriptions title="预约信息">
        <el-descriptions-item label="开始时间"
          >2023-03-29 16:27:37</el-descriptions-item
        >
        <el-descriptions-item label="结束时间"
          >2023-03-29 16:27:37</el-descriptions-item
        >
        <el-descriptions-item label="预约发型">前刺飞机头</el-descriptions-item>
        <el-descriptions-item label="预约发型师">张三</el-descriptions-item>
        <el-descriptions-item label="预约状态">预约成功</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <br />
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
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
};
</script>

<style>
.box-card {
  width: 1160px;
  height: 160px;
  margin-left: -38px;
  margin-top: 20px;
}
.pagination {
  text-align: right;
}
</style>