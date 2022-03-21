import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/resume"
  },
  {
    path: "/pure-md-resume",
    component: () => import("../views/static/pure-md-file"),
    name: "pure-md-resume"
  },
  {
    path: "/resume",
    component: () => import("../views/Resume.vue"),
    name: "resume"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
