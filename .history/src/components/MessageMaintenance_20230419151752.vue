<template>
    <div class="div12">
      <div style="margin-top: 15px; width: 500px; text-align: center">
        <el-input
          placeholder="请输入内容"
          v-model="input3"
          class="input-with-select"
          style="margin-left: 70px"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getPage()"
          ></el-button>
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
        <el-table-column prop="appointmentId" label="预约单号" style="width: 25%">
        </el-table-column>
        <el-table-column prop="date" label="预约日期" style="width: 25%">
        </el-table-column>
        <el-table-column prop="time" label="预约时间" style="width: 25%">
        </el-table-column>
        <el-table-column prop="hairstyle" label="发型" style="width: 25%">
        </el-table-column>
        <el-table-column prop="hairstylist" label="发型师" style="width: 25%">
        </el-table-column>
        <el-table-column prop="dateNow" label="发起时间" style="width: 25%">
        </el-table-column>
        <el-table-column prop="status" label="预约状态" style="width: 25%">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="medium"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              ><h4>删除</h4></el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <br /><br /><br />
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
        tableData: [],
        currentPage: 1,
        pageSize: 4,
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
      handleCheckedSkillChange(value) {
        this.checkedValue = value;
      },
      handleInsert() {
        this.infoDialogForm = true;
        this.getHairstyle();
      },
      getPage() {
        this.axios({
          method: "GET",
          url:
            "http://localhost:8090/graduation/design/messageInfo/get/page/" +
            this.currentPage +
            "/" +
            this.pageSize,
          params: {
            query: this.input3,
          },
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
      getHairstyle() {
        this.axios({
          method: "GET",
          url: "http://localhost:8090/graduation/design/hairstyle/list/hairstyle",
        })
          .then((res) => {
            console.log(res.data);
            if (res.data.code === 200 && res.data.data != null) {
              this.hairstyles = res.data.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      getHairstylistSkill(item) {
        this.axios({
          method: "GET",
          url: "http://localhost:8090/graduation/design/hairstylist/get/hairstyle",
          params: {
            username: item.username,
          },
        }).then((res) => {
          console.log(res.data);
          if (res.data.code === 200 && res.data.data != null) {
            this.checkedSkill = res.data.data;
          } else {
            this.checkedSkill = [];
          }
        });
      },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 0) {
          return "warning-row";
        } else if (rowIndex === 1) {
          return "success-row";
        } else if (rowIndex === 2) {
          return "fail-row";
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
            this.infoForm1.img = res.data.data;
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
      //修改点击事件
      handleClick(index, rows) {
        this.infoForm1 = rows[index];
        this.getHairstyle();
        this.getHairstylistSkill(rows[index]);
        this.infoDialogForm1 = true;
      },
      //新增的确定按钮
      insert() {
        this.infoForm.skill = "";
        this.infoForm.skill += this.checkedSkill;
        this.axios({
          method: "POST",
          url: "http://localhost:8090/graduation/design/hairstylist/save",
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
      deleteRow(index, rows) {
        console.log(rows[index]);
        this.axios({
          method: "DELETE",
          url: "http://localhost:8090/graduation/design/appointmentInfo/delete",
          data: rows[index],
        }).then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            alert("删除成功！");
            this.infoDialogForm = false;
            this.currentPage = 1;
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
  .el-table .warning-row {
    background: oldlace;
  }
  
  .el-table .fail-row {
    background: rgb(255, 188, 160);
  }
  
  .el-table .success-row {
    background: #f0f9eb;
  }
  
  .div12 {
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
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  </style>
  