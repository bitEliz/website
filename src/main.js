import Vue from "vue";
import { CollapsePlugin, VBScrollspyPlugin } from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(CollapsePlugin);
Vue.use(VBScrollspyPlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
