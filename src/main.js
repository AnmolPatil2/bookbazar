import Vue from "vue";
import './plugins/vuetify'
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
import { fb } from "./firebase";
import VueFirestore from "vue-firestore";
import store from './store.js';
import Vuetify from 'vuetify'
import VueScrollReveal from 'vue-scroll-reveal';
 

Vue.use(VueFirestore, {
  key: "id", // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
});

Vue.use(VueFirestore);
Vue.use(Vuetify); 
window.$ = window.jQuery = jQuery;

import "popper.js";
import "bootstrap";
import "./assets/app.scss";
import Swal from "sweetalert2";
window.Swal = Swal;
// Using ScrollReveal's default configuration
Vue.use(VueScrollReveal);
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
});
window.Toast = Toast;
Vue.component("Products-list", require("./sections/Products-list").default);
Vue.component('add-to-cart', require('./components/AddToCart.vue').default);

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

Vue.config.productionTip = false;

let app = "";

fb.auth().onAuthStateChanged(function (user) {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
