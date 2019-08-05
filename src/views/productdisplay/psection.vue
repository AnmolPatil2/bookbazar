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
                <h2 class="product-name">{{book.name}}</h2>
                <div>
                  <div class="product-rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-o"></i>
                  </div>
                  <a class="review-link" href="#">10 Review(s) | Add your review</a>
                </div>
                <div>
                  <h3 class="product-price">
                    Rs{{book.sale}}
                    <del class="product-old-price">RS{{book.fullprice}}</del>
                  </h3>
                  <span class="product-available">In Stock</span>
                </div>
                <h2>{{book.condition}}</h2>
                <p>{{book.discription}}</p>

                <div class="product-options"></div>

                <div class="add-to-cart">
                  <div class="qty-label">
                    Qty
                    <div class="input-number">
                      <input type="number" />
                      <span class="qty-up">+</span>
                      <span class="qty-down">-</span>
                    </div>
                  </div>
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
                    <a @click="change(1)">Description</a>
                  </li>
                  <li>
                    <a @click="change(2)">Details</a>
                  </li>
                  <li>
                    <a @click="change(3)">Reviews</a>
                  </li>
                </ul>
                <!-- /product tab nav -->

                <!-- product tab content -->
                <div class="tab-content">
                  <!-- tab1  -->
                  <div v-if="display==1">
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
                  <!-- /tab1  -->

                  <!-- tab2  -->
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
                  <!-- /tab2  -->

                  <!-- tab3  -->
                  <div v-if="display==3">
                    <div class="row">
                      <!-- Rating -->
                      <div class="col-md-3">
                        <div id="rating">
                          <div class="rating-avg">
                            <span>4.5</span>
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
                                <div style="width: 80%;"></div>
                              </div>
                              <span class="sum">3</span>
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
                                <h5 class="name">{{book.reveiw.name}}</h5>
                                <p class="date">27 DEC 2018, 8:0 PM</p>
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
                            <li>
                              <div class="review-heading">
                                <h5 class="name">John</h5>
                                <p class="date">27 DEC 2018, 8:0 PM</p>
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
                            <li>
                              <div class="review-heading">
                                <h5 class="name">John</h5>
                                <p class="date">27 DEC 2018, 8:0 PM</p>
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
  </div>
</template>
<script>
import { fb, db } from "../../firebase";
import { Carousel, Slide } from "vue-carousel";
import { BreedingRhombusSpinner } from "epic-spinners";
import { AtomSpinner } from "epic-spinners";
export default {
  name: "psection",
  data() {
    return {
      book: null,
      loading: true,
      display: 1
    };
  },
  components: { AtomSpinner },
  created() {
    let ref = db.collection("products");

    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.book = user.data();
      })
      .then(() => {
        this.loading = false;
      });
  },
  methods: {
    change(i) {
      this.display = i;
      console.log(this.book);
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .product-details {
    margin-bottom: 50px;
  }
}
.zoom:hover {
  -ms-transform: scale(1.3); /* IE 9 */
  -webkit-transform: scale(1.3); /* Safari 3-8 */
  transform: scale(1.3);
}
@media screen and (min-width: 600px) {
  .product-details {
    margin-left: 50px;
  }
}
.product-name {
  padding-top: 5vmin;
  padding-bottom: 0.1em;
  font-family: "lobster", cursive;
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
</style>
