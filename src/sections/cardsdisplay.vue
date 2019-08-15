<template>
  <div>
    <section class="section-3 container-fluid p-0 text-center">
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <h1>About our Community</h1>
          <p v-scroll-reveal.reset="{ delay: 250}">
            At Bookoo,
            we are a small community of engineering students striving to make a small change for the better. Students often struggle to get hold of text books, are tricked with high prices and in most cases are required to put in a lot of time and effort. Our mission at Bookoo is to make the purchase of textbooks a simple, convenient and student friendly process. We achieve this through the constant hardwork and perseverance of our team in working together to deliver only the best to you.
            We look forward to working with our users and expanding our community
            <br />-Team bookoo
          </p>
        </div>
      </div>
      <div class="platform row" v-scroll-reveal.reset="{ delay: 550 }">
        <div class="col-md-6 col-sm-12 text-right">
          <div class="desktop shadow-lg">
            <div class="d-flex flex-row justify-content-center">
              <i class="fab fa-whatsapp fa-3x py-2 pr-3"></i>
              <div class="text text-left">
                <h3 class="pt-1 m-0">Join Now</h3>
                <p class="p-0 m-0">On whatsapp</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 text-left">
          <div class="desktop shadow-lg">
            <div class="d-flex flex-row justify-content-center">
              <i class="fab fa-instagram fa-3x py-2 pr-3"></i>

              <div class="text text-left">
                <h3 class="pt-1 m-0">Join Now</h3>
                <p class="p-0 m-0">On Instagram</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--test-->
    <h1 style="color: #026670" class="writting text-left">Offers</h1>
    <v-container>
      <v-layout row wrap class>
        <v-flex xs6 sm6 md4 lg3 v-for="(product,index) in mostbought2" :key="index">
          <v-card v-scroll-reveal.reset="{ delay: 150+ (index*400)}" class="cardh">
            <div class="imageh">
              <img :src="product.images" class="card-img-top imagesD" alt="...." />
            </div>
            <div class="product-label">
              <span class="sale">{{Discount(product.fullprice,product.sale)}}% OFF</span>
            </div>
            <div class="detailsh">
              <div class="centerh">
                <h5 class="bookname red--text">{{product.name}}</h5>
                <div class="author">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="authoricon">
                          <i class="fa fa-user" aria-hidden="true"></i>
                        </td>

                        <td class="authorname">{{product.author}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="flipbut pt-3">
                  <button class="quick-view left px-2">
                    <i @click=" product_select(product)" class="fa fa-eye"></i>
                    <span class="tooltipp"></span>
                  </button>
                  <button class="add-to-cart-btn right px-2 cartb">
                    <i @click="addcart(product)" class="fa fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!--community-->

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
   
    <h1 class="writting text-left mx-3">Best Seller so Far</h1>
    <v-container>
      <v-layout class="wrapper">
        <v-flex xs6 sm6 md4 lg3 v-for="(product,index) in products" :key="index">
          <v-card class="card">
            <img :src="product.images" class="card-img-top imagesD" alt="...." />
            <div class="info">
              <p>{{product.name}}</p>
              <p>{{product.author}}</p>
              <button>Add to cart</button>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    -->
  </div>
</template>
<script>
import { fb, db } from "../firebase";

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
  components: {},
  methods: {
    product_select(product) {
      this.$router.push({
        name: "productCompholder",
        params: { id: product.id }
      });
    },
    addcart(product) {
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
    Discount(price, sale_price) {
      return parseInt(((price - sale_price) * 100) / price);
    }
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  computed: {
    mostbought2: function() {
      return this.products.filter(product => {
        var name = String(product.importance);

        return name.match("2");
      });
    }
  }
};
</script>

<style scoped >
.writting {
  padding-top: 5vmin;
  padding-bottom: 0.1em;
  font-family: "lobster", cursive;
}

.author {
  max-width: 100px;
}
.imagesD {
  height: auto;
  width: auto;
  width: 270px;
  height: 270px;
  margin: 0;
}
@media only screen and (max-width: 600px) {
  .cardh {
    margin: 5px;
  }
  .bookname {
    width: 124px;
  }
}
@media only screen and (min-width: 600px) {
  .cardh {
    margin-right: 15px;
    margin-bottom: 10px;
  }
  .bookname {
    min-width: 190px;
  }
}
.cartb {
  font-size: 30px;
}
.quick-view {
  font-size: 30px;
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
  background: linear-gradient(to bottom, #2e9cca, #123c69);
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
}

.section-3 {
  height: 70vmin;
  margin-top: 15vmin;
  background: linear-gradient(to bottom, #2e9cca, #123c69);
}

.section-3 .col-md-12 > h1 {
  padding: 2em 0 0.5em 0;
  color: whitesmoke;
  font-size: 6vmin;
}

.section-3 .col-md-12 > p {
  padding: 0 4em;
  padding-bottom: 2em;
  color: rgba(255, 255, 255, 0.877);
  font-size: 3vmin;
}

.section-3 .desktop {
  background: white;
  display: inline-block;
  border-radius: 3em;
  padding: 2vmin 4.5vmin;
  margin: 1em;
}

.section-3 .desktop h3 {
  font-size: 4vmin;
}

.section-3 .desktop p {
  font-size: 2vmin;
}
@media only screen and (max-width: 768px) {
  .section-3 {
    height: inherit;
    padding: 10vmin !important;
  }
  .section-3 .row h1 {
    padding: 6vmin 4vmin;
  }
  .section-3 .platform .col-md-6 {
    text-align: center !important;
  }
  .section-3 .desktop i {
    font-size: 8vmin;
  }
}

.product-label {
  position: absolute;
  top: 15px;
  right: 15px;
}

.product-label > span {
  border: 2px solid;
  padding: 2px 10px;
  font-size: 12px;
}

.product-label > span.sale {
  background-color: #d10024;
  border-color: #d10024;
  color: #fff;
}

.product-label > span.new {
  background-color: #d10024;
  border-color: #d10024;
  color: #fff;
}
</style>
