
<template>
  <div class="chekout">
    <Navbar></Navbar>
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
            Direct Bank Transfer
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
      <a href="#" class="primary-btn order-submit">Place order</a>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  data() {
    return {
      complete: false,
      sum: 0,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
      }
    };
  },
  components: { Navbar },
  methods: {
    pay() {
      // createToken returns a Promise which resolves in a result object with
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.
      createToken().then(data => console.log(data.token));
    }
  },
  created() {
    this.$store.state.cart.forEach(element => {
      element.productPrice = parseInt(element.productPrice);
      console.log(element.productPrice);
      this.sum = element.productPrice + this.sum;
      console.log(element.productName);
    });
  }
};
</script>



<style scoped>
/**
 * The CSS shown here will not be introduced in the Quickstart guide, but shows
 * how you can use CSS to style your Element's container.
 */
.StripeElement {
  box-sizing: border-box;
  height: 40px;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}
.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}
.StripeElement--invalid {
  border-color: #fa755a;
}
.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
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