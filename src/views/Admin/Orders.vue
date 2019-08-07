<template>
  <div class="dashboard mx-5">
    <div class="intro h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <h3>Orders</h3>

          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.</p>
        </div>
        <div class="col-md-6">
          <img src="/img/svg/orders.svg" alt class="img-fluid" />
        </div>
      </div>
    </div>
    <h1 class="subheading grey--text">Your Orders</h1>

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
          <v-flex xs6 md2>
            <div class="caption grey--text">Book Image</div>
            <img :src="order.orderImage" width="80px" class="align-self-center mr-3" alt />
          </v-flex>
          <v-flex xs6 sm3 md2>
            <div class="caption grey--text">Book Title</div>
            <div @click="readData(order)">{{ order.bookName }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Order Time</div>
            <div>{{ order.time }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Price</div>
            <div>{{ order.price }}</div>
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
  props: {},
  data() {
    return {
      orders: [],
      contact: null,
      buyerName: null
    };
  },

  methods: {
    readData(order) {
      db.collection("profiles")
        .where("aui", "==", order.buyer)
        .get()
        .then(snapshot => {
          snapshot.forEach(user => {
            (this.contact = user.data().phone),
              (this.buyerName = user.data().name),
              console.log(this.contact);
            console.log(this.buyerName);
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
  mounted() {},
  created() {
    db.collection("sellorders")
      .orderBy("date")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let doc = change.doc;
            this.orders.push({
              id: doc.id,
              bookName: doc.data().bookName,
              date: doc.data().date,
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
</style>