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
var slide = require("../../../public/js/jquery.min.js");
var slide1 = require("../../../public/js/main.js");
import * as mykey2 from "../../../public/js/bootstrap.min.js";
import * as mykey3 from "../../../public/js/slick.min.js";
import * as mykey4 from "../../../public/js/nouislider.min.js";
import * as mykey5 from "../../../public/js/jquery.zoom.min.js";

export default {
  name: "productCompholder",
  components: {
    pheader,
    psection,
    section2
  },
  mounted() {
    console.log(this.$route.params.id);
  }
};
</script>
<style>
@import "../../../public/css/slick.css";

@import "../../../public/css/slick-theme.css";

@import "../../../public/css/nouislider.min.css";
@import "../../../public/css/style.css";
</style>

