<template>
  <div class="PersonalInfo">
    <NavigationBar></NavigationBar>
    <br /><br /><br /><br />
    <UserDescription v-if="role == 3"></UserDescription>
    <HairStylistInfo v-else></HairStylistInfo>
  </div>
</template>

<script>
// @ is an alias to /src
import RotationChart from "@/components/RotationChart.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import UserDescription from "@/components/UserDescription.vue";
import HairStylistInfo from "@/components/HairStylistInfo.vue";
export default {
  name: "PersonalInfo",
  components: {
    RotationChart,
    NavigationBar,
    UserDescription,
    HairStylistInfo,
  },
  data() {
    return {
      role: 3,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios({
        method: "GET",
        url: "http://localhost:8090/graduation/design/user/get/role",
        params: {
          username: window.localStorage.getItem("username"),
        },
      }).then((res) => {
        console.log(res.data.data);
        this.role = res.data.data;
      });
    },
  },
};
</script>
<style scoped>
.PersonalInfo {
  background: rgba(223, 223, 223, 0.5);
}
</style>
