import {
  requestAllProductList,
  requestMoreProducts,
  requestAddreassList,
  requestAddCardList,
} from "@/server";
// state
const state = {
  name: "我是goods模块",
  // 商品列表
  productList: [],
  // 地址列表
  addressList: [],
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
  getAddressList(state, val) {
    state.addressList = val;
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
  // 请求用户地址栏列表
  async getAddressList({ commit }, token) {
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      token: token,
    };
    let result = await requestAddreassList(headers);
    console.log("😜🏀[ result ]-70", result);
    let {
      data: { status },
      data: { message },
      data: { data },
    } = result;
    if (status == 200) {
      commit("getAddressList", data);
      return Promise.resolve(message);
    } else {
      return Promise.reject(new Error(message));
    }
  },
  // 添加购物车
  async AddCardList(store, comingData) {
    let { token } = comingData;
    delete comingData.token;
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      token: token,
    };
    let result = await requestAddCardList(headers, comingData);
    let {
      data: { status },
      data: { message },
      // data: { data },
    } = result;
    if (status == 200) {
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
