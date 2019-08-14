<template>
  <div class="rules">
    <div class="skw-pages">
      <div class="skw-page skw-page-1 active">
        <div class="skw-page__half skw-page__half--left">
          <div class="skw-page__skewed">
            <div class="skw-page__content"></div>
          </div>
        </div>
        <div class="skw-page__half skw-page__half--right">
          <div class="skw-page__skewed">
            <div class="skw-page__content">
              <h3 class="skw-page__heading">When knowledge gets old, its meant to be sold.</h3>
              <p class="skw-page__description">---Experince selling at its best with (us at) Bookoo</p>
            </div>
          </div>
        </div>
      </div>
      <div class="skw-page skw-page-2">
        <div class="skw-page__half skw-page__half--left">
          <div class="skw-page__skewed">
            <div class="skw-page__content">
              <h2 class="skw-page__heading">Prices</h2>
              <p
                class="skw-page__description"
              >Do justice to your old books. Make it worth by Selling them at reasonable prices.</p>
            </div>
          </div>
        </div>
        <div class="skw-page__half skw-page__half--right">
          <div class="skw-page__skewed">
            <div class="skw-page__content"></div>
          </div>
        </div>
      </div>
      <div class="skw-page skw-page-3">
        <div class="skw-page__half skw-page__half--left">
          <div class="skw-page__skewed">
            <div class="skw-page__content"></div>
          </div>
        </div>
        <div class="skw-page__half skw-page__half--right">
          <div class="skw-page__skewed">
            <div class="skw-page__content">
              <h2 class="skw-page__heading">Pickup services</h2>
              <p class="skw-page__description">Get your old books picked by us at your college.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="skw-page skw-page-4">
        <div class="skw-page__half skw-page__half--left">
          <div class="skw-page__skewed">
            <div class="skw-page__content">
              <h2 class="skw-page__heading">Exchange Books</h2>
              <p
                class="skw-page__description"
              >Directly Swap your old books for your new semester books.</p>
            </div>
          </div>
        </div>
        <div class="skw-page__half skw-page__half--right">
          <div class="skw-page__skewed">
            <div class="skw-page__content"></div>
          </div>
        </div>
      </div>
      <div class="skw-page skw-page-5">
        <div class="skw-page__half skw-page__half--left">
          <div class="skw-page__skewed">
            <div class="skw-page__content"></div>
          </div>
        </div>
        <div class="skw-page__half skw-page__half--right">
          <div class="skw-page__skewed">
            <div class="skw-page__content">
              <h2 class="skw-page__heading">Keep your old books safe so you can</h2>
              <p class="skw-page__description">
                <v-btn @click="changetosell()" color="black" class="white--text">SELL THEM ON BOOKOO</v-btn>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "rules",
  methods: {
    changetosell() {
      this.$router.push({ name: "sell" });
    }
  },
  mounted() {
    $(document).ready(function() {
      var curPage = 1;
      var numOfPages = $(".skw-page").length;
      var animTime = 1000;
      var scrolling = false;
      var pgPrefix = ".skw-page-";

      function pagination() {
        scrolling = true;

        $(pgPrefix + curPage)
          .removeClass("inactive")
          .addClass("active");
        $(pgPrefix + (curPage - 1)).addClass("inactive");
        $(pgPrefix + (curPage + 1)).removeClass("active");

        setTimeout(function() {
          scrolling = false;
        }, animTime);
      }

      function navigateUp() {
        if (curPage === 1) return;
        curPage--;
        pagination();
      }

      function navigateDown() {
        if (curPage === numOfPages) return;
        curPage++;
        pagination();
      }
      //$(document).on("touchmove", function(e) {
      // $(document).trigger("mousewheel");
      // });
      $(document).on("mousewheel DOMMouseScroll", function(e) {
        if (scrolling) return;
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
          navigateUp();
        } else {
          navigateDown();
        }
      });
      $(document).on("touchstart", function(e) {
        var startingY = e.originalEvent.touches[0].pageY;

        $(document).on("touchmove", function(e) {
          currentY = e.originalEvent.touches[0].pageY;
          var delta = currentY - startingY;
          if (scrolling) return;
          if (delta > 0) {
            navigateUp();
          } else if (delta < 0) {
            navigateDown();
          }
        });
      });

      $(document).on("keydown", function(e) {
        if (scrolling) return;
        if (e.which === 38) {
          navigateUp();
        } else if (e.which === 40) {
          navigateDown();
        }
      });
    });
  }
};
</script>

<style scoped lang="scss" >
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #15181a;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}
@media screen and (max-width: 600px) {
  .skw-pages {
    overflow: hidden;

    height: 100vh;
    width: auto + 200px;
    padding: 0;
    margin: 0px;
    left: 0;
  }
  .skw-page {
    position: absolute;
    left: 0;
    top: 0;
  }
  .skw-page-1 .skw-page__half--left .skw-page__content {
    background-position: 0vmin 0vmin;
  }
}
.rules {
}
.skw-pages {
  overflow: hidden;
  position: relative;
  height: 100vh;

  padding: 0;
  margin: 0px;
}

.skw-page {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.skw-page__half {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100vh;
  transition: -webkit-transform 1s;
  transition: transform 1s;
  transition: transform 1s, -webkit-transform 1s;
}
.skw-page__half--left {
  left: 0;
  -webkit-transform: translate3d(-32.4vh, 100%, 0);
  transform: translate3d(-32.4vh, 100%, 0);
}
.skw-page__half--right {
  left: 50%;
  -webkit-transform: translate3d(32.4vh, -100%, 0);
  transform: translate3d(32.4vh, -100%, 0);
}
.skw-page.active .skw-page__half {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.skw-page__skewed {
  overflow: hidden;
  position: absolute;
  top: 0;

  width: 140%;
  height: 100%;
  -webkit-transform: skewX(-18deg);
  transform: skewX(-18deg);
  background: #000;
}
.skw-page__half--left .skw-page__skewed {
  left: -40%;
}
.skw-page__half--right .skw-page__skewed {
  right: -40%;
}
.skw-page__content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0 30%;
  color: #fff;
  -webkit-transform: skewX(18deg);
  transform: skewX(18deg);
  transition: opacity 1s, -webkit-transform 1s;
  transition: transform 1s, opacity 1s;
  transition: transform 1s, opacity 1s, -webkit-transform 1s;
  background-size: cover;
}
.skw-page__half--left .skw-page__content {
  -webkit-transform-origin: 100% 0;
  transform-origin: 100% 0;
}
.skw-page__half--right .skw-page__content {
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
}
.skw-page.inactive .skw-page__content {
  opacity: 0.5;
  -webkit-transform: skewX(18deg) scale(0.95);
  transform: skewX(18deg) scale(0.95);
}
.skw-page__heading {
  margin-bottom: 15px;
  text-transform: uppercase;
  font-size: 25px;
  color: white;
  text-align: center;
}
.skw-page__description {
  font-size: 18px;
  text-align: center;
}
.skw-page__link {
  color: #ffa0a0;
}
.skw-page-1 .skw-page__half--left .skw-page__content {
  background-image: url("/img/buysell/s1.jpg");
}
.skw-page-1 .skw-page__half--right .skw-page__content {
  background: #292929;
}
.skw-page-2 .skw-page__half--left .skw-page__content {
  background: #292929;
}
.skw-page-2 .skw-page__half--right .skw-page__content {
  background-image: url("/img/buysell/s2.jpg");
}
.skw-page-3 .skw-page__half--left .skw-page__content {
  background-image: url("/img/buysell/s3.jpg");
}
.skw-page-3 .skw-page__half--right .skw-page__content {
  background: #292929;
}
.skw-page-4 .skw-page__half--left .skw-page__content {
  background: #292929;
}
.skw-page-4 .skw-page__half--right .skw-page__content {
  background-image: url("/img/buysell/s4.jpg");
}
.skw-page-5 .skw-page__half--left .skw-page__content {
  background-image: url("/img/buysell/s5.jpg");
}
.skw-page-5 .skw-page__half--right .skw-page__content {
  background: #292929;
}
</style>

