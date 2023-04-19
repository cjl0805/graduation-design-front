<template>
  <div class="message">
    <br />
    <div style="text-align: left">
      <el-button type="primary" round @click="infoDialogForm = true"
        >新增留言</el-button
      >
    </div>
    <el-card class="message-card" v-for="item in items" :key="item.id">
      <el-descriptions title="留言信息" :column="2"
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
    <el-dialog
      title="新增留言"
      :visible.sync="infoDialogForm"
      width="30%"
      center
    >
      <el-form :model="infoForm">
        <el-form-item label="留言内容">
          <el-input v-model="infoForm.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="infoDialogForm = false">取 消</el-button>
        <el-button type="primary" @click="insert()">确 定</el-button>
      </span>
    </el-dialog>
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
      infoForm: {
        username: window.localStorage.getItem("username"),
      },
      infoDialogForm: false,
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
    insert() {
      this.axios({
        method: "POST",
        url: "http://localhost:8090/graduation/design/messageInfo/save",
        data: this.infoForm,
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          alert("添加成功！");
          this.infoDialogForm = false;
          this.getPage();
        } else {
          alert(res.data.message);
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
