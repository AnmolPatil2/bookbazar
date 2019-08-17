<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark" href="#">
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <img src="/img/svg/logo.png" @click="gohome()" alt width="30" />

            <h2 style="color: #eee2dc" @click="gohome()" class="px-3">BooKoo</h2>
            <a></a>
            <div id="close-sidebar" @click="closeMenu">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-item sidebar-header">
            <div class="user-pic">
              <img class="img-responsive img-rounded" :src="user.photo" alt="User picture" />
            </div>
            <div class="user-info mx-2">
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
          <!-- sidebar-search  -->
          <div class="sidebar-item sidebar-search">
            <div></div>
          </div>
          <!-- sidebar-menu  -->
          <div class="sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>Menu</span>
              </li>

              <li>
                <router-link to="/accounts/overview1">
                  <i class="fa fa-chart-line"></i>
                  <span>Overview</span>
                </router-link>
              </li>

              <li>
                <router-link to="/accounts/orders1">
                  <i class="fa fa-shopping-cart"></i>
                  <span>Orders</span>
                </router-link>
              </li>

              <li>
                <router-link to="/accounts/profile1">
                  <i class="fa fa-user"></i>
                  <span>Profile</span>
                </router-link>
              </li>
              <li>
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
import { fb, db } from "../../firebase";
import firebase from "@firebase/app";
export default {
  name: "admin",
  data() {
    return {
      name: null,
      email: null,
      user: [],
      photo: []
    };
  },
  components: {},

  created() {
    let user = fb.auth().currentUser;
    this.photo = user.photoURL;
    this.email = user.email;
    this.name = user.displayName;
    let ref = db.collection("profiles");

    ref
      .where("aui", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          this.user = user.data();
        });
      })
      .then(() => {});
  },
  methods: {
    closeMenu() {
      $(".page-wrapper").toggleClass("toggled");
    },
    gohome() {
      this.$router.push({
        name: "home"
      });
    },

    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          document.location.reload(true);
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
</style>