import Vue from "vue";
import { VBScrollspyPlugin, CollapsePlugin } from "bootstrap-vue";
import { Card, Image, Avatar } from "element-ui";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(VBScrollspyPlugin);
Vue.use(CollapsePlugin);
Vue.use(Card);
Vue.use(Image);
Vue.use(Avatar);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
