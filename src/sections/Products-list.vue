<template>
  <div class="products" id="products">
    <!-- Element-specific configuration options can be passed like this -->
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md4 v-for="(product,index) in offers" :key="index">
          <v-card color="purple" dark height="200px">
            <v-card-title primary class="title">{{product.id}}</v-card-title>
            <v-flex class="ma-0 pa-0">
              <v-card-text>{{product.discription}}</v-card-text>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <md-card class="long-show">
      <div class="md-title" id="multi-title">best sell</div>
      <md-card-actions></md-card-actions>
      <md-card-media>
        <!-- swiper -->
        <swiper :options="swiperOption" class="swipers">
          <swiper-slide v-for="(product,index) in products" :key="index">
            <v-responsive class>
              <v-container hide-delimiters class="ma-0 pa-0">
                <carousel :perPage="1">
                  <slide v-for="(img,index) in product.images " :key="index">
                    <img :src="img" class="card-img-top bbb" alt="...." />
                  </slide>
                </carousel>
              </v-container>
            </v-responsive>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </md-card-media>
    </md-card>
    <v-container class>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="(product,index) in products" :key="index">
          <v-card flat class="text-xs-center mx-3">
            <v-responsive class>
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
                  :price="product.price"
                  :name="product.name"
                ></add-to-cart>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "Products-list",
  props: {
    msg: String
  },
  components: {
    Carousel,
    Slide,
    swiper,
    swiperSlide
  },
  data() {
    return {
      products: [],
      offers: [],

      activeItem: null,
      modal: null,
      swiperOption: {
        slidesPerView: 5,
        centeredSlides: false,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  methods: {
    getImage(images) {
      return images[0];
    }
  },

  firestore() {
    return {
      products: db.collection("products"),
      offers: db.collection("offers")
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#multi-title {
  align-content: left;
  padding: 0;
  margin: 0;
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
.bbb {
  height: 300px;
  width: 300px;
  padding: 30px;
}
.products {
  margin-top: 0rem;
  background: #f2f2f2;
  padding-bottom: 0rem;
}
.card-text1 {
  color: black;
}
.img-responsive img-rounded {
  width: 10px;
  height: 10px;
}
.card-body {
}
.swipers {
  margin: 0px;
  padding: 0px;
}
section {
}
</style>

 