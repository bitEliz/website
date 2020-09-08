import Vue from "vue";
import Router from "vue-router";
import { VBScrollspyPlugin, CollapsePlugin } from "bootstrap-vue";
import { Card, Image, Avatar } from "element-ui";
import App from "./App.vue";
import routes from "./router";
import { routerMode } from "./config/env";
import filters from "@utils/filters";

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

Vue.use(VBScrollspyPlugin);
Vue.use(CollapsePlugin);
Vue.use(Card);
Vue.use(Image);
Vue.use(Avatar);

Vue.use(Router);

const router = new Router({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== "production",
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
