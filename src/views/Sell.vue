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
              <v-btn flat color="sellbtn" @click=" addNew(index, product) ">
                <i class="fas fa-wallet"></i>Sell Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- Modal-->
    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">You want to sell</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- main product -->
              <div class="col-md-8">
                <div class="form-group">
                  <p>Name: {{product.name}}</p>

                  <p class="red--text">
                    For:
                    <i class="fa fa-inr" aria-hidden="true"></i>
                    {{product.price}}
                  </p>
                </div>
              </div>
              <!-- product sidebar -->
              <div class="col-md-4">
                <h5 class="display-6">Click a pic of the book</h5>

                <div class="form-group">
                  <label for="product_image">and Upload</label>
                  <input type="file" @change="uploadImage" class="form-control" />
                </div>

                <div class="form-group d-flex">
                  <div class="p-1" v-for="(image, index) in product.images">
                    <div class="img-wrapp">
                      <img :src="image" alt width="80px" />
                      <span class="delete-img" @click="deleteImage(image,index)">X</span>
                    </div>
                  </div>
                </div>
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="purple"
                  indeterminate
                  v-if="!uploaded"
                  class
                ></v-progress-circular>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary red" data-dismiss="modal">Cancel</button>
            <button
              type="button"
              class="btn btn-primary"
              v-if="modal == 'new'"
              @click=" addProductsell(product)"
            >Sell Your Book</button>
          </div>
        </div>
      </div>
    </div>
    <MiniCart />
    <login />
  </div>
</template>

<script>
import { BreedingRhombusSpinner } from "epic-spinners";
import { AtomSpinner } from "epic-spinners";
import { fb, db } from "../firebase";
import { VueEditor } from "vue2-editor";
import { Carousel, Slide } from "vue-carousel";
import Navbar from "@/components/Navbar.vue";
import MiniCart from "@/components/MiniCart.vue";
import PopUp from "@/components/Popup.vue";
import firebase1 from "@firebase/app";
export default {
  name: "Sell",
  props: {
    msg: String
  },
  components: {
    Carousel,
    Slide,
    Navbar,
    MiniCart,
    AtomSpinner,
    PopUp,

    VueEditor
  },
  data() {
    return {
      displayl: [],
      loading: true,
      uploaded: true,
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
      firstyears: [
        { img: "/img/svg/phy.jpeg", name: "P-Cycle" },
        { img: "/img/svg/chem.jpeg", name: "C-Cycle" }
      ],

      year: 0,
      display: null,
      department: null,
      sum: 0,
      product: { name: null, images: [], sale: null },
      activeItem: null,
      modal: null,
      tag: null
    };
  },

  methods: {
    product_select(product) {
      this.$router.push({
        name: "productCompholder",
        params: { id: product.id }
      });
    },
    priceconvet(productsale) {
      let sale = productsale.toString();
      console.log(this.sale);
      return productsale.toString();
    },
    getImage(images) {
      return images[0];
    },
    cycleselected(cycle) {
      this.sum = cycle + 1;
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
        });
    },

    //new functions
    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index, 1);
      image
        .delete()
        .then(function() {})
        .catch(function(error) {
          // Uh-oh, an error occurred!
          console.log("an error occurred");
        });
    },

    uploadImage(e) {
      this.uploaded = false;
      if (e.target.files[0]) {
        let file = e.target.files[0];

        var storageRef = fb
          .storage()
          .ref("sell/" + Math.random() + "_" + file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            // Handle unsuccessful uploads
          },
          () => {
            console.log(this.product.images);
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...

            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadURL => {
                this.product.images.push(downloadURL);
              })
              .then(() => {
                this.uploaded = true;
              });
          }
        );
      }
    },
    reset(index) {
      this.product = {
        name: this.displayl[index].name,
        images: [],
        price: this.displayl[index].sale
      };
    },
    addNew(index, product) {
      var user = firebase1.auth().currentUser;
      if (user == null) {
        Swal.fire({
          title: "You must SignUp",
          text: "Click on Navigation for a fun SignUp",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, SignUp"
        }).then(result => {
          if (result.value) {
            $("#login").modal("show");
          }
        });
      } else {
        this.modal = "new";
        this.reset(index);
        $("#product").modal("show");
      }
    },

    addProductsell(product) {
      if (product.images.length == 0) {
        alert("upload image");
      } else {
        Swal.fire({
          title: "Sell your book",
          text: "Confirm and we will take care of the rest",
          type: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Confirm"
        }).then(result => {
          if (result.value) {
            var user = firebase1.auth().currentUser;
            console.log(product.name);
            db.collection("buyorders")
              .add({
                bookid: product.name,
                price: product.price,
                status: "ongoing",
                buyer: user.uid,
                date: Date.now(),
                image: product.images
              })

              .then(() => {
                Toast.fire({
                  type: "success",
                  title: "Product created successfully"
                });
                $("#product").modal("hide");
              });
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
.name {
  height: 60px;
}
.phychem {
  height: 170px;
}
</style>

 