<template>
  <div class="home">
    <NavigationBar></NavigationBar>
    <br /><br /><br />
    <RotationChart></RotationChart>
    <br>
    <el-divider><h1>发型师简介</h1></el-divider>
    <HairStylist></HairStylist>
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
</style>
