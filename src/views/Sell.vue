<template>
  <div class="products" id="products">
    <!-- Element-specific configuration options can be passed like this -->

    <v-container class v-if="display==null">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="(year,index) in years" :key="index">
          <v-card flat class="text-xs-center mx-3">
            <v-responsive class>
              <v-container>
                <img :src="year.img" class="card-img-top" alt="...." />
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
                <img :src="department.img" class="card-img-top" alt="...." />
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
                    <img :src="img" class="card-img-top" alt="...." />
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
              <v-btn @click="addNew(index,product)" class="success">sell</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- Modal -->
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
            <h5 class="modal-title" id="editLabel">Add Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- main product -->
              <div class="col-md-8">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product Name"
                    v-model="product.name"
                    class="form-control"
                  />
                </div>
              </div>
              <!-- product sidebar -->
              <div class="col-md-4">
                <h4 class="display-6">Product Details</h4>

                <div class="form-group">
                  <label for="product_image">Product Images</label>
                  <input type="file" @change="uploadImage()" class="form-control" />
                </div>

                <div class="form-group d-flex">
                  <div class="p-1" v-for="(image, index) in product.images">
                    <div class="img-wrapp">
                      <img :src="image" alt width="80px" />
                      <span class="delete-img" @click="deleteImage(image,index)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import { VueEditor } from "vue2-editor";
import { Carousel, Slide } from "vue-carousel";
import firebase1 from "@firebase/app";
export default {
  name: "Sell",
  props: {
    msg: String
  },
  components: {
    Carousel,
    Slide,
    VueEditor
  },
  data() {
    return {
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
      sum: 0,
      product: { name: null, images: [] },
      activeItem: null,
      modal: null,
      tag: null
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
    },

    //new functions
    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index, 1);
      image
        .delete()
        .then(function() {
          console.log("image deleted");
        })
        .catch(function(error) {
          // Uh-oh, an error occurred!
          console.log("an error occurred");
        });
    },
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];

        var storageRef = fb
          .storage()
          .ref("products/" + Math.random() + "_" + file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...

            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.product.images.push(downloadURL);
            });
          }
        );
      }
    },
    reset(index) {
      this.product = {
        name: this.displayl[index].name,
        images: []
      };
    },
    addNew(index, product) {
      this.modal = "new";
      this.reset(index);
      $("#product").modal("show");
      var user = firebase1.auth().currentUser;

      db.collection("buyorders").add({
        bookid: product.id,
        price: product.price,
        status: "ongoing",
        buyer: user.uid,
        date: Date.now()
      });

      Toast.fire({
        type: "success",
        title: "Product created successfully"
      });
      $("#product").modal("hide");
    },

    addProduct() {
      var user = firebase1.auth().currentUser;

      db.collection("buyorders").add({
        bookid: product.id,
        price: product.price,
        status: "ongoing",
        buyer: user.uid,
        date: Date.now()
      });

      Toast.fire({
        type: "success",
        title: "Product created successfully"
      });
      $("#product").modal("hide");
    }
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

 