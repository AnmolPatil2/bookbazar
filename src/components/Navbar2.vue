<template>
  <nav>
    <v-toolbar flat app color="#232f3e" class="white--text">
      <div class="grey--text hidden-md-and-up" id="bigscreen">
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="text-uppercase white--text">
          <span class="font-weight-light">Book</span>
          <span>Bazar</span>
        </v-toolbar-title>
        <div class="navbar" :class="{ 'navbar--hidden': !showNavbar }"></div>
        <v-spacer></v-spacer>
      </div>
      <div class="hidden-sm-and-down ma-0 pa-0">
        <v-toolbar-title class="text-uppercase white--text">
          <span class="font-weight-light">Book</span>
          <span>Bazar</span>
        </v-toolbar-title>
      </div>
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
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <a
          class="btn btn-outline-success my-2 my-sm-0"
          data-toggle="modal"
          data-target="#login"
        >Get Start</a>

        <a
          class="btn btn-outline-success my-2 my-sm-0"
          data-toggle="modal"
          data-target="#miniCart"
        >Cart</a>
      </form>
    </v-toolbar>

    <v-navigation-drawer
      app
      v-model="drawer"
      class="hidden-md-and-up"
      temporary
      width="300"
      id="drawer"
    >
      <v-list>
        <v-flex class="mt-4 mb-3"></v-flex>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <a
          class="btn btn-outline-success my-2 my-sm-0"
          data-toggle="modal"
          data-target="#login"
        >Get Start</a>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "./Popup";
export default {
  name: "Navbar",

  props: {},
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
      drawer: null,
      links: [
        { icon: "dashboard", text: "Buy", route: "/select" },
        { icon: "folder", text: "Sell", route: "/sell" },
        { icon: "person", text: "Donate", route: "/select" }
      ]
    };
  },

  components: { Popup },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#bigscreen {
}
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
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
}
.app {
  width: 100vw;
  height: 500vh;
  background: hsl(200, 50%, 90%);
}
.navbar {
  height: 60px;
  width: 100vw;
  background: hsl(200, 50%, 50%);
  position: fixed;
  box-shadow: 0 2px 15px rgba(71, 120, 120, 0.5);
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;
}
.navbar.navbar--hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}
</style>
