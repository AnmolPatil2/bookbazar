<template>
  <nav>
    <v-toolbar class="black--text navbar2" app flat color="#123c69">
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="grey--text hidden-sm-and-up"
        id="trigger_btn1"
      ></v-toolbar-side-icon>

      <v-toolbar-title class="text-uppercase black--text">
        <iconmenu />
        <div @click="returnhome()" style="cursor: pointer" class="logo">
          <span color style="color: #eee2dc" class="font-weight-light logo"></span>
          <img @click="returnhome()" class="logoimg" src="/img/svg/TitleLogo.jpg" />
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-list-tile
        class="hidden-sm-and-down"
        v-for="link in links"
        :key="link.text"
        router
        :to="link.route"
      >
        <v-list-tile-title style="color: #eee2dc;">{{ link.text }}</v-list-tile-title>
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

      <form @submit.prevent="search()" class="form-inline my-2 my-lg-0 hidden-sm-and-down">
        <div class>
          <div>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                v-model="searchresult"
                placeholder="Book Name.."
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
          style="color: #eee2dc; cursor: pointer"
        >Login</a>
        <div
          @click="rerouteaccount()"
          style="color: #eee2dc; cursor: pointer "
          class="accounts"
          v-if="user"
        >
          <i style="cursor: pointer" class="fa fa-user pl-3" aria-hidden="true"></i>
          {{this.name }}
        </div>

        <div id="ex4">
          <span
            class="p1 fa-stack fa-2x has-badge"
            :data-count="`${this.$store.state.cart.length}`"
          >
            <i
              style="color: #eee2dc;cursor: pointer"
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
        <mobilenavbar class="icons" />
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
        { icon: "folder", text: "Sell", route: "/rulestosell" },
        { icon: "person", text: "Donate", route: "/donate" }
      ]
    };
  },

  components: { Popup, mobilenavbar, iconmenu },
  methods: {
    rerouteaccount() {
      this.$router.push({
        name: "profile1"
      });
    },
    routersearch() {
      this.$router.push({
        name: "searchresults"
      });
    },
    returnhome() {
      this.$router.push({
        name: "home"
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
  .navbar2.custom-nav {
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: black;
  }
}
.logo {
  margin-left: 50px;
}
#drawer {
  background-color: #2e333c;
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
  .logo {
    margin-left: 20px;
  }
}
.logoimg {
  max-height: 63px;
  margin-left: -20px;
}
.qty {
  position: absolute;
  right: 15px;
  top: -10px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  font-size: 10px;
  color: #fff;
  background-color: #d10024;
}
.navbar2 {
  height: 68px;
}
</style>
