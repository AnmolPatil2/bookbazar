<template>
  <div class="dashboard mx-5 grey lighten-4">
    <h1 class="subheading grey--text">Dashboard</h1>

    <v-container color="grey lighten-4" class="my-5">
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="readData()" slot="activator">
            <v-icon small left>folder</v-icon>
            <span class="caption text-lowercase">By project name</span>
          </v-btn>
          <span>Sort by project name</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
            <v-icon small left>person</v-icon>
            <span class="caption text-lowercase">By Person</span>
          </v-btn>
          <span>Sort by project author</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="(order,index) in orders" :key="order.id">
        <v-layout row wrap :class="`pa-3 project ${order.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project title</div>
            <div>{{ order.id }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ order.buyer }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ order.date }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip
                @click="completed(order,index)"
                small
                :class="`${order.status} white--text  caption`"
              >{{ order.status }}</v-chip>
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
      orders: []
    };
  },

  methods: {
    readData() {
      //
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
  created() {
    db.collection("buyorders")
      .orderBy("date")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let doc = change.doc;
            this.orders.push({
              id: doc.id,
              date: doc.data().date,
              buyer: doc.data().buyer,
              status: doc.data().status
            });
            console.log(this.orders);
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