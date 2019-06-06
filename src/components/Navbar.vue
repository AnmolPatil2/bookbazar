<template>
  <nav>
    <v-toolbar flat app color="#232f3e" class="white--text">
      <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-light">Book</span>
        <span>Bazar</span>
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
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <a
          class="btn btn-outline-success my-2 my-sm-0"
          data-toggle="modal"
          data-target="#login"
        >Get Start</a>
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
          <form class="form-inline my-2 my-lg-0 hidden-sm-and-down">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            >
            <a
              class="btn btn-outline-success my-2 my-sm-0"
              data-toggle="modal"
              data-target="#login"
            >Get Start</a>
          </form>
        </v-list-tile>
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
      drawer: null,
      links: [
        { icon: "dashboard", text: "Buy", route: "/select" },
        { icon: "folder", text: "Sell", route: "/sell" },
        { icon: "person", text: "Donate", route: "/select" }
      ]
    };
  },

  components: { Popup }
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
</style>
