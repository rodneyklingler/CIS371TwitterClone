import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { AppRouter } from "./route-init.js";
import store from "./store";

Vue.config.productionTip = false;


new Vue({
  vuetify,
  store,
  render: (h) => h(App),
  router: AppRouter
}).$mount("#app");