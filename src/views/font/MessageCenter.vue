<template>
  <div class="home">
    <NavigationBar></NavigationBar>
  </div>
</template>

<script>
// @ is an alias to /src
import RotationChart from "@/components/RotationChart.vue";
import NavigationBar from "@/components/NavigationBar.vue";
export default {
  name: "HomeView",
  components: {
    RotationChart,
    NavigationBar,
  },
};
</script>
