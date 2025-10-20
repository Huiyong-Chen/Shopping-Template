import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./Home.vue";
import Login from "./Login.vue";

Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});
