<template>
  <div class="mini-cart">
    <!-- Modal -->
    <div
      class="modal fade"
      id="miniCart"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">My Bag</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div v-if="this.$store.state.cart.length==0">
              <img src="/img/svg/empty-cart.svg" class="empty-cart" />
              <h5 class="text-center mt-4">Your Cart is Empty</h5>
            </div>
            <ul>
              <li v-for="item in this.$store.state.cart" class="media">
                <img
                  :src="item.productImage"
                  width="80px"
                  style="cursor: pointer"
                  @click="product_select(item)"
                  class="align-self-center mr-3"
                  alt
                />
                <div class="media-body">
                  <h5
                    class="mt-0"
                    style="cursor: pointer"
                    @click="product_select(item)"
                  >{{item.productName}}</h5>
                  <v-chip
                    class="ma-2"
                    style="cursor: pointer"
                    @click="$store.commit('removeFromCart',item)"
                    color="red right"
                    text-color="white"
                  >
                    <i class="fa fa-trash px-2" aria-hidden="true "></i>Remove
                  </v-chip>

                  <p class="mt-0">RS: {{item.productPrice }}</p>
                  <p class="mt-0">Quantity : {{item.productQuantity }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn red" data-dismiss="modal">Back</button>
            <button type="button" class="btn btn-primary" @click="checkout">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniCart",
  props: {
    msg: String
  },
  methods: {
    checkout() {
      $("#miniCart").modal("hide");
      this.$router.push("/checkout");
    },
    product_select(product) {
      $("#miniCart").modal("hide");
      this.$router.push({
        name: "productCompholder",
        params: { id: product.productId }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.empty-cart {
  max-height: 100px;
}
</style>