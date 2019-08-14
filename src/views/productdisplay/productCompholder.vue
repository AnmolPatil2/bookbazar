<template>
  <div class="productCompholder">
    <Nabar />
    <psection />
    <footer1 />
  </div>
</template>
<script>
import Nabar from "@/components/Navbar";
import psection from "./psection";
import footer1 from "@/components/footer1.vue";

export default {
  name: "productCompholder",
  components: {
    Nabar,
    psection,
    footer1
  },
  mounted() {}
};
</script>
<style>
@import "../../../public/css/style.css";
</style>

