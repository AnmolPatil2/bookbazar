<template>
  <div class="products" id="products">
    <!-- Element-specific configuration options can be passed like this -->

    <v-container class>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="(product,index) in products" :key="index">
          <v-card flat class="text-xs-center mx-3">
            <v-responsive class>
              <v-container hide-delimiters class="ma-0 pa-0">
                <carousel :perPage="1">
                  <slide v-for="(img,index) in product.images " :key="index">
                    <img :src="img" class="card-img-top" alt="....">
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
                <add-to-cart :product-id="product.id" :price="product.price" :name="product.name"></add-to-cart>
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
section {
}
</style>

 