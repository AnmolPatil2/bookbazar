
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

                    <h5 class="mt-0 right">
                      <i class="fa fa-inr" aria-hidden="true"></i>
                      {{item.productPrice }}
                    </h5>
                    <v-chip
                      class="ma-2"
                      @click="$store.commit('removeFromCart',item);updatesum()"
                      color="red right"
                      text-color="white"
                    >
                      <i class="fa fa-trash px-2" aria-hidden="true "></i>Remove
                    </v-chip>

                    <p class="mt-0">Quantity : {{item.productQuantity }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="order-col">
            <div>Shipping</div>
            <div>
              <strong>FREE</strong>
            </div>
          </div>

          <div class="order-col">
            <div>
              <strong>TOTAL</strong>
            </div>
            <div>
              <strong class="order-total">
                <i class="fa fa-inr" aria-hidden="true"></i>
                {{this.sum}}
              </strong>
            </div>
          </div>
        </div>
        <p class="blue--text">
          Total savings compared to Avenue road prices is
          
          <div>
              <strong class="order-total red--text" >
                
                  <i class="fa fa-inr" aria-hidden="true"></i>
          {{saving((this.sum))}}
              </strong>
            </div>
        
        </p>
        <div class="payment-method">
          <div class="input-radio">
            <input type="radio" name="payment" id="payment-1" />
            <label for="payment-1">
              <span></span>
              Contact through Whatsapp
            </label>
            <div class="caption">
              <p>A bookoo community member will get in touch with you and keep you informed on your order status.</p>
            </div>
          </div>
        </div>
        <div class="input-checkbox">
          <input type="checkbox" id="terms" />

          <label for="terms">
            <span></span>
            I've read and accept the
            <router-link :to="{ name: 'tandc'}" target="_blank">terms & conditions</router-link>
          </label>
        </div>
        <p class="red--text">{{feedback}}</p>
        <a href="#" @click="buy()" class="primary-btn order-submit">Place order</a>
      </div>
    </v-container>
    <login />
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
      sum: null,
      phone: null
    };
  },
  components: { Navbar },
  methods: {
    updatesum() {
      this.sum = 0;
      this.$store.state.cart.forEach(element => {
        element.productPrice = parseInt(element.productPrice);

        this.sum = element.productPrice * element.productQuantity + this.sum;
      });
    },
    buy() {
      var user = firebase1.auth().currentUser;
      if (user == null) {
        Swal.fire({
          title: "You must SignUp",
          text: "SignUp to join our Community!",
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
        if (this.phone == null) {
          Swal.fire({
            title: "Phone number not available",
            text: "Please add phone number to checkout",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Enter number here"
          }).then(result => {
            if (result.value) {
              this.$router.push({
                name: "profile1"
              });
            }
          });
        } else {
          if (this.$store.state.cart.length != 0) {
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
                console.log("result.value" + result.value);
                if (result.value == true) {
                  Toast.fire({
                    type: "success",
                    title: "Order Placed"
                  });
                  this.$store.state.cart.forEach(order => {
                    db.collection("sellorders").add({
                      bookid: order.productId,
                      bookName: order.productName,
                      price: order.productPrice,
                      status: "ongoing",
                      buyer: user.uid,
                      date: Date.now(),
                      orderQuantity: order.productQuantity,
                      orderImage: order.productImage,
                      userphone:this.phone,
                      username:this.username
                    });
                  });

                  this.$store.state.cart.forEach(element => {
                    console.log(element);
                    this.$store.commit("removeFromCart", element);
                  });
                  this.$router.push({
                    name: "orders1"
                  });
                }
              });
            } else {
              // it isn't checked. Do something else

              this.feedback = "Please select all the Boxes";
            }
          } else {
            this.feedback = "Your cart is empty";
          }
        }
      }
    },
    saving(sum) {
      var saving =parseInt(this.sum * 0.23,10);
      return saving
    }
  },
  mounted() {
   

    var user = firebase1.auth().currentUser;
   
    let ref = db.collection("profiles")
   
      .where("aui", "==", user.uid)
      .get()
      .then(snapshot => {
       
        snapshot.forEach(doc => {
          
          this.phone = doc.data().phone;
          this.username=doc.id;
        });
       
      });
    this.sum = 0;
    this.$store.state.cart.forEach(element => {
      element.productPrice = parseInt(element.productPrice);

      this.sum = element.productPrice * element.productQuantity + this.sum;
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