import Vue from "vue";
import VueRouter from "vue-router";
import UserList from "../views/user-list";
import UserDetails from "../views/user-details";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "user-list",
    component: UserList
  },
  {
    path: "/users/:id",
    name: "user-details",
    component: UserDetails
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
