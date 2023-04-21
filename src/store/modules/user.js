import {
  // reqUserInfo,
  requestLogin,
  requestRegister,
  requestExitLogin,
} from "@/server/apis.js";
import { storage } from "@/utils";
import { TOKEN, NICKNAME, TIMEOUT, USERID, USERINFO } from "../enum/user";
// state
const state = {
  name: "我是user模块",
  //身份标识符很重要【存储在vuex】
  [TOKEN]: localStorage.getItem([TOKEN]),
  // 用户id
  [USERID]: "000",
  //用户名
  [NICKNAME]: localStorage.getItem([NICKNAME]),
  // 用户信息
  [USERINFO]: JSON.parse(localStorage.getItem([USERINFO])),
};
// mutations
const mutations = {
  myMutation() {
    console.log("user模块的 myMutation方法被触发了");
  },
  SET_TOKEN(state, token) {
    state[TOKEN] = token;
  },
  SET_NICKNAME(state, nickName) {
    state[NICKNAME] = nickName;
  },
  SET_USERID(state, userId) {
    state[USERID] = userId;
  },
  SET_USERINFO(state, val) {
    console.log("[ val ] >", val);
    state[USERINFO] = val;
  },
  CLEAR(state) {
    //清除仓库相关用户信息
    state[TOKEN] = "";
    state[NICKNAME] = "";
    state[USERID] = "";
    //本地存储数据清空
    localStorage.clear();
  },
};
// actions
const actions = {
  myAction() {
    console.log("user模块 action的 myAction方法被触发了");
  },
  //获取用户信息
  // async getUserInfo({ commit }) {
  //   let result = await reqUserInfo();
  //   if (result.code == 200) {
  //     commit("SET_NICKNAME", result.data.nickName);
  //     return "ok";
  //   } else {
  //     return Promise.reject();
  //   }
  // },
  //检验token是否还有效
  /* `checkToken` 是一个函数，用于检查存储在本地存储中的令牌是否仍然有效。它使用 storage.get
  函数检索令牌并检查它是否有值。如果令牌无效，它会调用“CLEAR”突变以从状态和本地存储中清除用户信息。 */
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
  /* 这是一个用于登录用户的异步操作。它有两个参数 - `context` 和 `params`。它向服务器发送请求以使用“requestLogin”函数登录用户。然后它检查来自服务器的响应，如果状态为
  200，它会分别使用 `SET_TOKEN`、`SET_NICKNAME` 和 `SET_USERID` 突变将用户的令牌、昵称和 ID 提交到存储。它还使用 storage.set
  函数将令牌和昵称存储在本地存储中，并设置超时时间。最后，如果登录成功，它会使用来自服务器的消息解决一个承诺，如果没有成功，它会用错误消息拒绝这个承诺。 */
  async login(context, params) {
    let result = await requestLogin(params);
    let { data } = result;
    let userInformation = data.data;
    console.log("😜🏀[ userInformation ]-63", userInformation);
    console.log("data", data);
    console.log("result===>", result);
    if (data.status == 200) {
      context.commit("SET_TOKEN", userInformation.token);
      context.commit("SET_NICKNAME", userInformation.nickname);
      context.commit("SET_USERID", userInformation.id);
      context.commit("SET_USERINFO", userInformation);
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
      localStorage.setItem("USERINFO", JSON.stringify(userInformation));
      return Promise.resolve(data.message);
    } else {
      return Promise.reject(new Error(data.message));
    }
  },
  //注册的action逻辑
  /* 这是一个用于注册用户的异步操作。它有两个参数 - `context` 和
  `params`。它向服务器发出请求以使用“requestRegister”函数注册用户。然后它检查来自服务器的响应，如果状态为
  200，它会使用来自服务器的消息来解决承诺。否则，它会拒绝带有错误消息的承诺。 */
  async register(context, params) {
    let result = await requestRegister(params);
    console.log("😜🏀[ result ]-71", result);
    let { data } = result;
    console.log("data", data);
    console.log("result===>", result);
    if (data.status == 200) {
      return Promise.resolve(data.message);
    } else {
      return Promise.reject(new Error(data.message));
    }
  },
  //退出登录的业务
  /* 这是处理注销功能的异步操作。它有两个参数 - `commit` 和 `val`。 `val`参数是服务端需要销毁的token。 */
  async logout({ commit }, val) {
    console.log("[ val ] >", val);
    //发请求通知服务器销毁当前token【学生证】
    let result = await requestExitLogin(val);
    console.log("😜🏀[ result ]-131", result);
    let {
      data: { message, status },
    } = result;
    if (status == 200) {
      commit("CLEAR");
      return Promise.resolve(message);
    } else {
      return Promise.reject(new Error(message));
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
