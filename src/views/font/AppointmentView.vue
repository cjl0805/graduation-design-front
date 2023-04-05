<template>
  <div class="home">
    <NavigationBar></NavigationBar>
    <br /><br /><br><br><br><br><br>
    <Form></Form>
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationBar from "@/components/NavigationBar.vue";
import Form from "@/components/AppointmentForm.vue";
export default {
  name: "HomeView",
  components: {
    NavigationBar,
    Form,
  },
};
</script>
