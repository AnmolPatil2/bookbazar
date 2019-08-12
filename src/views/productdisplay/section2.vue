<template>
  <div class="section2">
    <!-- Section -->
    <div class="section">
      <!-- container -->
      <div class="container">
        <!-- row -->
        <div class="row">
          <div class="col-md-12">
            <div class="section-title text-center">
              <h2 class="title writting">Related Products</h2>
            </div>
          </div>

          <!-- product -->
          <div class="col-md-3 col-xs-6 col-sm-6" v-for="(book,index) in books" :key="index">
            <div class="product">
              <div class="product-img" v-for="(img,index) in book.images " :key="index">
                <img :src="img" alt />
                <div class="product-label">
                  <span class="sale">-30%</span>
                </div>
              </div>
              <div class="product-body">
                <p class="product-category">Category</p>
                <h3 class="product-name">
                  <a href="#">{{book.name}}</a>
                </h3>
                <h4 class="product-price">
                  Rs{{book.sale}}
                  <del class="product-old-price">Rs{{book.fullprice}}</del>
                </h4>
                <div class="product-rating">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </div>
              </div>
              <div class="add-to-cart">
                <button class="add-to-cart-btn">
                  <i class="fa fa-shopping-cart"></i> add to cart
                </button>
              </div>
            </div>
          </div>

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
</template>
<script>
import { fb, db } from "../../firebase";
export default {
  name: "section2",
  props: ["idd"],
  data() {
    return {
      books: []
    };
  },
  firestore() {
    return {};
  },
  methods: {
    product_select(product) {
      console.log(product.id);
      this.$router.push({
        name: "productCompholder",
        params: { id: product.id }
      });
    }
  },
  created() {
    if (this.idd) {
      console.log(this.idd);
      db.collection("products")
        .where("idd", "==", this.idd)
        .get()
        .then(snapshot => {
          snapshot.forEach(user => {
            this.books.push({
              images: user.data().images,
              name: user.data().name,
              sale: user.data().sale,
              fullprice: user.data().fullprice
            });
          });
        });
    }
  }
};
</script>
<style>
.writting {
  font-family: "Rubik", cursive;
}
</style>
