<template>
  <div>
    <img class="image1" src="/images/comingsoon.jpg" alt />
    <v-btn flat @click="goback()" class="back white--text">Back</v-btn>
  </div>
</template>
<script>
export default {
  name: "donate",
  mounted() {
    console.log("SSx");
  },
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