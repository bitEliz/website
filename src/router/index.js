import App from "../App";

export default [
  {
    path: "/",
    component: App,
    children: [
      {
        path: "/static/:id",
        component: () => import("@views/static/index"),
      },
      {
        path: "/users/:uid/resume",
        component: () => import("@views/users/_uid/resume"),
      },
    ],
  },
];
