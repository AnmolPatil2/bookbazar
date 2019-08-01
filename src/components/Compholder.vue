
<template>
  <div class="home">
    <div>
      <Hero />
      <combo />

      <Products-list></Products-list>
      <footer1 />
      <login></login>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import combo from "@/components/combooffers.vue";
import iconmenu from "@/components/iconmenu.vue";
import footer1 from "@/components/footer.vue";
import Products from "@/sections/Products.vue";
import { AtomSpinner } from "epic-spinners";
import Login from "@/components/Login.vue";
export default {
  name: "Compholder",

  components: {
    Hero,
    AtomSpinner,
    Products,
    iconmenu,
    footer1,
    combo,
    Login
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style>
</style>
