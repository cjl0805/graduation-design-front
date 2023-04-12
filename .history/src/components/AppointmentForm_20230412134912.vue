<template>
  <div>
    <el-card class="card"
      ><h2>请填写你的预约信息</h2>
      <el-form ref="form" :model="form" label-width="100px">
        <br /><br />
        <div class="p">
          预约发型
          <el-select
            v-model="form.hairstyle"
            placeholder="请选择发型"
            class="select1"
          >
            <el-option
              class="option"
              v-for="item in hairstyles"
              :key="item.id"
              :label="item.hairstyle"
              :value="item.hairstyle"
              @click.native="recommendHairstylist(item)"
            >
              <span style="float: left">
                <img :src="item.image" alt="" height="60px" />
              </span>
              <span style="float: right; font-size: 15px; margin-top: 15px">
                {{ item.hairstyle }}
              </span>
            </el-option>
          </el-select>
        </div>
        <br />
        <div class="p">
          预约发型师
          <el-select
            v-model="form.stylist"
            placeholder="请选择发型师"
            class="select2"
          >
            <el-option
              class="option"
              v-for="item in stylists"
              :key="item.id"
              :label="item.name"
              :value="item.name"
              @click.native="recommendHairstyle(item)"
            >
              <span style="float: left"
                ><img :src="item.img" alt="" height="60px"
              /></span>
              <span style="float: right; font-size: 15px; margin-top: 15px">{{
                item.name
              }}</span>
            </el-option>
          </el-select>
        </div>
        <br />
        <div class="p">
          预约日期
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            class="select3"
          >
          </el-date-picker
          ><br /><br />
          预约时间
          <el-time-select
            class="select4"
            placeholder="选择时间"
            v-model="form.time"
            :picker-options="{
              start: '08:00',
              step: '01:00',
              end: '21:00',
            }"
          >
          </el-time-select>
          <br /><br />
        </div>
        （提醒：每个时间段预约人数最多为 4 人）
        <br
      /></el-form>
      <br /><el-button type="primary" @click="onSubmit"
        >查看预约情况</el-button
      ></el-card
    >
    <el-dialog
      title="预约情况"
      :visible.sync="appointmentDialogForm"
      width="40%"
      center
    >
      <h3>该发型师在该时段预约人数:{{ count }}</h3>
      <el-table :data="appointmentData" v-if="isTableVisible">
        <el-table-column
          property="date"
          label="预约日期"
          width="200"
        ></el-table-column>
        <el-table-column
          property="time"
          label="预约时间"
          width="200"
        ></el-table-column>
        <el-table-column
          property="hairstylist"
          label="发型师"
          width="200"
        ></el-table-column>
        <el-table-column property="username" label="预约用户"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="appointmentDialogForm = false"
          >重新选取时间</el-button
        >
        <el-button type="primary" @click="appointmentConfirm()"
          >确定预约</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stylists: [],
      hairstyles: [],
      form: {
        hairstyle: "",
        stylist: "",
        date: "",
        time: "",
      },
      appointmentDialogForm: false,
      count: 0,
      appointmentData: [],
      isTableVisible: true,
    };
  },
  created() {
    this.load();
  },
  methods: {
    onSubmit() {
      if (this.form.hairstyle === "") {
        alert("请选择发型");
      } else if (this.form.stylist === "") {
        alert("请选择发型师");
      } else if (this.form.date === "") {
        alert("请选择预约日期");
      } else if (this.form.time === "") {
        alert("请选择预约时间");
      } else {
        this.axios({
          method: "POST",
          url: "http://localhost:8090/graduation/design/appointmentInfo/list",
          data: this.form,
        }).then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            if (res.data.data.total === 0) {
              this.isTableVisible = false;
            } else {
              this.appointmentData = res.data.data.data;
              this.count = res.data.data.total;
            }
            this.appointmentDialogForm = true;
          } else {
            alert(res.data.message);
          }
        });
      }
    },
    load() {
      this.axios({
        method: "GET",
        url: "http://localhost:8090/graduation/design/hairstyle/list",
      }).then((result) => {
        console.log(result.data);
        this.hairstyles = result.data.data;
      });
      this.axios({
        method: "GET",
        url: "http://localhost:8090/graduation/design/hairstylist/list",
      }).then((result) => {
        console.log(result.data);
        this.stylists = result.data.data;
      });
    },
    //根据选择的发型师推荐发型
    recommendHairstyle(item) {
      this.axios({
        method: "GET",
        url: "http://localhost:8090/graduation/design/hairstyle/recommend",
        params: {
          hairstylist: item.name,
        },
      }).then((result) => {
        console.log(result.data);
        this.hairstyles = result.data.data;
      });
    },
    //根据选择的发型推荐发型师
    recommendHairstylist(item) {
      this.axios({
        method: "GET",
        url: "http://localhost:8090/graduation/design/hairstylist/recommend",
        params: {
          hairstyle: item.hairstyle,
        },
      }).then((result) => {
        console.log(result.data);
        this.stylists = result.data.data;
      });
    },
    appointmentConfirm() {
      if (this.count === 4) {
        alert("当前时间预约人数已满，请重新选取时间");
      } else {
      }
    },
  },
};
</script>
<style scoped>
.card {
  width: 720px;
  margin: 0 auto;
  text-align: center;
}
.p {
  font-weight: bold;
  margin-left: 0px;
}
.select1 {
  margin-left: 60px;
}
.select2 {
  margin-left: 40px;
}
.select3 {
  margin-left: 60px;
}
.select4 {
  margin-left: 60px;
}
.option {
  height: 65px;
}
</style>
