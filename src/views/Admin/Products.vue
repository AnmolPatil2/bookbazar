<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products Page</h3>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.</p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/products.svg" alt class="img-fluid" />
          </div>
        </div>
      </div>

      <hr />

      <div class="product-test">
        <h3 class="d-inline-block">Products list</h3>
        <button @click="addNew" class="btn btn-primary float-right">Add Product</button>
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <tr>
                <td @click="changeidd(52)">c-cycle</td>
                <td @click="changeidd(51)">p-cycle</td>
              </tr>
              <tr>
                <td @click="changeidd(20)">cs 5th sem</td>

                <td @click="changeidd(22)">mec 5th sem</td>
                <td @click="changeidd(21)">ec 5th sem</td>
              </tr>
              <tr>
                <td @click="changeidd(24)">eee 5th sem</td>

                <td @click="changeidd(23)">civil 5th sem</td>
                <td @click="changeidd(25)">tc 5th sem</td>
              </tr>
              <tr>
                <td @click="changeidd(10)">cs 3th sem</td>
                <td @click="changeidd(11)">ec 3th sem</td>
                <td @click="changeidd(12)">mech 3th sem</td>
              </tr>
              <tr>
                <td @click="changeidd(13)">civil 3th sem</td>
                <td @click="changeidd(11)">tc 3th sem</td>
                <td @click="changeidd(14)">eee 3th sem</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Modify</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="product in whichbookstodisplay">
                <td>{{product.name}}</td>

                <td>{{product.sale}}</td>

                <td>
                  <button class="btn btn-primary" @click="editProduct(product)">Edit</button>
                  <button class="btn btn-danger" @click="deleteProduct(product)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

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
            <h5 class="modal-title" id="editLabel">Edit Product</h5>
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

                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Importance"
                    v-model="product.importance"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input type="text" placeholder="Type" v-model="product.type" class="form-control" />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Branch"
                    v-model="product.branch"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input type="text" placeholder="Year" v-model="product.year" class="form-control" />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Rating"
                    v-model="product.rating"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input type="text" placeholder="Hand" v-model="product.hand" class="form-control" />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="publication"
                    v-model="product.publication"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="edition"
                    v-model="product.edition"
                    class="form-control"
                  />
                </div>
              </div>
              <!-- product sidebar -->
              <div class="col-md-4">
                <h4 class="display-6">Product Details</h4>
                <hr />

                <div class="form-group">
                  <input type="text" placeholder="idd" v-model="product.idd" class="form-control" />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="mrp"
                    v-model="product.fullprice"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="our price"
                    v-model="product.sale"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    placeholder="author"
                    v-model="product.author"
                    class="form-control"
                  />
                </div>

                <div class="form-group"></div>

                <div class="form-group">
                  <label for="product_image">Product Images</label>
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
                  class="loaders"
                ></v-progress-circular>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              @click="addProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'new'"
            >Save changes</button>
            <button
              @click="updateProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'edit'"
            >Apply changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { fb, db } from "../../firebase";
export default {
  name: "Products",
  components: {
    VueEditor
  },
  props: {
    msg: String
  },
  data() {
    return {
      products: [],
      uploaded: true,
      idddisplay: 23,
      product: {
        name: null,
        type: null,
        rating: 0,
        hand: null,
        year: null,
        branch: null,
        edition: null,
        publication: null,

        fullprice: 0,
        review: null,
        images: [],
        author: null,
        idd: 0,
        sale: 0,
        importance: 0
      },
      activeItem: null,
      modal: null,
      tag: null
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index, 1);
      image
        .delete()
        .then(function() {})
        .catch(function(error) {
          // Uh-oh, an error occurred!
        });
    },
    changeidd(id) {
      this.idddisplay = id;
      console.log(this.idddisplay);
    },
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        this.uploaded = false;
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
    reset() {
      this.product = {
        name: null,
        type: null,
        rating: null,
        year: null,
        branch: null,
        edition: null,
        publication: null,
        hand: null,

        fullprice: null,
        review: null,
        images: [],
        author: null,
        idd: null,
        sale: null,
        importance: null
      };
    },
    addNew() {
      this.modal = "new";
      this.reset();
      $("#product").modal("show");
    },
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      Toast.fire({
        type: "success",
        title: "Updated  successfully"
      });
      $("#product").modal("hide");
    },
    editProduct(product) {
      this.modal = "edit";
      this.product = product;
      $("#product").modal("show");
    },
    deleteProduct(doc) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.products.doc(doc.id).delete();
          Toast.fire({
            type: "success",
            title: "Deleted  successfully"
          });
        }
      });
    },
    readData() {},
    addProduct() {
      this.product.fullprice = parseInt(this.product.fullprice, 10);
      this.product.sale = parseInt(this.product.sale, 10);
      this.product.idd = parseInt(this.product.idd, 10);

      this.product.rating = parseInt(this.product.rating, 10);
      this.$firestore.products.add(this.product);

      Toast.fire({
        type: "success",
        title: "Product created successfully"
      });
      $("#product").modal("hide");
    }
  },
  computed: {
    whichbookstodisplay: function() {
      return this.products.filter(product => {
        var name = String(product.idd);

        return name.match(this.idddisplay);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-wrapp {
  position: relative;
}
.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}
.img-wrapp span.delete-img:hover {
  cursor: pointer;
}
</style>