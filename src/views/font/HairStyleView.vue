<template>
  <div class="home">
    <NavigationBar></NavigationBar>
    <br /><br /><br />
    <RotationChart></RotationChart>
    <br>
    <el-divider><h1>发型推荐</h1></el-divider>
    <HairStyle></HairStyle>
  </div>
</template>

<script>
// @ is an alias to /src
import RotationChart from "@/components/RotationChart.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import HairStylist from "@/components/HairStylist.vue";
import HairStyle from "@/components/HairStyle.vue";
export default {
  name: "HomeView",
  components: {
    RotationChart,
    NavigationBar,
    HairStylist,
    HairStyle,
  },
};
</script>
<style scoped>
.h1 {
  margin: 0 auto;
}
.home{
  display: block;
  position: sticky;
}
</style>
