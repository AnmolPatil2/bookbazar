<template>
  <div class="dashboard mx-5">
    <div class="intro h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <h3>Orders</h3>

          <p>Your Joy of books are on the way</p>
          <div class="alert alert-info">
            <a href="https://wa.me/918088363293" target="_blank">For cancellation Contact us.</a>
          </div>
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
          <span>Sort by Name</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="(order,index) in orders" :key="order.id">
        <v-layout row wrap :class="`pa-3 project ${order.status}`">
          <v-flex xs6 md1 lg1>
            <div class="caption grey--text">Book Image</div>
            <img :src="order.orderImage" width="80px" class="align-self-center mr-3" alt />
          </v-flex>
          <v-flex xs5 sm3 md2 lg2 class="pl-2">
            <div class="caption grey--text">Book Title</div>
            <div>{{ order.bookName }}</div>
          </v-flex>
          <v-flex xs6 sm5 md3 lg2>
            <div class="caption grey--text">Order Time</div>
            <div>{{ order.time }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2 lg2>
            <div class="caption grey--text pl-2">Price</div>
            <div>{{ order.price }}</div>
          </v-flex>
          <v-flex xs4 sm4 md2 lg2>
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
import firebase1 from "@firebase/app";
import { fb, db } from "../../firebase";
import moment from "moment";
export default {
  data() {
    return {
      orders: []
    };
  },

  created() {
    var user = firebase1.auth().currentUser;
    let ref = db
      .collection("buyorders")

      .where("buyer", "==", user.uid)

      .get()

      .then(snapshot => {
        snapshot.forEach(doc => {
          this.orders.push({
            orderImage: doc.data().image,
            bookName: doc.data().bookName,
            status: doc.data().status,
            time: moment(doc.data().date).format("ll"),
            price: doc.data().price
            //id: doc.date().bookid
          });
        });
      });
  },
  methods: {
    sortBy(prop) {
      console.log(prop);
      this.orders.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  }
};
</script>

<style scoped>
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