<template>
  <v-carousel flat dark transition="fade" cycle class="hero" hide-delimiters>
    <v-carousel-item class="mobileslides" v-for="(item,i) in slides" :key="i" :src="item.src">
      <h2 class="content_mobile">gadiaks</h2>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: [
        {
          src: "/images/Buy.png"
        },
        {
          src: "/images/Offer.png"
        },
        {
          src: "/images/Sell.png"
        }
      ]
    };
  }
};
</script>
<style scoped>
.mobileslides {
}
@media only screen and (max-width: 600px) {
  .hero {
    max-height: 300px;
  }
}

.hero {
  max-height: 450px;
}
</style>
