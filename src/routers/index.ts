import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/blog",
    component: () => import("../views/blog/Index.vue" /* webpackChunkName: "views/blog/Index" */),
    name: "blog"
  },
  {
    path: "/blog/:id",
    component: () => import("../views/blog/_id.vue" /* webpackChunkName: "views/blog/_id" */),
    name: "blog-id"
  },
  {
    path: "/pure-md-resume",
    component: () =>
      import("../views/static/PureMDFile.vue" /* webpackChunkName: "views/static/PureMDFile" */),
    name: "pure-md-resume"
  },
  {
    path: "/resume",
    component: () => import("../views/Resume.vue" /* webpackChunkName: "views/Resume" */),
    name: "resume"
  },
  {
    path: "/static/:id",
    component: () =>
      import("../views/static/PureMDFile.vue" /* webpackChunkName: "views/static/PureMDFile" */),
    name: "static-id"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
