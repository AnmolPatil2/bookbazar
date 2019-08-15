<template>
  <div class="products white" id="products">
    <div v-if="products==null" class="loader_space">
      <atom-spinner class="loader" :animation-duration="1000" :size="200" color="#ff1d5e" />
      <h2 class="red--text loader">loading....</h2>
    </div>
    <!--best seller-->

    <div v-if="products!=null">
      <h1 style="color: #026670" class="writting text-left">Top Searches</h1>

      <!-- swiper -->
      <swiper :options="swiperOption" class>
        <swiper-slide v-for="(product,index) in mostbought" :key="index" id="itemdisplay">
          <v-responsive class @click="product_select(product)">
            <v-container hide-delimiters class>
              <img :src="product.images" class="card-img-top imagesD" alt="...." />
              <h5 class="red--text my-3">
                <i class="fa fa-inr" aria-hidden="true"></i>
                {{product.sale}}
              </h5>
            </v-container>
          </v-responsive>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <!--folds-->
      <cardsdisplay />
      <numbers />
      <div id="itemdisplay" class="mt-4" v-scroll-reveal="{ delay: 250 }">
        <div>
          <h2 class="mb-4">Must buy</h2>
        </div>
        <product-card
          :items="mostbought3"
          :options="options"
          :mapping="mapping"
          @widgetClick="product_select"
          @widgetCart="product_to_cart"
          @widgetRating="product_rating"
          @widgetFavorite="product_favorite"
        />
      </div>
      <v-container class>
        <v-layout row wrap>
          <v-flex xs6 sm6 md4 lg3 v-for="(product,index) in mostbought4" :key="index">
            <v-card flat class="text-xs-center mx-3">
              <v-responsive class @click="product_select(product)">
                <v-container hide-delimiters class="ma-0 pa-0">
                  <carousel :perPage="1">
                    <slide v-for="(img,index) in product.images " :key="index">
                      <img :src="img" class="card-img-top" alt="...." />
                    </slide>
                  </carousel>
                </v-container>
              </v-responsive>
              <v-card-text>
                <div class="subheading">{{product.name}}</div>
                <div class="grey--text">{{product.price}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn flat color="grey">
                  <add-to-cart
                    :image="getImage(product.images)"
                    :p-id="product.id"
                    :price="priceconvet(product.sale)"
                    :name="product.name"
                  ></add-to-cart>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import { BreedingRhombusSpinner } from "epic-spinners";
import { AtomSpinner } from "epic-spinners";
import { fb, db } from "../firebase";
import login from "@/components/Login.vue";
import "swiper/dist/css/swiper.css";
import numbers from "@/components/numbershow.vue";
import ProductCard from "@/components/product.grid.vue";
import cardsdisplay from "./cardsdisplay.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "Products-list",
  props: {},
  components: {
    Carousel,
    AtomSpinner,
    Slide,
    numbers,
    login,
    swiper,
    swiperSlide,
    cardsdisplay,
    ProductCard
  },
  data() {
    return {
      loading: true,
      products: null,
      offers: [],
      items: [],
      mostboughtimpnumber: 2,
      activeItem: null,

      modal: null,
      dd: this.numberofslides,
      swiperOption: {
        slidesPerView: 7,
        centeredSlides: false,
        spaceBetween: 2,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        breakpoints: {
          640: {
            freemode: true,
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            freemode: true,
            slidesPerView: 2,
            spaceBetween: 20
          }
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      count: 0,
      mapping: {
        id: "_id",
        name: "name",
        label: "author",
        abstract: "description",
        price: "fullprice",
        sale_price: "sale",
        image: "images",
        isfavorite: "fav",
        rating: "stars"
      },
      options: {
        color: "#fff",
        title_color: "#555",
        text_color: "orange",
        price_color: "#555",
        sale_color: "#ff0000",
        icons_color: "#888",
        rating_color: "#ff0000",
        border: "0px",
        elevation: "1",
        rating: true,
        favorite: true,
        currency: "Rs",
        salebox: true,
        btn_1: '<i class="material-icons">favorite_border</i>',
        btn_1_on: '<i class="material-icons">favorite</i>',
        btn_2: '<i class="material-icons">shopping_cart</i>',
        btn_2_on: '<i class="material-icons">shopping_cart</i>'
      },
      demo_image:
        "data:image/png;base64,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"
    };
  },
  created() {
    this.loading = false;
    console.log(this.count);
    console.log(this.count + 1);
  },
  methods: {
    getImage(images) {
      return images[0];
    },
    priceconvet(productsale) {
      let sale = productsale.toString();

      return productsale.toString();
    },

    product_select(product) {
      this.$router.push({
        name: "productCompholder",
        params: { id: product.id }
      });
    },
    product_to_cart(product) {
      // your logic ...
      var item = {
        productName: product.name,
        productImage: product.images,
        productPrice: product.sale,
        productId: product.id,
        productQuantity: 1
      };
      $("#miniCart").modal("show");
      this.$store.commit("addToCart", item);
    },
    product_rating(rating, product) {
      // your logic ...
      console.log("rating=>", rating, "product=>", product);
    },
    product_favorite(index, status) {
      //update favorite status (changed icon in the component)
      this.items[index][this.mapping.isfavorite] = !this.items[index][
        this.mapping.isfavorite
      ];
      // your logic ...
      console.log("favorite product=>", this.items[index], "status=>", status);
      Toast.fire({
        type: "success",
        title: "Added to favoutite"
      });
    },
    clicked_slot(slot) {
      console.log("clicked slot=>", slot);
    }
  },
  computed: {
    mostbought: function() {
      return this.products.filter(product => {
        var name = String(product.importance);

        return name.match("1");
      });
    },
    mostbought3: function() {
      return this.products.filter(product => {
        var name = String(product.importance);

        return name.match("3");
      });
    },
    mostbought4: function() {
      return this.products.filter(product => {
        var name = String(product.importance);

        return name.match("4");
      });
    }
  },

  firestore() {
    console.log("2");
    return {
      products: db.collection("products")
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
@media screen and (min-width: 600px) {
  #products {
    margin-top: 500px;
  }
}
@media screen and (max-width: 600px) {
  #products {
    margin-top: 800px;
  }
}
#multi-title {
  align-content: left;
  padding: 0;
  margin: 0;
}
.writting {
  padding-top: 6vmin;
  padding-left: 2vmin;
  padding-bottom: 0.1em;
  font-family: "Roboto", cursive;
  display: block;
}
.loader_space {
  position: relative;
  height: 300px;
}
.loader {
  position: absolute;

  left: 50%;
  margin-left: -50px;
}
.append-buttons {
  text-align: center;
  margin-top: 20px;
}
.long-show {
  min-height: 200px;
  align-content: bottom;
  display: block;
  background: #f2f2f2;
}
.append-buttons a {
  display: inline-block;
  margin: 0 10px;
}

.products {
  margin-top: 0rem;
  background: #f2f2f2;
  padding-bottom: 0rem;
}
.card-text1 {
  color: black;
}

.imagesD {
  height: auto;
  width: auto;
  max-width: 270px;
  max-height: 200px;
  margin: 0;
}
.img-responsive img-rounded {
  width: 10px;
  height: 10px;
}

#itemdisplay {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  background: #250008;
  font-family: sans-serif;
}

.cardh {
  display: inline-block;
  position: relative;
  top: 10%;
  left: 10%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 400px;
  background: #000;
}
.cardh .imageh {
  max-width: 300px;
  max-height: 400px;
  overflow: hidden;
}
.cardh .imageh img {
  width: 100%;
  transition: 0.5s;
}
.cardh:hover .imageh img {
  opacity: 0.5;
  transform: translateX(30%); /*100%*/
}
.cardh .detailsh {
  position: absolute;
  top: 0;
  left: 0;
  width: 70%; /*100%*/
  height: 100%;
  background: #ffc107;
  transition: 0.5s;
  transform-origin: left;
  transform: perspective(2000px) rotateY(-90deg);
}
.cardh:hover .detailsh {
  transform: perspective(2000px) rotateY(0deg);
}
.cardh .detailsh .centerh {
  text-align: center;
  background: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.cardh .detailsh .centerh h1 {
  margin: 0;
  padding: 0;
  color: #ff3636;
  line-height: 20px;
  font-size: 20px;
  text-transform: uppercase;
}
.cardh .detailsh .centerh h1 span {
  font-size: 14px;
  color: #262626;
}
.cardh .detailsh .centerh p {
  margin: 10px 0;
  padding: 0;
  color: #262626;
}
.cardh .detailsh .centerh ul {
  margin: 10px auto 0;
  padding: 0;
  display: table;
}
.cardh .detailsh .centerh ul li {
  list-style: none;
  margin: 0 5px;
  float: left;
}
.cardh .detailsh .centerh ul li a {
  display: block;
  background: #262626;
  color: #fff;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  transform: 0.5s;
}
.cardh .detailsh .centerh ul li a:hover {
  background: #ff3636;
}
</style>

 