<template>
  <v-container grid-list-md text-xs-center>
    <!--test-->

    <v-layout row wrap class="grey lighten-4">
      <v-flex xs6 sm6 md4 lg3 v-for="(product,index) in products" :key="index">
        <v-card class>
          <div class="cardh">
            <div class="imageh">
              <img :src="product.images" class="card-img-top" alt="...." />
            </div>
            <div class="detailsh">
              <div class="centerh">
                <h1>
                  {{product.name}}
                  <br />
                  <span>{{product.author}}</span>
                </h1>
                <p>Lorem ipsum is simple dummy text on the printing and typesetting industry.</p>
              </div>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- swiper  
    <swiper :options="swiperOption" class="swipers">
      <swiper-slide>
        <v-responsive class>
          <v-container hide-delimiters class>
            <v-card v-for="(product,index) in products" :key="index">
              <div class="cardh">
                <div class="imageh">
                  <img :src="product.images" class="card-img-top bbb" alt="...." />
                </div>
                <div class="detailsh">
                  <div class="centerh">
                    <h1>
                      {{product.name}}
                      <br />
                      <span>{{product.author}}</span>
                    </h1>
                    <p>Lorem ipsum is simple dummy text on the printing and typesetting industry.</p>
                    <button>Add to cart</button>
                  </div>
                </div>
              </div>
            </v-card>
          </v-container>
        </v-responsive>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    -->
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap class="wrapper">
        <v-flex xs6 sm6 md4 lg3 v-for="(product,index) in products" :key="index">
          <v-card class="card">
            <img :src="product.images" class="card-img-top bbb" alt="...." />
            <div class="info">
              <p>{{product.name}}</p>
              <p>{{product.author}}</p>
              <button>Add to cart</button>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>
<script>
import { fb, db } from "../firebase";
import "swiper/dist/css/swiper.css";
import ProductCard from "@/components/product.grid.vue";

import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "cardsdisplay",
  data() {
    return {
      products: [],
      swiperOption: {
        slidesPerView: 5,
        centeredSlides: false,
        spaceBetween: 2,
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
  components: { swiper, swiperSlide },
  methods: {},
  firestore() {
    return {
      products: db.collection("products")
    };
  }
};
</script>

<style scoped >
body,
html {
}

.wrapper {
  width: 90%;
}
@media only screen and (max-width: 600px) {
  .card {
    width: 150px;
    height: 200px;
    border-radius: 15px;
    padding: 1.5rem;
    background: white;

    display: inline-block;
    align-items: flex-end;
    transition: 0.4s ease-out;
    box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.5);
  }
}
@media only screen and (min-width: 600px) {
  .card {
    min-width: 300px;
    min-height: 400px;
    border-radius: 15px;
    padding: 1.5rem;
    background: white;
    position: relative;
    display: flex;
    align-items: flex-end;
    transition: 0.4s ease-out;
    box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.5);
  }
}

.card:hover {
  -webkit-transform: translateY(20px);
  transform: translateY(20px);
}
.card:hover:before {
  opacity: 1;
}
.card:hover .info {
  opacity: 1;
  -webkit-transform: translateY(0px);
  transform: translateY(0px);
}
.card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;

  border-radius: 15px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
  transition: 0.5s;
  opacity: 0;
}
.card img {
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  border-radius: 15px;
}
.card .info {
  position: relative;
  z-index: 3;
  color: white;
  opacity: 0;

  transition: 0.5s;
}
.card .info h1 {
  margin: 0px;
}
.card .info p {
  letter-spacing: 1px;
  font-size: 15px;
  margin-top: 8px;
}
.card .info button {
  padding: 0.6rem;
  outline: none;
  border: none;
  border-radius: 3px;
  background: white;
  color: black;
  font-weight: bold;
  cursor: pointer;
  transition: 0.4s ease;
}
.card .info button:hover {
  background: dodgerblue;
  color: white;
}

body {
  margin: 0;
  padding: 0;
  background: #250008;
  font-family: sans-serif;
}

.cardh {
  background: #000;
}
.cardh .imageh {
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
