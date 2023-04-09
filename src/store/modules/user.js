import { reqUserInfo, requestLogin, requestRegister } from "@/server/apis.js";
import { storage } from "@/utils";
import { CODE, TOKEN, NICKNAME, TIMEOUT } from "../enum/user";
// state
const state = {
  name: "我是user模块",
  //验证码
  [CODE]: "",
  //身份标识符很重要【存储在vuex】
  [TOKEN]: localStorage.getItem([TOKEN]),
  //用户名
  [NICKNAME]: localStorage.getItem([NICKNAME]),
};
// mutations
const mutations = {
  myMutation() {
    console.log("user模块的 myMutation方法被触发了");
  },
  GET_CODE(state, code) {
    state[CODE] = code;
  },
  SET_TOKEN(state, token) {
    state[TOKEN] = token;
  },
  SET_USERINFO(state, nickName) {
    state[NICKNAME] = nickName;
  },
  CLEAR(state) {
    //清除仓库相关用户信息
    state[TOKEN] = "";
    state[NICKNAME] = "";
    //本地存储令牌清空
    localStorage.removeItem[TOKEN];
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
  //检验token是否还有效
  checkToken(context) {
    const token = storage.get([TOKEN]);
    // console.log("[ a ] >", a);
    if (!token.value) {
      context.commit("CLEAR");
    }
    // storage.set("a", 123, new Date().getTime() + 5000);
    // setInterval(() => {
    //   const a = storage.get("a");
    //   console.log(a);
    // }, 500);
  },
  //登录的action逻辑
  async login(context, params) {
    let result = await requestLogin(params);
    let { data } = result;
    let userInformation = data.data;
    console.log("😜🏀[ userInformation ]-63", userInformation);
    console.log("data", data);
    console.log("result===>", result);
    if (data.status == 200) {
      context.commit("SET_TOKEN", userInformation.token);
      context.commit("SET_USERINFO", userInformation.nickname);
      //以后开发的时候:经常的登录的成功获取token【持久化存储】
      // localStorage.setItem("TOKEN", userInformation.token);
      // localStorage.setItem("nickName", userInformation.nickname);
      // 存储token并且设置期限
      storage.set(
        "TOKEN",
        userInformation.token,
        new Date().getTime() + +[TIMEOUT]
      );
      storage.set(
        "NICKNAME",
        userInformation.nickname,
        new Date().getTime() + +[TIMEOUT]
      );
      return Promise.resolve(data.message);
    } else {
      return Promise.reject(new Error(data.message));
    }
  },
  //注册的action逻辑
  async register(context, params) {
    let result = await requestRegister(params);
    console.log("😜🏀[ result ]-71", result);

    let { data } = result;
    // let userInformation = data.data;
    console.log("data", data);
    console.log("result===>", result);
    if (data.status == 200) {
      // context.commit("SET_TOKEN", userInformation.token);
      // context.commit("SET_USERINFO", userInformation.nickname);
      // //以后开发的时候:经常的登录的成功获取token【持久化存储】
      // localStorage.setItem("TOKEN", userInformation.token);
      // localStorage.setItem("nickName", userInformation.nickname);
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
