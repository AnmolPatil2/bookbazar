<template>
  <div class="products" id="products">
    <!-- Element-specific configuration options can be passed like this -->

    <v-container class v-if="display==null">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="(year,index) in years" :key="index">
          <v-card flat class="text-xs-center mx-3">
            <v-responsive class>
              <v-container>
                <img :src="year.img" class="card-img-top" alt="....">
              </v-container>
            </v-responsive>
            <v-card-text>
              <v-btn @click="yearselected(index)">
                <div class="subheading">{{year.name}}</div>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class v-if="display==true">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="(department,index) in departments" :key="index">
          <v-card flat class="text-xs-center mx-3">
            <v-responsive class>
              <v-container>
                <img :src="department.img" class="card-img-top" alt="....">
              </v-container>
            </v-responsive>
            <v-card-text>
              <v-btn @click="departmentselected(index)">
                <div class="subheading">{{department.name}}</div>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="(product,index) in displayl" :key="index">
          <p>c</p>
          <v-card flat class="text-xs-center mx-3">
            <v-responsive class>
              <v-container>
                <carousel :perPage="1">
                  <slide v-for="(img,index) in product.images" :key="index">
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
              <v-btn @click="buy(product)" class="success">buy</v-btn>
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
import firebase1 from "@firebase/app";
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
      displayl: [],

      activeItem: null,
      modal: null,
      years: [
        { img: "/img/svg/firstyear.png", name: "first" },
        { img: "/img/svg/firstyear.png", name: "Secound" },
        { img: "/img/svg/firstyear.png", name: "Third" },
        { img: "/img/svg/firstyear.png", name: "Final" }
      ],
      departments: [
        { img: "/img/svg/firstyear.png", name: "cs" },
        { img: "/img/svg/firstyear.png", name: "is" },
        { img: "/img/svg/firstyear.png", name: "ec" },
        { img: "/img/svg/firstyear.png", name: "tc" }
      ],
      year: 0,
      display: null,
      department: null,
      sum: 0
    };
  },
  methods: {
    getImage(images) {
      return images[0];
    },
    yearselected(year) {
      this.year = year;
      this.sum = year * 10;
      this.display = true;
    },
    departmentselected(dep) {
      this.year = dep;
      this.sum = this.sum + dep;

      db.collection("products")
        .where("idd", "==", this.sum)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.displayl.push(doc.data());
            console.log(this.sum);
          });
        });
    },
    buy(product) {
      var user = firebase1.auth().currentUser;

      db.collection("sellorders").add({
        bookid: product.id,
        price: product.price,
        status: "ongoing",
        buyer: user.uid,
        date: Date.now()
      });
    }
  },

  firestore() {
    return {
      // products: db.collection("products").where("idd", "==", this.sum)
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

 