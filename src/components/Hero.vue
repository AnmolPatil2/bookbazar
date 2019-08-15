<template>
  <div id="hero">
    <v-carousel flat dark class="slider" transition="fade" cycle>
      <v-carousel-item v-for="(item,i) in slides" :key="i">
        <img class="images" :src="item.src" alt />
      </v-carousel-item>
    </v-carousel>
  </div>
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
        },
        {
          src: "/images/offers.jpeg"
        }
      ]
    };
  }
};
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  #hero {
    height: 300px;
  }
  .images {
    height: 300px;
    width: 100%;
  }
  .slider {
    max-height: 300px;
    min-height: 300px;
  }
}
@media only screen and (min-width: 600px) {
  .hero {
    min-height: 450px;
  }
  .images {
    height: 450px;
    width: 100%;
  }
  .slider {
    max-height: 450px;
    min-height: 450px;
  }
}
</style>
