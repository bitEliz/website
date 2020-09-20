import Vue from "vue";
import Router from "vue-router";
import marked from "marked";
import { VBScrollspyPlugin, CollapsePlugin } from "bootstrap-vue";
import { Card, Image, Avatar } from "element-ui";

import App from "@/App.vue";
import routes from "@/router";
import { routerMode } from "@/config/env";

Vue.config.productionTip = false;

Vue.filter("markup", marked);

Vue.use(VBScrollspyPlugin);
Vue.use(CollapsePlugin);
Vue.use(Card);
Vue.use(Image);
Vue.use(Avatar);

Vue.use(Router);

const router = new Router({
  routes,
  mode: routerMode,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
