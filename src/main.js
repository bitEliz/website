import Vue from 'vue';
import Scrollspy, { Easing } from 'vue2-scrollspy';
import Bootstrap from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(Scrollspy, {
  easing: Easing.Cubic.In,
});

Vue.use(Bootstrap);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
