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
    <div class="table-responsive">
      <table class="table">
        <tbody>
             <tr>
            <td @click="changeidd(52)">c-cycle</td>
            <td @click="changeidd(51)">p-cycle</td>
          </tr>

            
          <tr>
            <td @click="changeidd(20)">cs 5th sem</td>
            <td @click="changeidd(21)">ec 5th sem</td>
            <td @click="changeidd(22)">mec 5th sem</td>
          </td>
          <tr>
            <td @click="changeidd(23)">civil 5th sem</td>
            <td @click="changeidd(24)">eee 5th sem</td>

            <td @click="changeidd(25)">tc 5th sem</td>
          </tr>
          <tr>
            <td @click="changeidd(10)">cs 3th sem</td>
            <td @click="changeidd(11)">ec 3th sem</td>
            <td @click="changeidd(12)">mech 3th sem</td>
          </tr>
          <tr>
            <td @click="changeidd(13)">civil 3th sem</td>
            <td @click="changeidd(14)">eee 3th sem</td>
            <td @click="changeidd(15)">tc 3th sem</td>
          </tr>
        </tbody>
      </table>
    </div>
    <v-container class="my-5">
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('time')" slot="activator">
            <v-icon small left>folder</v-icon>
            <span class="caption text-lowercase">By Date</span>
          </v-btn>
          <span>Sort by Date you Ordered</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('bookName')" slot="activator">
            <v-icon small left>person</v-icon>
            <span class="caption text-lowercase">By Title</span>
          </v-btn>
          <span>Sort by author</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="(order,index) in orders" :key="order.id">
        <v-layout row wrap :class="`pa-3 project ${order.status}`">
          <v-flex xs6 sm3 md2>
            <div class="caption grey--text">Book Title</div>
            <div>{{ order.bookName }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Order Time</div>
            <div>{{ order.date}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">contact</div>
            <v-btn @click="readData(order)">Get contact</v-btn>
            <v-btn @click="completed(order)">Completed</v-btn>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Price</div>
            <div>{{order.price }}</div>
          </v-flex>
          <v-flex xs4 sm4 md2>
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
      <p>{{index}} {{name}}</p>
    </div>
    <h1>total price for this batch is {{sum}}</h1>
    <h1>Number of books for this batch is {{count}}</h1>
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
      idddisplay: null,
      buyerName: null,
      email: null,
      namelist: [],
      sum: null,
      count: null
    };
  },
  //computed: {
   // whichordertodisplay: function() {
     // console.log(this.orders)
    //  return this.orders.filter(product => {
     //   var name = String(product.idd);
//console.log(name)
      //  return name.match(this.idddisplay);
     // });
   // }
  //},
  methods: {
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
    changeidd(idd) {
      this.idddisplay = idd;
      console.log(this.idddisplay)
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
            if (order.status == "Informed") {
              db.collection("buyorders")
                .doc(order.id)
                .update({
                  status: "orderplaced"
                });
            }
          });
        }
      });
    },
    getlist() {
      this.namelist = [];
      this.sum = 0;
      this.count = 0;
      this.orders.forEach(order => {
        if (order.status == "ongoing") {
          this.count += 1;
          this.sum = order.price + this.sum;
          this.namelist.push(order.bookName);
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
              if (order.status == "orderplaced") {
                db.collection("buyorders")
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
      db.collection("buyorders")
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
  mounted() {},
  created() {
    db.collection("buyorders")
      .orderBy("date")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let doc = change.doc;
            this.orders.push({
              bookid: doc.data().bookid,
              id: doc.id,
              bookName: doc.data().bookName,
              date: moment(doc.data().date).format("llll"),
              buyer: doc.data().buyer,
              status: doc.data().status,
              quantity: doc.data().orderQuantity,
              price: doc.data().price
            });
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
.project.pending {
  border-left: 4px solid #ffaa2c;
}
.project.contacted {
  border-left: 4px solid #f83e70;
}
.project.contacted {
  border-left: 4px solid red;
}
.v-chip.orderplaced {
  background: #3cd1c2;
}
.v-chip.pending {
  background: #ffaa2c;
}
.v-chip.contacted {
  background: #f83e70;
}
.v-chip.contacted {
  background: red;
}
</style>