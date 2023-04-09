//仓库
import Vuex from "vuex";
import Vue from "vue";
//引入小仓库
import user from "./modules/user";
import goods from "./modules/goods";
import shopCart from "./modules/shopCart";
//安装插件
Vue.use(Vuex);
//对外暴露仓库
//第一个注意:需要关键字new，你没有new会报错的
//第二个注意:Store构造函数,书写的时候别小写
export default new Vuex.Store({
  //模块化store仓库
  modules: { user, goods, shopCart },
});
