<template>
  <div class="admin">
    <div class="page-wrapper default-theme toggled">
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <img src="/img/svg/logo.jpeg" alt width="30" />

            <a href="/">Bookoo</a>
            <div id="close-sidebar" @click="closeMenu">
              <i class></i>
            </div>
          </div>
          <!-- sidebar-header -->
          <div class="navhead" v-if="!user">
            <div class="sidebar-item sidebar-header">
              <div class="user-pic">
                <img
                  data-toggle="modal"
                  data-target="#login"
                  v-if="!user"
                  src="/img/svg/login1.svg"
                  width="50px"
                  height="30px"
                />
              </div>

              <div class="user-info">
                <span class="user-name p-4">
                  <strong>Login</strong>
                </span>
                <span class="user-role"></span>
              </div>
            </div>
          </div>

          <div v-if="user" class="sidebar-item sidebar-header">
            <div class="user-pic">
              <img class="img-responsive img-rounded" :src="user.photo" alt="User picture" />
            </div>
            <div class="user-info">
              <span class="user-name">
                <strong>{{user.name}}</strong>
              </span>
              <span class="user-role">{{email}}</span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>

          <!-- sidebar-search-->
          <div class="sidebar-item sidebar-search">
            <div>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control search-menu"
                  v-model="searchresult"
                  placeholder="Subject..."
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
          <!-- sidebar-menu-->
          <div class="sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>Menu</span>
              </li>

              <li class="mx-3">
                <router-link to="/rules">
                  <i class="fas fa-dollar-sign"></i>
                  <span>Sell</span>
                </router-link>
              </li>

              <li class="mx-3">
                <router-link to="/rules">
                  <i class="fa fa-shopping-bag"></i>
                  <span>Buy</span>
                </router-link>
              </li>

              <li class="mx-3">
                <router-link to="/rules">
                  <i class="fa fa-user"></i>
                  <span>Donate</span>
                </router-link>
              </li>
              <li class="mx-3">
                <a href="#">
                  <i class="fas fa-question"></i>
                  <span>Help</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->

          <!-- sidebar-search-->

          <!-- sidebar-menu  -->
          <div v-if="user" class="sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>Accounts</span>
              </li>

              <li class="mx-3">
                <router-link to="/accounts/orders1">
                  <i class="fa fa-shopping-cart"></i>
                  <span>Orders</span>
                </router-link>
              </li>

              <li class="mx-3">
                <router-link to="/accounts/profile1">
                  <i class="fa fa-user"></i>
                  <span>Profile</span>
                </router-link>
              </li>
              <li class="mx-3">
                <a href="#" @click="logout()">
                  <i class="fa fa-power-off"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
      </nav>
      <!-- sidebar-content  -->
      <main class="page-content">
        <router-view />
      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import { fb, db } from "../firebase";
import firebase from "@firebase/app";
export default {
  name: "admin",
  data() {
    return {
      name: null,
      email: null,
      searchresult: null,
      user: []
    };
  },
  components: {},

  created() {
    let user = fb.auth().currentUser;
    if (user == null) {
      this.user = null;
    } else {
      this.email = user.email;
      this.email = user.email;
      let ref = db.collection("profiles");

      ref
        .where("aui", "==", firebase.auth().currentUser.uid)
        .get()
        .then(snapshot => {
          snapshot.forEach(user => {
            this.user = user.data();
          });
        });
    }
  },
  methods: {
    closeMenu() {
      //$(".page-wrapper").toggleClass("toggled");
    },
    search() {
      this.$router.push({
        name: "searchresults",
        params: { searchresult: this.searchresult }
      });
      this.searchresult;
    },

    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.user-pic {
  position: relative;
  padding: 0px;
  margin: 0px;
}
.user-info {
  position: absolute;
  left: 80px;
}
.admin {
}
</style>