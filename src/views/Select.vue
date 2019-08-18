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
          <h2 class="Title-what-to-do">Select Course</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6 sm6 md4 lg3 v-for="(year,index) in firstyears" :key="index">
          <v-card flat class="text-xs-center p-0 YD">
            <v-responsive class="p-2">
              <img :src="year.img" class="card-img-top" alt="...." />
            </v-responsive>
            <v-card-text>
              <v-btn @click="cycleselected(index+51)">
                <div>
                  <h2>{{year.name}}</h2>
                </div>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-btn flat @click="goback()" class="back white--text">Back</v-btn>
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
      <v-btn flat @click="goback()" class="back white--text">Back</v-btn>
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
          <h2 class="Title-what-to-do">Books Available</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6 sm6 md4 lg3 v-for="(product,index) in displayl" :key="index">
          <v-card flat class="text-xs-center p-0 YD">
            <v-responsive class>
              <img :src="product.images" class="card-img-top bookimages" alt="...." />
            </v-responsive>
            <v-card-text>
              <div class="subheading name">{{product.name}}</div>
              <div class="grey--text">{{product.price}}</div>
            </v-card-text>
            <v-card-actions>
              <div class="pricing">
                <v-btn @click="product_select(product)" color="black" class="px-1 white--text">
                  <i class="fa fa-eye px-1" aria-hidden="true"></i>View
                </v-btn>
                <v-btn @click="addtocart(product)" color="black" class="px-1 white--text">
                  <i class="fa fa-shopping-bag px-1" aria-hidden="true"></i>Cart
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <mini-cart />
    <login />
  </div>
</template>

<script>
import { fb, db } from "../firebase";

import firebase1 from "@firebase/app";
import MiniCart from "@/components/MiniCart.vue";
import Navbar from "@/components/Navbar.vue";
import { constants } from "crypto";
export default {
  name: "Products-list",
  props: {
    msg: String
  },
  components: {
    Navbar,
    MiniCart
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
        { img: "/img/department/CSE.jpg", name: "CSE/ISE" },
        { img: "/img/department/ECE.jpg", name: "ECE/TC" },
        { img: "/img/department/Mech.jpg", name: "MECH" },
        { img: "/img/department/Civil.jpg", name: "Civil" },
        { img: "/img/department/EEE.jpg", name: "EEE" }
      ],
      firstyears: [
        { img: "/img/svg/phy.jpeg", name: "P-Cycle" },
        { img: "/img/svg/chem.jpeg", name: "C-Cycle" }
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
    goback() {},
    addtocart(book1) {
      var item = {
        productName: book1.name,
        productImage: book1.images,
        productPrice: book1.sale,
        productId: book1.id,
        productQuantity: 1
      };
      $("#miniCart").modal("show");
      this.$store.commit("addToCart", item);
    },
    cycleselected(cycle) {
      this.sum = cycle;

      this.sum = this.sum.toString();
      console.log(this.sum);
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
          console.log(this.displayl);
        });
    },
    product_select(product) {
      this.$router.push({
        name: "productCompholder",
        params: { id: product.id }
      });
    },
    yearselected(year) {
      if (year == 0) {
        this.display = "firstyear";
      } else {
        this.year = year;
        this.sum = year * 10;
        this.display = true;
      }
    },
    departmentselected(dep) {
      this.year = dep;
      this.sum = this.sum + dep;
      this.display = "books";
      console.log(this.sum);
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
          console.log(this.displayl);
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
  background: #d3d3d3;

  padding-bottom: 0rem;
}
.card-text1 {
  color: black;
}
.img-responsive img-rounded {
  width: 10px;
  height: 10px;
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
    margin-left: 0px;
  }
  .YD {
    border: 0.5px solid #3085d6;
    margin: 5px;
  }
}
@media screen and (min-width: 600px) {
  .name {
    height: 30px;
  }
  .pricing {
    margin-left: 20px;
  }
  .YD {
    border: 0.5px solid #3085d6;
    margin: 20px;
  }
}
.phychem {
  height: 170px;
}
</style>

 