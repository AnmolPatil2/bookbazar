<template>
  <nav>
    <v-toolbar app flat color="#123c69" class="black--text">
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="grey--text hidden-sm-and-up"
        id="trigger_btn1"
      ></v-toolbar-side-icon>

      <v-toolbar-title class="text-uppercase black--text">
        <iconmenu />

        <span
          color
          style="color: #eee2dc"
          @click="returnhome()"
          class="font-weight-light logo"
        >Bookoo</span>
        <img @click="returnhome()" class="logoimg" src="/img/svg/check1.jpg" />
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-list-tile
        class="hidden-sm-and-down"
        v-for="link in links"
        :key="link.text"
        router
        :to="link.route"
      >
        <v-list-tile-title style="color: #eee2dc">{{ link.text }}</v-list-tile-title>
      </v-list-tile>

      <!-- dropdown menu 
      <v-menu offset-y class="hidden-sm-and-down">
        <v-btn flat slot="activator" color="grey">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      -->

      <form class="form-inline my-2 my-lg-0 hidden-sm-and-down">
        <div class="sidebar-item sidebar-search">
          <div>
            <div class="input-group">
              <input
                type="text"
                class="form-control search-menu"
                v-model="searchresult"
                placeholder="Book Name.."
                @keyup.enter="search()"
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fa fa-search" @click="search()" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <a
          class="btn btn-outline-success my-2 my-sm-0 mx-3"
          data-toggle="modal"
          data-target="#login"
          v-if="!user"
          style="color: #eee2dc"
        >Login</a>
        <div class="accounts" v-if="user">
          <i class="fa fa-user" aria-hidden="true"></i>
          {{this.name }}
        </div>

        <div id="ex4">
          <span
            class="p1 fa-stack fa-2x has-badge"
            :data-count="`${this.$store.state.cart.length}`"
          >
            <i
              style="color: #eee2dc"
              data-toggle="modal"
              data-target="#miniCart"
              aria-hidden="true"
              id="cart"
              class="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse"
              data-count="4b"
            ></i>
          </span>
        </div>
      </form>
    </v-toolbar>

    <v-navigation-drawer
      app
      v-model="drawer"
      class="hidden-sm-and-up"
      temporary
      width="260"
      id="drawer"
    >
      <v-list>
        <v-flex class></v-flex>
        <mobilenavbar />
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "./Popup";
import iconmenu from "@/components/iconmenu.vue";
import firebase1 from "@firebase/app";
import mobilenavbar from "./mobilenavbar";
export default {
  name: "Navbar",
  props: {},
  data() {
    return {
      drawer: null,

      user: null,

      searchresult: null,
      name: null,
      links: [
        { icon: "dashboard", text: "Buy", route: "/rules" },
        { icon: "folder", text: "Sell", route: "/rules" },
        { icon: "person", text: "Donate", route: "/rules" }
      ]
    };
  },

  components: { Popup, mobilenavbar, iconmenu },
  methods: {
    routersearch() {
      this.$router.push({
        name: "searchresults"
      });
    },
    returnhome() {
      this.$router.push({
        to: "/"
      });
    },
    search() {
      this.$router.push({
        name: "searchresults",
        params: { searchresult: this.searchresult }
      });
    }
  },
  mounted() {
    this.user = firebase1.auth().currentUser;
    if (this.user != null) {
      this.name = this.user.displayName;
    }
    if (this.drawer != null) {
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (min-width: 992px) {
  .navbar.custom-nav {
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: black;
  }
}
#drawer {
  background-color: black;
}
.logo {
  padding-left: 50px;
}
#ex4 .p1[data-count]:after {
  position: absolute;
  right: 10%;
  top: 8%;
  content: attr(data-count);
  font-size: 40%;
  padding: 0.2em;
  border-radius: 50%;
  line-height: 1em;
  color: white;
  background: rgba(255, 0, 0, 0.85);
  text-align: center;
  min-width: 1em;
  //font-weight:bold;
}
@media only screen and (max-width: 768px) {
  .logoimg {
    max-height: 45px;
  }
}
.logoimg {
  max-height: 58px;
}
</style>
