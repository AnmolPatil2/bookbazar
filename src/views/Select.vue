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
              <img :src="year.img" class="card-img-top" alt="...." />
            </v-responsive>
            <v-card-text>
              <v-btn class="subheading" @click="yearselected(index)">
                <div>{{year.name}}</div>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="whole-cont" v-if="display=='firstyear'">
      <v-layout>
        <v-flex>
          <h2 class="Title-what-to-do">Select year</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6 sm6 md4 lg3 v-for="(year,index) in firstyears" :key="index">
          <v-card flat class="text-xs-center p-0 YD">
            <v-responsive class="p-2">
              <img :src="year.img" class="card-img-top" alt="...." />
            </v-responsive>
            <v-card-text>
              <v-btn @click="cycleselected(index)">
                <div>
                  <h2>{{year.name}}</h2>
                </div>
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
              <img :src="department.img" class="card-img-top phychem" alt="...." />
            </v-responsive>
            <v-card-text>
              <v-btn @click="departmentselected(index)">
                <div>
                  <h2>{{department.name}}</h2>
                </div>
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
            <v-responsive class @click="product_select(product)">
              <img :src="product.images" class="card-img-top bookimages" alt="...." />
            </v-responsive>
            <v-card-text>
              <div class="subheading name">{{product.name}}</div>
              <div class="grey--text">{{product.price}}</div>
            </v-card-text>
            <v-card-actions>
              <div class="pricing text-xs-center">
                <v-btn @click="ComboOrder()" color="black" class="px-2 white--text">
                  <i class="fa fa-shopping-bag px-1" aria-hidden="true"></i>Add to cart
                </v-btn>
              </div>
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
        { img: "/img/svg/1st.jpg", name: "First" },
        { img: "/img/svg/2nd.jpg", name: "Second" },
        { img: "/img/svg/3rd.jpg", name: "Third" },
        { img: "/img/svg/4th.jpg", name: "Fourth" }
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
    cycleselected(cycle) {
      this.sum = cycle + 1;
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
.pricing {
  margin-left: 60px;
}
.sellbtn {
  background: red;
}
.subheading {
  color: #88bdbc;
}
.products {
  max-height: 300px;
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
.YD {
  border: 0.5px solid #3085d6;
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
  height: 167px;
  width: 157px;
}

.card-body {
}
section {
}
@media screen and (max-width: 600px) {
  .name {
    height: 60px;
  }
  .pricing {
    margin-left: 10px;
  }
}
@media screen and (min-width: 600px) {
  .name {
    height: 30px;
  }
  .pricing {
    margin-left: 60px;
  }
}
.phychem {
  height: 170px;
}
</style>

 