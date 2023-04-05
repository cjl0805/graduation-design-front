<template>
  <div>
    <div class="waikuang">
      <el-carousel :interval="5000" arrow="always" height="720px">
        <el-carousel-item v-for="(item,index) in imgList" :key="index">
          <img :src="item.idView" class="imageb" />
        </el-carousel-item>
      </el-carousel>
      <br />
    </div>
  </div>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.waikuang {
  margin: 0 auto;
  max-height: 20%;
  max-width: 100%;
}

.imageb {
  height: 100%;
  width: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      imgList: [
        {idView: require("../assets/轮播图1.jpg") },
        {idView: require("../assets/轮播图2.jpg") },
        {idView: require("../assets/轮播图3.jpg") },
        {idView: require("../assets/轮播图4.jpg") },
      ],
    };
  },
};
</script>