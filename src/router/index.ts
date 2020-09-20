import App from "@/App.vue";

export default [
  {
    path: "/",
    component: App,
    children: [
      {
        path: "/static/:id",
        component: () => import("@/views/static/index.vue"),
      },
      {
        path: "/users/:uid/resume",
        component: () => import("@/views/users/_uid/resume.vue"),
      },
    ],
  },
];
