
<template>
  <div class="chekout">
    <Navbar></Navbar>
    <v-container>
      <div class="col-md-5 order-details mt-4">
        <div class="section-title text-center">
          <h3 class="title">Your Order</h3>
        </div>
        <div class="order-summary">
          <div class="order-col">
            <div>
              <strong>PRODUCT</strong>
            </div>
            <div>
              <strong>TOTAL</strong>
            </div>
          </div>

          <div class="order-products">
            <div class="order-col">
              <ul>
                <li v-for="item in this.$store.state.cart" class="media">
                  <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt />
                  <div class="media-body">
                    <h5 class="mt-0">{{item.productName}}</h5>

                    <h5 class="mt-0 right">{{item.productPrice }}</h5>
                    <v-chip
                      small
                      close
                      class="chips"
                      color="red float-right"
                      text-color="white"
                      @click="$store.commit('removeFromCart',item)"
                    >delete</v-chip>

                    <p class="mt-0">Quantity : {{item.productQuantity }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="order-col">
            <div>Shiping</div>
            <div>
              <strong>FREE</strong>
            </div>
          </div>
          <div class="order-col">
            <div>
              <strong>TOTAL</strong>
            </div>
            <div>
              <strong class="order-total">Rs: {{this.sum}}</strong>
            </div>
          </div>
        </div>
        <div class="payment-method">
          <div class="input-radio">
            <input type="radio" name="payment" id="payment-1" />
            <label for="payment-1">
              <span></span>
              Contact through Whatsapp
            </label>
            <div class="caption">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
          <div class="input-radio">
            <input type="radio" name="payment" id="payment-2" />
            <label for="payment-2">
              <span></span>
              Cheque Payment
            </label>
            <div class="caption">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
          <div class="input-radio">
            <input type="radio" name="payment" id="payment-3" />
            <label for="payment-3">
              <span></span>
              Paypal System
            </label>
            <div class="caption">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
        <div class="input-checkbox">
          <input type="checkbox" id="terms" />
          <label for="terms">
            <span></span>
            I've read and accept the
            <a href="#">terms & conditions</a>
          </label>
        </div>
        <p class="red--text">{{feedback}}</p>
        <a href="#" @click="buy(product)" class="primary-btn order-submit">Place order</a>
      </div>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import firebase1 from "@firebase/app";
import { fb, db } from "../firebase";
export default {
  data() {
    return {
      complete: false,
      feedback: null,
      sum: 0
    };
  },
  components: { Navbar },
  methods: {
    buy(product) {
      if (document.getElementById("terms").checked) {
        // it is checked. Do something

        Swal.fire({
          title: "Confirm Order",
          text: "You are one Click away",
          type: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Confirm"
        }).then(result => {
          if (result.value) {
            Toast.fire({
              type: "success",
              title: "Order Placed"
            });
            this.$router.push({
              name: "orders1"
            });
          }
        });
      } else {
        // it isn't checked. Do something else
        var user = firebase1.auth().currentUser;

        db.collection("sellorders").add({
          bookid: product.id,
          price: product.price,
          status: "ongoing",
          buyer: user.uid,
          date: Date.now()
        });
        Toast.fire({
          type: "success",
          title: "Order Placed"
        });
        this.feedback = "Please select all the Boxes";
      }
    }
  },
  created() {
    this.$store.state.cart.forEach(element => {
      element.productPrice = parseInt(element.productPrice);

      this.sum = element.productPrice + this.sum;
    });
  }
};
</script>



<style scoped>
/**
 * The CSS shown here will not be introduced in the Quickstart guide, but shows
 * how you can use CSS to style your Element's container.
 */

.chekout {
  margin-top: 100px;
}
.chips {
  align-content: right;
}
.order-details {
  background: white;
}
</style>