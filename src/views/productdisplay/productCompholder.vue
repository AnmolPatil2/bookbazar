<template>
  <div class="productCompholder">
    <pheader />
    <psection />
    <section2 />
  </div>
</template>
<script>
import pheader from "./pheader";
import psection from "./psection";
import section2 from "./section2";

export default {
  name: "productCompholder",
  components: {
    pheader,
    psection,
    section2
  },
  mounted() {}
};
</script>
<style>
@import "../../../public/css/style.css";
</style>

