import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import Admin from "./views/Admin/Admin.vue";
import Overview from "./views/Admin/Overview.vue";
import Products from "./views/Admin/Products.vue";
import Orders from "./views/Admin/Orders.vue";
import Ordersbuy from "./views/Admin/Ordersbuy.vue";
import { fb } from './firebase';
import Profile from "./views/Admin/Profile.vue";

import Accounts from "./views/Accounts/Accounts.vue";
import Overview1 from "./views/Accounts/Overview1.vue";
import Profile1 from "./views/Accounts/Profile1.vue";
import Orders1 from "./views/Accounts/Orders1.vue";
import signup from "@/components/signup.vue";
import searchresults from "./views/searchresults.vue";
import forgotPassword from "@/components/forgotPassword.vue";
import Select from "./views/Select.vue";

import rules from "./views/rules.vue";
import RulesToSell from "./views/RulesToSell.vue";
import testing from "./views/allsinglepagetesting.vue";
import ProductDisplay from "./views/ProductDisplay.vue";
import productCompholder from "./views/productdisplay/productCompholder.vue"

import tp from "./views/testingproduct.vue";
import Sell from "./views/Sell.vue";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/rulestosell",
      name: "rulestosell",
      component: RulesToSell
    },
    {
      path: "/searchresults/:searchresult",
      name: "searchresults",
      component: searchresults
    },
    {
      path: "/testing",
      name: "testing",
      component: testing
    },
    {
      path: "/rules",
      name: "rules",
      component: rules
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: forgotPassword
    },

    {
      path: "/signup",
      name: "signup",
      component: signup
    },

    {
      path: "/productcompholder/:id",
      name: "productCompholder",
      component: productCompholder,

    },
    {
      path: "/ProductDisplay",
      name: "ProductDisplay",
      component: ProductDisplay,

    },
    {
      path: "/select",
      name: "select",
      component: Select,

    },
    {
      path: "/sell",
      name: "sell",
      component: Sell
    },
    {
      path: "/tp",
      name: "tp",
      component: tp
    },
    {
      path: "/YoYoadminokaymaEJSCJEWNSCJOSNAJDECMSIH",
      name: "admin",
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: "overview",
          name: "overview",
          component: Overview
        },
        {
          path: "profile",
          name: "profile",
          component: Profile
        },
        {
          path: "products",
          name: "products",
          component: Products
        }, {
          path: "ordersbuy",
          name: "ordersbuy",
          component: Ordersbuy
        },

        {
          path: "orders",
          name: "orders",
          component: Orders
        }
      ]
    }, {
      path: "/accounts",
      name: "accounts",
      component: Accounts,
      meta: { requiresAuth: true },
      children: [
        {
          path: "overview1",
          name: "overview1",
          component: Overview1
        },
        {
          path: "profile1",
          name: "profile1",
          component: Profile1
        },

        {
          path: "orders1",
          name: "orders1",
          component: Orders1
        }
      ]
    },
    {
      path: "about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/checkout",
      name: "checkout",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Checkout.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/')
  } else if (requiresAuth && currentUser) {
    next()
  }
  else {
    next()
  }
})

export default router;
