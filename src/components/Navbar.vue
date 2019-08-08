<template>
  <nav>
    <v-toolbar flat app color="white" class="black--text">
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="grey--text hidden-sm-and-up"
        id="trigger_btn1"
      ></v-toolbar-side-icon>

      <v-toolbar-title class="text-uppercase black--text">
        <iconmenu />
        <span class="font-weight-light logo">Bookoo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-list-tile
        class="hidden-sm-and-down"
        v-for="link in links"
        :key="link.text"
        router
        :to="link.route"
      >
        <v-list-tile-title>{{ link.text }}</v-list-tile-title>
      </v-list-tile>

      <!-- dropdown menu -->
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

      <form class="form-inline my-2 my-lg-0 hidden-sm-and-down">
        <input
          class="form-control mr-sm-2"
          @click="routersearch()"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <a
          class="btn btn-outline-success my-2 my-sm-0"
          data-toggle="modal"
          data-target="#login"
          v-if="!user"
        >Get Start</a>
        {{this.name }}
        <div id="ex4">
          <span class="p1 fa-stack fa-2x has-badge" :data-count="`${count}`">
            <i
              data-toggle="modal"
              data-target="#miniCart"
              aria-hidden="true"
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
      count: 5,
      user: null,
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
    }
  },
  mounted() {
    this.user = firebase1.auth().currentUser;
    if (this.user != null) {
      this.name = this.user.displayName;
    }
    if (this.drawer != null) {
      console.log("ddd");
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
    background-color: #9652ff;
  }
}
#drawer {
  background-color: #9652ff;
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
</style>
