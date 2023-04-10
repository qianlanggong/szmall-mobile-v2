import { requestAllProductList } from "@/server";
import { requestMoreProducts } from "@/server";
// state
const state = {
  name: "我是goods模块",
  productList: [],
};
// mutations
const mutations = {
  setProcutList(state, val) {
    state.productList = val;
  },
  getMoreProcuts(state, val) {
    state.productList.push(...val);
    // console.log(state, val);
  },
};
// getters
const getters = {};
// actions
const actions = {
  /* 这是获取首页商品的列表操作，负责使用“requestAllProductList”函数从服务器获取产品列表。它有两个参数：`commit` 和 `val`。 */
  async getProducts({ commit }, val) {
    let result = await requestAllProductList(val);
    let {
      data: { status },
      data: { message },
      data: { data },
    } = result;
    console.log("😜🏀[ data ]-25", data);
    if (status == 200) {
      commit("setProcutList", data.list);
      return Promise.resolve(message);
    } else {
      return Promise.reject(new Error(message));
    }
  },
  async getMoreProcuts({ commit }, val) {
    let result = await requestMoreProducts(val);
    console.log("😜🏀[ result ]-40", result);
    let {
      data: { status },
      data: { message },
      data: { data },
    } = result;
    console.log("😜🏀[ data ]-25", data);
    if (status == 200) {
      if (!data.list.length > 0) message = "已加载全部";
      commit("getMoreProcuts", data.list);
      return Promise.resolve(message);
    } else {
      return Promise.reject(new Error(message));
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
