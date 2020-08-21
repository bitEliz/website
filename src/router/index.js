import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/static/resume",
    component: () => import("@views/static/resume"),
  },
  {
    path: "/users/:userId/resume",
    component: () => import("@views/resume/resume"),
  },
  {
    path: "/users/:userId/projs/:projId",
    component: () => import("@views/proj/proj"),
  },
  {
    path: "/404",
    component: () => import("@views/oop"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
