<template>
  <div class="community">
    <img class="image1" src="/images/comingsoon.jpg" alt />
    <v-btn flat @click="goback()" class="back white--text">Back</v-btn>
    <iconmenu />
  </div>
</template>
<script>
import iconmenu from "@/components/iconmenu.vue";
export default {
  name: "community",
  components: { iconmenu },
  mounted() {},
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.back {
  position: relative;
  left: 45%;
  background: black;
}
.image {
  position: absolute;
  top: 10px;
}
</style>