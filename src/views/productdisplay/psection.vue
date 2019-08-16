<template>
  <div class="section_display">
    <div v-if="loading" class="loader_space">
      <atom-spinner class="loader" :animation-duration="1000" :size="200" color="#ff1d5e" />
      <h2 class="red--text loader">loading....</h2>
    </div>
    <!-- SECTION -->
    <div v-if="!loading">
      <div class="section">
        <!-- container -->
        <div class="container">
          <!-- row -->
          <div class="row">
            <!-- Product main img -->

            <!-- /Product main img -->

            <!-- Product thumb imgs 
          <div class="col-md-2 col-md-pull-5">
            <div id="product-imgs">
              <div class="product-preview">
                <img :src="book.images" class="card-img-top " alt="...." />
              </div>
            </div>
            </div>-->
            <!-- /Product thumb imgs -->
            <div class="col-md-5 col-md-push-2">
              <div id="product-main-img">
                <div class="product-preview">
                  <img :src="book.images" class="card-img-top zoom" alt="...." />
                </div>
              </div>
            </div>
            <!-- Product details -->
            <div class="col-md-5">
              <div class="product-details">
                <h5 class="red--text product-name1">
                  <i class="fa fa-user" aria-hidden="true"></i>
                  {{book.author}}
                </h5>
                <h1 class>{{book.name}}</h1>
                <p class="teal--text">{{book.edition}}, {{book.publication}}</p>

                <div>
                  <div class="product-rating">
                    <i v-for="times in book.rating" class="fa fa-star red--text rating_stars"></i>

                    <i class="fa fa-star-o"></i>
                  </div>
                </div>
                <div>
                  <h3 class="product-price">
                    <i class="fa fa-inr" aria-hidden="true"></i>
                    {{book.sale}}
                    <del class="product-old-price">
                      <i class="fa fa-inr" aria-hidden="true"></i>
                      {{book.fullprice}}
                    </del>
                  </h3>
                  <span class="product-available">In Stock</span>
                </div>
                <v-chip class="ma-2" color="teal" text-color="white">
                  <v-avatar left>
                    <v-icon>check_circle</v-icon>
                  </v-avatar>
                  {{book.type}}
                </v-chip>
                <br />
                <v-chip class="ma-2" color="green" text-color="white">
                  <v-avatar left class="green darken-4">{{book.year}}</v-avatar>Year
                </v-chip>
                <v-chip class="ma-2" color="pink" label text-color="white">
                  <v-icon left>label</v-icon>
                  {{book.branch}}
                </v-chip>

                <div class="product-options"></div>

                <div @click="addtocart(book)" class="add-to-cart">
                  <button class="add-to-cart-btn">
                    <i class="fa fa-shopping-cart"></i> add to cart
                  </button>
                </div>

                <!--share
              <ul class="product-links">
                <li>Share:</li>
                <li>
                  <a href="#">
                    <i class="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-google-plus"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-envelope"></i>
                  </a>
                </li>
              </ul>
                -->
              </div>
            </div>
            <!-- /Product details -->

            <!-- Product tab -->
            <div class="col-md-12">
              <div id="product-tab">
                <!-- product tab nav -->
                <ul class="tab-nav">
                  <li>
                    <a @click="change2()">Description</a>
                  </li>

                  <li>
                    <a @click="change()">Reviews</a>
                  </li>
                </ul>
                <!-- /product tab nav -->

                <!-- product tab content -->
                <div class="tab-content">
                  <!-- tab1  -->
                  <div v-if="!display">
                    <div class="row">
                      <div class="col-md-12">
                        <p>No discription Yet</p>
                      </div>
                    </div>
                  </div>
                  <!-- /tab1  -->

                  <!-- tab2  
                  <div v-if="display==2">
                    <div class="row">
                      <div class="col-md-12">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                          in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                      </div>
                    </div>
                  </div>
                  <!-- /tab2-->

                  <!-- tab3  -->
                  <div v-if="display">
                    <div class="row">
                      <!-- Rating -->
                      <div class="col-md-3">
                        <div id="rating">
                          <div class="rating-avg">
                            <span>{{book.rating}}</span>
                            <div class="rating-stars">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star-o"></i>
                            </div>
                          </div>
                          <ul class="rating">
                            <li>
                              <div class="rating-stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                              </div>
                              <div class="rating-progress">
                                <div style="width: 30%;"></div>
                              </div>
                              <span class="sum">1</span>
                            </li>
                            <li>
                              <div class="rating-stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-o"></i>
                              </div>
                              <div class="rating-progress">
                                <div style="width: 60%;"></div>
                              </div>
                              <span class="sum">2</span>
                            </li>
                            <li>
                              <div class="rating-stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                              </div>
                              <div class="rating-progress">
                                <div></div>
                              </div>
                              <span class="sum">0</span>
                            </li>
                            <li>
                              <div class="rating-stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                              </div>
                              <div class="rating-progress">
                                <div></div>
                              </div>
                              <span class="sum">0</span>
                            </li>
                            <li>
                              <div class="rating-stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                              </div>
                              <div class="rating-progress">
                                <div></div>
                              </div>
                              <span class="sum">0</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <!-- /Rating -->

                      <!-- Reviews -->
                      <div class="col-md-6">
                        <div id="reviews">
                          <ul class="reviews">
                            <li>
                              <div class="review-heading">
                                <h5 class="name">Kruthika</h5>
                                <p class="date">12 Aug 2019, 06.24 PM</p>
                                <div class="review-rating">
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star-o empty"></i>
                                </div>
                              </div>
                              <div class="review-body">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <!-- /Reviews -->

                      <!-- Review Form -->
                      <div class="col-md-3">
                        <div id="review-form">
                          <form class="review-form">
                            <input class="input" type="text" placeholder="Your Name" />

                            <textarea class="input" placeholder="Your Review"></textarea>
                            <div class="input-rating">
                              <span>Your Rating:</span>
                              <div class="stars">
                                <input id="star5" name="rating" value="5" type="radio" />
                                <label for="star5"></label>
                                <input id="star4" name="rating" value="4" type="radio" />
                                <label for="star4"></label>
                                <input id="star3" name="rating" value="3" type="radio" />
                                <label for="star3"></label>
                                <input id="star2" name="rating" value="2" type="radio" />
                                <label for="star2"></label>
                                <input id="star1" name="rating" value="1" type="radio" />
                                <label for="star1"></label>
                              </div>
                            </div>
                            <button class="primary-btn">Submit</button>
                          </form>
                        </div>
                      </div>
                      <!-- /Review Form -->
                    </div>
                  </div>
                  <!-- /tab3  -->
                </div>
                <!-- /product tab content  -->
              </div>
            </div>
            <!-- /product tab -->
          </div>
          <!-- /row -->
        </div>
        <!-- /container -->
      </div>
      <!-- /SECTION -->
    </div>
    <div class="section2">
      <!-- Section -->
      <div class="section">
        <!-- container -->
        <div class="container">
          <!-- row -->
          <div class="row">
            <div class="col-md-12">
              <div class="section-title text-center">
                <h2 class="title writting">Related Books</h2>
              </div>
            </div>

            <!-- product -->
            <v-container>
              <v-layout row wrap class>
                <v-flex xs6 sm6 md4 lg3 v-for="(book,index) in relatedbooks" :key="index">
                  <div class="product" @click="product_select(book)">
                    <div class="product-img" v-for="(img,index) in book.images " :key="index">
                      <img :src="img" alt />
                      <div class="product-label">
                        <span class="sale">-30%</span>
                      </div>
                    </div>
                    <div class="product-body">
                      <h3 class="product-name">
                        <a href="#">{{book.name}}</a>
                      </h3>
                      <h4 class="product-price">
                        <i class="fa fa-inr" aria-hidden="true"></i>
                        {{book.sale}}
                        <del class="product-old-price">
                          <i class="fa fa-inr" aria-hidden="true"></i>
                          {{book.fullprice}}
                        </del>
                      </h4>
                      <div class="product-rating">
                        <i v-for="rating in book.rating" class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                      </div>
                    </div>
                    <div class="py-4 my-4"></div>
                    <div class="add-to-cart" @click="addtocartrelated(book)">
                      <button class="add-to-cart-btn">
                        <i class="fa fa-shopping-cart"></i> add to cart
                      </button>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>

            <!-- /product -->

            <!-- product -->

            <!-- /product -->
          </div>
          <!-- /row -->
        </div>
        <!-- /container -->
      </div>
      <!-- /Section -->

      <!-- NEWSLETTER -->

      <!-- /NEWSLETTER -->
    </div>
    <MiniCart />
  </div>
</template>
<script>
import { fb, db } from "../../firebase";
import { Carousel, Slide } from "vue-carousel";
import { BreedingRhombusSpinner } from "epic-spinners";
import { AtomSpinner } from "epic-spinners";
import MiniCart from "@/components/MiniCart.vue";

export default {
  name: "psection",
  data() {
    return {
      book: null,
      loading: true,
      display: false,
      idd: null,
      relatedbooks: []
    };
  },
  components: { AtomSpinner, MiniCart },
  mounted() {
    console.log("testing1");
    console.log(this.idd);
    db.collection("products")
      .where("idd", "==", this.idd)
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          this.relatedbooks.push({
            images: user.data().images,
            name: user.data().name,
            sale: user.data().sale,
            fullprice: user.data().fullprice
          });
        });
      });
  },
  created() {
    console.log("testing2");
    let ref = db.collection("products");

    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.book = user.data();
      })
      .then(() => {
        this.loading = false;
        this.idd = this.book.idd;
        console.log(this.idd);
        db.collection("products")
          .where("idd", "==", this.idd)
          .get()
          .then(snapshot => {
            snapshot.forEach(user => {
              this.relatedbooks.push({
                images: user.data().images,
                name: user.data().name,
                sale: user.data().sale,
                fullprice: user.data().fullprice,
                pId: user.id
              });
            });
          });
      });
  },
  methods: {
    product_select(product) {
      this.$router.replace({
        name: "productCompholder",
        params: { id: product.pId }
      });
      document.location.reload(true);
    },
    addtocartrelated(book) {
      var item = {
        productName: book.name,
        productImage: book.images,
        productPrice: book.sale,
        productId: book.pId,
        productQuantity: 1
      };
      $("#miniCart").modal("show");
      this.$store.commit("addToCart", item);
    },
    addtocart(book1) {
      console.log(book1.pId);
      var item = {
        productName: book1.name,
        productImage: book1.images,
        productPrice: book1.sale,
        productId: book1.pId,
        productQuantity: 1
      };
      $("#miniCart").modal("show");
      this.$store.commit("addToCart", item);
    },

    change(i) {
      this.display = true;
    },
    change2() {
      this.display = false;
    }
  }
};
</script>

<style scoped>
.zoom:hover {
  -ms-transform: scale(1.3); /* IE 9 */
  -webkit-transform: scale(1.3); /* Safari 3-8 */
  transform: scale(1.3);
}
@media screen and (min-width: 600px) {
  .product-details {
    margin-left: 50px;
  }
  .product {
    margin-top: 5px;
  }
}

@media screen and (max-width: 600px) {
  .product-details {
  }
  .product {
  }
}
.rating_stars {
  display: inline;
}
.product-name {
  padding-top: 5vmin;
  padding-bottom: 0.1em;
  font-family: "Rubik", cursive;
  height: 60px;
}
.product-name1 {
  padding-top: 5vmin;
  padding-bottom: 0.1em;
  font-family: "Rubik", cursive;
}
.loader_space {
  position: relative;
  height: 300px;
}
.section_display {
  margin-top: 60px;
}
.loader {
  position: absolute;

  left: 50%;
  margin-left: -50px;
}
@media screen and (min-width: 600px) {
  .product {
    margin: 10px 20px;
  }
}
</style>
