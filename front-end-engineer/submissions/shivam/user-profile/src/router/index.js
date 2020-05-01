import Vue from "vue";
import VueRouter from "vue-router";
import UserList from "../views/user-list.vue";
import UserDetails from "../views/user-details.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "UserList",
    component: UserList
  },
  {
    path: "/:id",
    name: "UserDetails",
    component: UserDetails
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
