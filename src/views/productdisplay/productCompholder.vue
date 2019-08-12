<template>
  <div class="productCompholder">
    <Nabar />
    <psection />
  </div>
</template>
<script>
import Nabar from "@/components/Navbar";
import psection from "./psection";

export default {
  name: "productCompholder",
  components: {
    Nabar,
    psection
  },
  mounted() {}
};
</script>
<style>
@import "../../../public/css/style.css";
</style>

