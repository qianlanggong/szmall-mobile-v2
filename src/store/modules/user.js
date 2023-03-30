import { reqUserInfo } from "@/server/apis.js";
// state
const state = {
  name: "我是user模块",
  //验证码
  code: "",
  //身份标识符很重要【存储在vuex】
  TOKEN: localStorage.getItem("TOKEN"),
  //用户名
  nickName: "",
};
// mutations
const mutations = {
  myMutation() {
    console.log("user模块的 myMutation方法被触发了");
  },
  GET_CODE(state, code) {
    state.code = code;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USERINFO(state, nickName) {
    state.nickName = nickName;
  },
  CLEAR(state) {
    //清除仓库相关用户信息
    state.token = "";
    state.nickName = "";
    //本地存储令牌清空
    localStorage.removeItem("TOKEN");
  },
};
// actions
const actions = {
  myAction() {
    console.log("user模块 action的 myAction方法被触发了");
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    console.log(111);
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("SET_USERINFO", result.data.nickName);
      return "ok";
    } else {
      return Promise.reject();
    }
  },
};
// getters
const getters = {
  reverseName(state) {
    return state.name.split("").reverse().join("");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
