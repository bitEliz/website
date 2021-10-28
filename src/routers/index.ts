import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/blog",
    component: () => import("../views/blog/Index.vue"),
    name: "blog"
  },
  {
    path: "/blog/:id",
    component: () => import("../views/blog/_id.vue"),
    name: "blog-id"
  },
  {
    path: "/pure-md-resume",
    component: () => import("../views/static/PureMDFile.vue"),
    name: "pure-md-resume"
  },
  {
    path: "/resume",
    component: () => import("../views/Resume.vue"),
    name: "resume"
  },
  {
    path: "/static/:id",
    component: () => import("../views/static/PureMDFile.vue"),
    name: "static-id"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
