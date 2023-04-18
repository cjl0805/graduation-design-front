<template>
  <div class="div11">
    <div style="margin-top: 15px; width: 50%;text-align: right;">
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="编号" value="1"></el-option>
          <el-option label="发型名称" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table
      :data="tableData"
      style="width: 94%; margin: 0 auto; align-self: center"
      :row-class-name="tableRowClassName"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="id" label="编号" style="width: 25%">
      </el-table-column>
      <el-table-column prop="hairstyle" label="发型名称" style="width: 25%">
      </el-table-column>
      <el-table-column prop="image" label="图片" style="width: 25%">
        <template slot-scope="scope">
          <img :src="scope.row.image" width="100" height="125" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            ><h3>修改</h3></el-button
          >
          <el-button type="text" size="small"><h3>删除</h3></el-button>
        </template>
      </el-table-column>
    </el-table>
    <br /><br />
    <el-pagination
      class="pagination1"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <div style="margin-top: 100px">
      <el-button type="primary" round @click="infoDialogForm = true"
        >新增发型</el-button
      >
    </div>
    <el-dialog
      title="新增信息"
      :visible.sync="infoDialogForm"
      width="30%"
      center
    >
      <el-form :model="infoForm">
        <el-form-item label="编号">
          <el-input v-model="infoForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发型名称">
          <el-input
            v-model="infoForm.businessHours"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="infoForm.img !== '' ? 'avatar-uploader boxCardUploadImg' : 'avatar-uploader'"
            action=""
            :http-request="upFile"
            :show-file-list="false"
            :on-change="handleChange"
            :limit="2"
          >
            <br />
            <img v-if="infoForm.img" :src="infoForm.img" class="avatar" />
            <el-button v-else size="small" type="primary">点击上传</el-button>
          </el-upload>
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
      tableData: [],
      infoDialogForm: false,
      infoForm: {
        img: "",
      },
      currentPage: 1,
      pageSize: 3,
      total: 4,
      input3: "",
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
          "http://localhost:8090/graduation/design/hairstyle/get/" +
          this.currentPage +
          "/" +
          this.pageSize,
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.tableData = res.data.data.records;
          this.pageSize = res.data.data.size;
          this.currentPage = res.data.data.current;
          this.total = res.data.data.total;
        } else alert(res.data.message);
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "warning-row";
      } else if (rowIndex === 2) {
        return "success-row";
      }
      return "";
    },
    handleChange(file, fileList) {
      const fileName = file.name; // 文件名字
      const fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
      if (fileType === "png" || fileType === "jpg") {
        this.file = file;
        return;
      } else {
        this.$message({
          type: "warning",
          message: "附件格式错误，请重新上传！",
        });
      }
    },
    upFile(item) {
      const formData = new FormData();
      formData.append("file", this.file.raw);
      this.axios({
        method: "POST",
        url: "http://localhost:8090/graduation/design/common/upload",
        data: formData,
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.infoForm.img = res.data.data;
        } else {
          alert(res.data.message);
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    saveImg() {},
    updateInfo() {},
  },
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.div11 {
  margin: 0 auto;
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px solid #d9d9d9;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: none;
}
.avatar-uploader-icon {
  margin-top: 50px;
  font-size: 50px;
  color: #8c939d;
}
.avatar {
  margin-top: 20px;
  width: 100px;
  height: 100px;
  display: block;
}
.pagination1 {
  text-align: center;
}
.input-with-select {
  margin-right: 20px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
