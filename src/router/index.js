import App from "../App";

export default [
  {
    path: "/",
    component: App,
    children: [
      {
        path: "/static/:id",
        component: () => import("@views/static/static"),
      },
      {
        path: "/users/:uid/resume",
        component: () => import("@views/resume/resume"),
      },
    ],
  },
];
