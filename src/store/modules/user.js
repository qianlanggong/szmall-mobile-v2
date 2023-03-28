// state
const state = {
  name: "我是user模块",
  TOKEN: "0000",
};
// mutations
const mutations = {
  myMutation() {
    console.log("user模块的 myMutation方法被触发了");
  },
};
// getters
const getters = {
  reverseName(state) {
    return state.name.split("").reverse().join("");
  },
};
// actions
const actions = {
  myAction() {
    console.log("user模块 action的 myAction方法被触发了");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
