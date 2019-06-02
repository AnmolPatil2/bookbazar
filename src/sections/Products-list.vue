<template>
  <div class="products" id="products">
    <div class="container">
      <h1 class="text-center p-5">Available books</h1>
      <div class="row">
        <div class="col-md-4" v-for="product in products">
          <div class="card product-item">
            <div class="card-body">
              <carousel :perPage="1">
                <slide v-for="(img,index) in product.images">
                  <img :src="img" class="card-img-top" alt="...." max-width="250px">
                </slide>
              </carousel>

              <h5 class="card-title">{{product.name}}</h5>
              <h5 class="card-text">{{product.description}}</h5>
              <p class="card-text">{{product.price}}</p>

              <add-to-cart :product-id="product.id" :price="product.price" :name="product.name"></add-to-cart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "Products-list",
  props: {
    msg: String
  },
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      products: [],

      activeItem: null,
      modal: null
    };
  },
  methods: {
    getImage(images) {
      return images[0];
    }
  },

  firestore() {
    return {
      products: db.collection("products")
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products {
  margin-top: 7rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
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
</style>
