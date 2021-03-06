import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import RegistrationForm from "./views/RegistrationForm.vue";
import LoginForm from "./views/LoginForm.vue";
import MyProfile from "./views/MyProfile.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/registration",
      name: "registration",
      component: RegistrationForm
    },
    {
      path: "/login",
      name: "login",
      component: LoginForm
    },
    {
      path: "/my-profile",
      name: "my-profile",
      component: MyProfile
    }
  ]
});
