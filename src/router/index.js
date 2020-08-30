import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/static/resume",
    component: () => import("@views/static/resume"),
  },
  {
    path: "/users/:uid/resume",
    component: () => import("@views/resume/resume"),
  },
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
