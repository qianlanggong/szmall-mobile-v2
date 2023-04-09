// state
const state = {
  name: "shopCart",
  shopCartList: [
    {
      id: 1,
      name: "商品1",
      price: 10,
      unit: "个",
      image: "https://img.yzcdn.cn/vant/ipad.jpeg",
      quantity: 2,
    },
    {
      id: 2,
      name: "商品2",
      price: 20,
      unit: "个",
      image: "https://img.yzcdn.cn/vant/ipad.jpeg",
      quantity: 1,
    },
    {
      id: 3,
      name: "商品3",
      price: 30,
      unit: "个",
      image: "https://img.yzcdn.cn/vant/ipad.jpeg",
      quantity: 3,
    },
  ],
};
// mutations
const mutations = {};
// getters
const getters = {};
// actions
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
