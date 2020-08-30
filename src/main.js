import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import Element from "element-ui";
import App from "./App.vue";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(Element);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
