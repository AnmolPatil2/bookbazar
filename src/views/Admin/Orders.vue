<template>
  <div class="dashboard mx-5">
    <div class="intro h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <h3>Orders</h3>

          <p>Your Joy of books are on the way</p>
        </div>
        <div class="col-md-6">
          <img src="/img/svg/orders.svg" alt class="img-fluid" />
        </div>
      </div>
    </div>
    <h1 class="subheading grey--text">Your Orders</h1>

    <v-container class="my-5">
      <v-card flat v-for="(order,index) in orders" :key="order.id">
        <v-layout row wrap :class="`pa-3 project ${order.status}`">
          <v-flex xs6 sm3 md2>
            <div class="caption grey--text">Name</div>
            <div>{{ order.buyername }}</div>
          </v-flex>
          <v-flex xs6 sm3 md2>
            <div class="caption grey--text">Book Title</div>
            <div>{{ order.bookName }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Order Time</div>
            <div>{{ order.date }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Price</div>
            <div>{{order.price }}</div>
          </v-flex>
          <v-layout row wrap>
            <v-flex xs6 sm4 md4>
              <div class="caption grey--text">contact</div>
              <v-btn @click="readData(order)">Get contact</v-btn>
              <v-btn @click="completed(order)">Completed</v-btn>
            </v-flex>

            <v-flex xs6 sm4 md4>
              <div class="caption grey--text">delete</div>
              <div>
                <v-btn @click="deleteorder(order)">deleteorder</v-btn>
              </div>
            </v-flex>

            <v-flex xs6 sm4 md4>
              <div class="caption grey--text" @click="cancelorder(order)">
                cancel
                <div>
                  <v-btn>cancel order</v-btn>
                </div>
              </div>
            </v-flex>
          </v-layout>

          <v-flex xs4 sm4 md4>
            <div class="right">
              <v-chip small :class="`${order.status} white--text  caption`">{{ order.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
    <v-btn @click="getlist()">Get list</v-btn>
    <div v-for="(name,index) in namelist" :key="index">
      <h2 v-if="index%2==0">{{index-index/2 +1}}</h2>
      <p>{{name}}</p>
      <div class="bod"></div>
    </div>
    <h1>total price for this batch is {{sum}}</h1>
    <h1>Number of books for this batch is {{count}}</h1>
    <v-btn @click="forus()">For us</v-btn>
    <div v-for="(name,index) in namelist1" :key="index">
      <p v-if="index%3==0" class="bod"></p>
      <p>{{name}}</p>
    </div>

    <v-btn v-if="namelist!=null" @click="orderlistsent()">Order sent</v-btn>
  </div>
</template>


<script>
import { VueEditor } from "vue2-editor";
import { fb, db } from "../../firebase";
import moment from "moment";
export default {
  name: "Products",
  components: {
    VueEditor,
    moment
  },
  props: {},
  data() {
    return {
      orders: [],
      contact: null,
      buyerName: null,
      idddisplay: null,
      email: null,
      namelist: [],
      namelist1: [],
      sum: null,
      count: null
    };
  },

  methods: {
    changeidd(idd) {
      this.idddisplay = idd;
    },
    completed(order) {
      Swal.fire({
        title: "Are you sure",
        text:
          "make sure you will that guys has the list then only click confirm and it cant be undone",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm"
      }).then(result => {
        if (result.value) {
          if (order.status == "contacted") {
            db.collection("sellorders")
              .doc(order.id)
              .update({
                status: "Completed"
              });
          }
        }
      });
    },
    orderlistsent() {
      Swal.fire({
        title: "Are you sure",
        text:
          "make sure you will that guys has the list then only click confirm and it cant be undone",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm"
      }).then(result => {
        if (result.value) {
          this.orders.forEach(order => {
            if (order.status == "ongoing" || order.status == "Informed") {
              db.collection("sellorders")
                .doc(order.id)
                .update({
                  status: "orderplaced"
                })
                .then(() => {
                  console.log(order.id);
                });
            }
          });
        }
      });
    },
    cancelorder(order) {
      Swal.fire({
        title: "Are you sure",
        text:
          "make sure you will that guys has the list then only click confirm and it cant be undone",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm"
      }).then(result => {
        if (result.value) {
          db.collection("sellorders")
            .doc(order.id)
            .update({
              status: "cancelled"
            });
        }
      });
    },
    forus() {
      this.namelist1 = [];
      this.sum = 0;
      this.count = 0;
      this.orders.forEach(order => {
        if (order.status == "ongoing" || order.status == "Informed") {
          this.namelist1.push(order.buyername);
          this.namelist1.push(order.bookName);
          this.namelist1.push(order.price);
          this.count += 1;
          this.sum = order.price + this.sum;
        }
      });
    },
    getlist() {
      this.namelist = [];
      this.sum = 0;
      this.count = 0;
      this.orders.forEach(order => {
        if (order.status == "ongoing" || order.status == "Informed") {
          db.collection("products")
            .doc(order.bookid)
            .get()
            .then(snapshot => {
              this.namelist.push(snapshot.data().name);
              this.namelist.push(snapshot.data().author);
              console.log(snapshot.data());
            });
          this.count += 1;
          this.sum = order.price + this.sum;
        }
      });
    },
    deleteorder(order) {
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
          db.collection("sellorders")
            .doc(order.id)
            .delete()
            .then(function() {
              console.log("Document successfully deleted!");
            })
            .catch(function(error) {
              console.error("Error removing document: ", error);
            });
        }
      });
    },
    readData(order) {
      db.collection("profiles")
        .where("aui", "==", order.buyer)
        .get()
        .then(snapshot => {
          snapshot.forEach(user => {
            (this.contact = user.data().phone),
              (this.buyerName = user.data().name),
              (this.email = user.data().email);
          });
        })
        .then(() => {
          Swal.fire({
            title: this.buyerName,
            text: this.contact + "  or  email:   " + this.email,
            type: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm"
          }).then(result => {
            if (result.value) {
              {
                db.collection("sellorders")
                  .doc(order.id)
                  .update({
                    status: "Informed"
                  });
              }
            }
          });
        });
    },
    completed(order, key) {
      db.collection("sellorders")
        .doc(order.id)
        .update({
          status: "completed"
        })
        .then(() => {
          this.orders[key].status = "completed";
        });
    },
    addProduct() {
      this.$firestore.products.add(this.product);

      Toast.fire({
        type: "success",
        title: "Product created successfully"
      });
      $("#product").modal("hide");
    }
  },
  //computed: {
  //   whichordertodisplay: function() {
  //    return this.orders.filter(product => {
  //    var name = String(product.idd);
  //
  //     return name.match(this.idddisplay);
  //    });
  //  }
  // },
  mounted() {},
  created() {
    db.collection("sellorders")
      .orderBy("username")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let doc = change.doc;
            if (
              doc.data().status != "completed" &&
              doc.data().status != "cancelled"
            ) {
              this.orders.push({
                bookid: doc.data().bookid,
                id: doc.id,
                bookName: doc.data().bookName,
                date: moment(doc.data().date).format("llll"),
                buyer: doc.data().buyer,
                status: doc.data().status,
                quantity: doc.data().orderQuantity,
                price: doc.data().price,
                buyername: doc.data().username,
                constact: doc.data().userphone
              });
            }
          }
        });
      });
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
.project.orderplaced {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid #ffaa2c;
}
.project.Informed {
  border-left: 4px solid #f83e70;
}
.project.completed {
  border-left: 4px solid red;
}
.v-chip.orderplaced {
  background: #3cd1c2;
}
.v-chip.ongoing {
  background: #ffaa2c;
}
.v-chip.Informed {
  background: #f83e70;
}
.v-chip.completed {
  background: red;
}
.bod {
  border: 1px solid #ffaa2c;
}
</style>