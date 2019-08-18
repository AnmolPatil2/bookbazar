<template>
  <div id="hero">
    <v-carousel flat dark class="slider" transition="fade" cycle>
      <v-carousel-item router :to="item.route" v-for="(item,i) in slides" :key="i">
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
          src: "/images/offer1.png",

          route: "rules"
        },
        {
          src: "/images/Buy.png",

          route: "donate"
        },
        {
          src: "/images/Sell.png",
          route: "RulesToSell"
        },
        {
          src: "/images/donate.jpeg"
        }
      ]
    };
  }
};
</script>
<style scoped>
.hero {
  margin-top: 50px;
}
@media only screen and (max-width: 600px) {
  #hero {
    height: 250px;
  }
  .images {
    height: 250px;
    width: 100%;
  }
  #hero {
    margin-top: 68px;
  }
  .slider {
    max-height: 250px;
    min-height: 250px;
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
  #hero {
    margin-top: 68px;
  }
  .slider {
    max-height: 450px;
    min-height: 450px;
  }
}
</style>
