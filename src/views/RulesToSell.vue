<template>
  <div class="rules">
    <div v-if="!isphone" class="skw-pages">
      <div class="skw-page skw-page-1 active">
        <div class="skw-page__half skw-page__half--left">
          <div class="skw-page__skewed">
            <div class="skw-page__content"></div>
          </div>
        </div>
        <div class="skw-page__half skw-page__half--right">
          <div class="skw-page__skewed">
            <div class="skw-page__content">
              <h3 class="skw-page__heading">Experince selling at its best with Bookoo</h3>
              <p class="skw-page__description">When knowledge gets old, its meant to be sold.</p>
              <p class="skw-page__description red--text">Scroll Down to Know more about Sell</p>
              <p
                @click="changetosell()"
                style="cursor: pointer"
                class="skw-page__description red--text pt-2"
              >Or Skip</p>
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
                <v-btn @click="changetosell()" color="white">
                  <h3 class="red--text mt-2" color="white">SELL THEM ON BOOKOO</h3>
                </v-btn>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isphone">
      <v-carousel class="mobileslides">
        <v-carousel-item class="mobileslides" v-for="(item,i) in items" :key="i">
          <img class="imagesmobile" :src="item.src" alt />

          <div class="dataa center pa-4">
            <h2 class="heading white--text">{{item.heading}}</h2>
            <v-btn
              @click="changetosell()"
              class="white--text sellbtn"
              v-if="item.contentmobile=='SELL THEM ON BOOKOO'"
            >{{item.contentmobile}}</v-btn>
            <p
              v-if="item.contentmobile!='SELL THEM ON BOOKOO'"
              class="content ma-2"
            >{{item.contentmobile}}</p>
          </div>
        </v-carousel-item>
      </v-carousel>
      <!--
      <v-carousel flat dark class="slider" transition="fade" cycle>
        <v-carousel-item v-for="(item,i) in items" :key="i">
         
        </v-carousel-item>
      </v-carousel>
      -->
    </div>
  </div>
</template>
<script>
export default {
  name: "rules",
  data() {
    return {
      isphone: false,
      items: [
        {
          heading: "When knowledge gets old, its meant to be sold.",
          contentmobile: "Experince selling at its best with Bookoo",
          src: "/img/buysell/s1.jpg"
        },
        {
          heading: "Prices",
          contentmobile:
            "Do justice to your old books. Make it worth by Selling them at reasonable prices.",
          src: "/img/buysell/s2.jpg"
        },
        {
          heading: "Delivery",
          contentmobile:
            "All your orders delivered right at your college in a few days",
          src: "/img/buysell/s3.jpg"
        },
        {
          heading: "Pickup services",
          contentmobile: " Get your old books picked by us at your college.",
          src: "/img/buysell/s4.jpg"
        },
        {
          heading: "Keep your old books safe so you can",
          contentmobile: "SELL THEM ON BOOKOO",
          src: "/img/buysell/s5.jpg"
        }
      ]
    };
  },
  methods: {
    changetosell() {
      this.$router.push({ name: "sell" });
    }
  },
  mounted() {
    var check = false;
    (function(a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    this.isphone = check;
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
.sellbtn {
  position: absolute;
  left: 25%;
  top: 75%;
  border: 0.5px solid #3085d6;
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
.mobileslides {
  min-height: 100vh;
}
.dataa {
  height: 40vh;
  background: #292929;
}
.imagesmobile {
  height: 60vh;
}
.content {
  color: #fff;
}
</style>

