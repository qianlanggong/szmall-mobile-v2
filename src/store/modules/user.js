import { reqUserInfo, requestLogin } from "@/server/apis.js";

// state
const state = {
  name: "我是user模块",
  //验证码
  code: "",
  //身份标识符很重要【存储在vuex】
  token: localStorage.getItem("TOKEN"),
  //用户名
  nickName: localStorage.getItem("nickName"),
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
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("SET_USERINFO", result.data.nickName);
      return "ok";
    } else {
      return Promise.reject();
    }
  },
  //登录的接口
  async login(context, params) {
    let result = await requestLogin(params);
    let { data } = result;
    let userInformation = data.data;
    console.log("data", data);
    console.log("result===>", result);
    if (data.status == 200) {
      context.commit("SET_TOKEN", userInformation.token);
      context.commit("SET_USERINFO", userInformation.nickname);
      //以后开发的时候:经常的登录的成功获取token【持久化存储】
      localStorage.setItem("TOKEN", userInformation.token);
      localStorage.setItem("nickName", userInformation.nickname);
      return Promise.resolve(data.message);
    } else {
      return Promise.reject(new Error(data.message));
    }
  },
  //退出登录的业务
  async logout({ commit }) {
    //发请求通知服务器销毁当前token【学生证】
    // let result = await reqUserLogout();
    // if (result.code == 200) {
    commit("CLEAR");
    //   return "ok";
    // } else {
    //   return Promise.reject(new Error(result.message));
    // }
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
