<template>
  <div class="products white" id="products">
    <!-- Element-specific configuration options can be passed like this -->
    <Navbar />

    <v-container class="whole-cont" v-if="display==null">
      <v-layout>
        <v-flex>
          <h2 class="Title-what-to-do">Select year</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6 sm6 md4 lg3 v-for="(year,index) in years" :key="index">
          <v-card flat class="text-xs-center p-0 YD">
            <v-responsive class="p-2">
              <img :src="year.img" class="card-img-top bookimages" alt="...." />
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

    <v-container class="twhole-cont" v-if="display==true">
      <v-layout>
        <v-flex>
          <h2 class="Title-what-to-do">Select department</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6 sm6 md4 lg3 v-for="(department,index) in departments" :key="index">
          <v-card flat class="text-xs-center YD p-0">
            <v-responsive class="p-2">
              <img :src="department.img" class="card-img-top bookimages" alt="...." />
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
    <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
      v-if="display=='books'"
      class="loaders"
    ></v-progress-circular>
    <v-container class="twhole-cont" v-if="display=='displaybooks'">
      <v-layout>
        <v-flex>
          <h2 class="Title-what-to-do">Books Avalable</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6 sm6 md4 lg3 v-for="(product,index) in displayl" :key="index">
          <v-card flat class="text-xs-center p-0 YD">
            <v-responsive class>
              <carousel :perPage="1">
                <slide v-for="(img,index) in product.images" :key="index">
                  <img :src="img" class="card-img-top bookimages" alt="...." />
                </slide>
              </carousel>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{product.name}}</div>
              <div class="grey--text">{{product.price}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
                <i class="fa fa-shopping-cart"></i>

                <add-to-cart
                  :image="getImage(product.images)"
                  :p-id="product.id"
                  :price="product.price"
                  :name="product.name"
                ></add-to-cart>
              </v-btn>
              <v-btn @click="buy(product)" class="success">sell</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <mini-cart />
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import { Carousel, Slide } from "vue-carousel";
import firebase1 from "@firebase/app";
import MiniCart from "@/components/MiniCart.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Products-list",
  props: {
    msg: String
  },
  components: {
    Carousel,
    Navbar,
    MiniCart,
    Slide
  },
  data() {
    return {
      products: [],
      displayl: [],

      activeItem: null,
      modal: null,
      years: [
        { img: "/img/svg/1st.jpg", name: "first" },
        { img: "/img/svg/2nd.jpg", name: "Secound" },
        { img: "/img/svg/3rd.jpg", name: "Third" },
        { img: "/img/svg/4th.jpg", name: "Fouth" }
      ],
      departments: [
        { img: "/img/svg/cs.jpg", name: "cs" },
        { img: "/img/svg/ec.jpg", name: "ec" },
        { img: "/img/svg/me.jpg", name: "me" },
        { img: "/img/svg/civil.jpg", name: "civil" }
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
      this.display = "books";

      db.collection("products")
        .where("idd", "==", this.sum)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.displayl.push(doc.data());
          });
        })
        .then(() => {
          this.display = "displaybooks";
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
#products {
  margin-top: 0rem;
  background: grey;

  padding-bottom: 0rem;
}
.card-text1 {
  color: black;
}
.img-responsive img-rounded {
  width: 10px;
  height: 10px;
}
.YD {
  border: 1px solid red;
}
.whole-cont {
  margin-top: 50px;
}
.twhole-cont {
  margin-top: 50px;
}
.Title-what-to-do {
  text-align: center;
}
.loaders {
  align-content: center;
  margin: 250px 50%;
}
.bookimages {
  height: 257px;
  width: 247px;
}
</style>

 