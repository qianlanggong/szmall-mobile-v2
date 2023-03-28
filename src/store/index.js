import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import goods from "./modules/goods";
Vue.use(Vuex);
export default new Vuex.Store({
  //模块化store仓库
  modules: {user,goods},
});
