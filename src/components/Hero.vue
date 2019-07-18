<template>
  <v-carousel flat dark transition="fade" cycle class="col-mt-5 hero" hide-delimiters>
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <div class="container h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col">
            <div class="hero-content">
              <h1 class="hero-title pt-5">BookBazar</h1>
              <p>Best place to buy and sel books</p>
              <div class="hero-btn mt-5">
                <button class="btn custom-btn btn-info mr-4">Buy</button>

                <button class="btn custom-btn btn-outline-secondary">Sell</button>
              </div>
            </div>
          </div>
          <div class="col-md-7">
            <div class="graphic">
              <img src="/img/svg/graphic.svg" alt />
            </div>
          </div>
        </div>
      </div>
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
      slides: ["First", "Second", "Third", "Fourth", "Fifth"]
    };
  }
};
</script>
<style>
@media only screen and (max-width: 600px) {
  .hero {
    max-height: 300px;
  }
}

.hero {
  max-height: 350px;
}
</style>
