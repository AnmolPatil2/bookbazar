<template>
  <div class="home">
    <Navbar/>
    <Compholder/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Compholder from "@/components/Compholder.vue";
export default {
  name: "home",
  components: {
    Navbar,
    Compholder
  }
};
</script>

<style>
</style>
