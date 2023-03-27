import Vue from "vue";
import App from "./App.vue";
import Store from "./store";
import router from "./router";
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  Store,
  router,
}).$mount("#app");
