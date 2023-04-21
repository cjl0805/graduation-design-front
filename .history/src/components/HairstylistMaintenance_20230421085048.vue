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
    <div style="margin-top: -40px">
      <el-button type="primary" round @click="handleInsert()"
        >新增发型师</el-button
      >
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
      <el-table-column prop="username" label="用户名" style="width: 25%">
      </el-table-column>
      <el-table-column prop="password" label="密码" style="width: 25%">
      </el-table-column>
      <el-table-column prop="name" label="名字" style="width: 25%">
      </el-table-column>
      <el-table-column prop="skill" label="技能" style="width: 25%">
      </el-table-column>
      <el-table-column prop="img" label="图片" style="width: 25%">
        <template slot-scope="scope">
          <img :src="scope.row.img" width="80" height="100" />
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" style="width: 25%">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.$index, tableData)"
            type="text"
            size="medium"
            ><h4>修改</h4></el-button
          >
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

    <el-dialog
      title="新增信息"
      :visible.sync="infoDialogForm"
      width="30%"
      center
    >
      <el-form :model="infoForm">
        <el-form-item label="名字">
          <el-input v-model="infoForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="infoForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="infoForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="技能">
          <br />
          <el-checkbox-group
            v-model="checkedSkill"
            @change="handleCheckedSkillChange"
          >
            <el-checkbox
              v-for="hairstyle in hairstyles"
              :label="hairstyle"
              :key="hairstyle"
              :value="hairstyle"
              >{{ hairstyle }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="infoForm.description"
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
        <el-button type="primary" @click="insert()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改信息"
      :visible.sync="infoDialogForm1"
      width="30%"
      center
    >
      <el-form :model="infoForm1">
        <el-form-item label="名字">
          <el-input v-model="infoForm1.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="infoForm1.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="技能">
          <br />
          <el-checkbox-group
            v-model="checkedSkill"
            @change="handleCheckedSkillChange"
          >
            <el-checkbox
              v-for="hairstyle in hairstyles"
              :label="hairstyle"
              :key="hairstyle"
              :value="hairstyle"
              >{{ hairstyle }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="infoForm1.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="infoForm1.img !== '' ? 'avatar-uploader boxCardUploadImg' : 'avatar-uploader'"
            action=""
            :http-request="upFile"
            :show-file-list="false"
            :on-change="handleChange"
            :limit="2"
          >
            <br />
            <img v-if="infoForm1.img" :src="infoForm1.img" class="avatar" />
            <el-button v-else size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="infoDialogForm1 = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
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
      infoDialogForm1: false,
      infoForm: {
        name: "",
        username: "",
        img: "",
        skill: "",
        password: "",
      },
      infoForm1: {
        img: "",
        skill: "",
      },
      currentPage: 1,
      pageSize: 3,
      total: 4,
      input3: "",
      checkedSkill: [],
      hairstyles: [],
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
          "http://localhost:8090/graduation/design/hairstylist/get/page/" +
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
      console.log(this.infoForm);
      if (this.infoForm.name === "") {
        alert("请输入名字！");
      } else if (this.infoForm.username === "") {
        alert("必须为该发型师指定用户名！");
      } else if (this.infoForm.password === "") {
        alert("必须为该发型师指定密码！");
      } else {
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
      }
    },
    deleteRow(index, rows) {
      console.log(rows[index]);
      this.axios({
        method: "DELETE",
        url: "http://localhost:8090/graduation/design/hairstylist/delete",
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
    //更新信息
    update() {
      this.infoForm1.skill = "";
      this.infoForm1.skill += this.checkedSkill;
      console.log(this.infoForm1.skill);
      this.axios({
        method: "PUT",
        url: "http://localhost:8090/graduation/design/hairstylist/update",
        data: this.infoForm1,
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          alert("修改成功！");
          this.infoDialogForm1 = false;
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
