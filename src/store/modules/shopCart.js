import { requestCardList } from "@/server/apis.js";
// state
const state = {
  name: "shopCart",
  shopCartList: [
    {
      id: 1,
      productName: "商品1",
      price: 10,
      unit: "个",
      image: "https://img.yzcdn.cn/vant/ipad.jpeg",
      quantity: 2,
    },
    {
      id: 2,
      productName: "商品2",
      price: 20,
      unit: "个",
      image: "https://img.yzcdn.cn/vant/ipad.jpeg",
      quantity: 1,
    },
    {
      id: 3,
      productName: "商品3",
      price: 30,
      unit: "个",
      image: "https://img.yzcdn.cn/vant/ipad.jpeg",
      quantity: 3,
    },
  ],
};
// mutations
const mutations = {
  changeShopCartList(state, val) {
    state.shopCartList = val;
  },
};
// getters
const getters = {};
// actions
const actions = {
  async getshopCartList(store, val) {
    let headers = {
      Authorization: `Bearer ${val.token}`,
      "Content-Type": "application/json",
      token: val.token,
    };
    let result = await requestCardList(headers, val.id);
    console.log("😜🏀[ result ]-43", result);
    let {
      data: { status },
      data: { message },
      data: { data },
    } = result;
    if (status == 200) {
      store.commit("changeShopCartList", data);
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
