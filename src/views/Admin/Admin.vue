<template>
  <div class="admin">
    <div v-if="!show">you dont have admin access</div>
    <div v-if="show">
      <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
        <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark" href="#">
          <i class="fa fa-bars"></i>
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
                <img
                  class="img-responsive img-rounded"
                  src="/img/svg/user-profile.png"
                  alt="User picture"
                />
              </div>
              <div class="user-info">
                <span class="user-name">
                  <strong>Admin</strong>
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
              <div>
                <div class="input-group">
                  <input type="text" class="form-control search-menu" placeholder="Search..." />
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <i class="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- sidebar-menu  -->
            <div class="sidebar-item sidebar-menu">
              <ul>
                <li class="header-menu">
                  <span>Menu</span>
                </li>

                <li>
                  <router-link to="/YoYoadminokaymaEJSCJEWNSCJOSNAJDECMSIH/overview">
                    <i class="fa fa-chart-line"></i>
                    <span>Overview</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/YoYoadminokaymaEJSCJEWNSCJOSNAJDECMSIH/products">
                    <i class="fab fa-amazon"></i>
                    <span>Products</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/YoYoadminokaymaEJSCJEWNSCJOSNAJDECMSIH/orders">
                    <i class="fa fa-shopping-cart"></i>
                    <span>Orders</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/YoYoadminokaymaEJSCJEWNSCJOSNAJDECMSIH/ordersbuy">
                    <i class="fa fa-shopping-cart"></i>
                    <span>Ordersbuy</span>
                  </router-link>
                </li>

                <li>
                  <router-link to="/YoYoadminokaymaEJSCJEWNSCJOSNAJDECMSIH/profile">
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
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import { fb, db } from "../../firebase";
export default {
  name: "admin",
  data() {
    return {
      name: null,
      email: null,
      profil: [],
      show: false
    };
  },
  components: {
    Hero
  },
  firestore() {
    return {
      profil: db.collection("profiles")
    };
  },
  methods: {
    closeMenu() {
      $(".page-wrapper").toggleClass("toggled");
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
    },
    gohome() {
      this.$router.push({
        name: "home"
      });
    }
  },
  created() {
    let user = fb.auth().currentUser;
    this.email = user.email;
    if (
      this.email == "anmol.patil004@gmail.com" ||
      this.email == "kenkthejesh@gmail.com" ||
      this.email == "joswinlobo16@gmail.com" ||
      this.email == "abufaisal1104@gmail.com" ||
      this.email == "nikithah007@gmail.com" ||
      this.email == "akashsunil38@gmail.com" ||
      this.email == "ksprashanth1999@gmail.com" ||
      this.email == "kruthikacrazy1999@gmail.com" ||
      this.email == "himajayram@gmail.com" ||
      this.email == "spooru17@gmail.com"
    ) {
      this.show = true;
    }
  }
};
</script>

<style>
</style>
  