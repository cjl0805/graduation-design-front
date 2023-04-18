<template>
  <div class="div11">
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="date" label="编号" width="200"> </el-table-column>
      <el-table-column prop="name" label="发型名称" width="280">
      </el-table-column>
      <el-table-column prop="address" label="图片" width="280">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 100px">
      <el-button type="primary" round @click="infoDialogForm = true"
        >新增发型</el-button
      >
    </div>
    <el-dialog
      title="修改信息"
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
            class="userform.img !== '' ? 'avatar-uploader boxCardUploadImg' : 'avatar-uploader'"
            action=""
            :http-request="upFile"
            :show-file-list="false"
            :on-change="handleChange"
            :limit="2"
          >
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      infoDialogForm: false,
      infoForm: {},
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
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
    upFile(item) {},
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
}
</style>
