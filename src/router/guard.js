//引入仓库
import store from "@/store";
//配置全局路由守卫
//参数路由器 router
export const createRouterGuards = async (router) => {
  await router.beforeEach((to, from, next) => {
    /* must call `next` */
    //to:去的那个路由的信息
    //from:从那个路由而来的信息
    //next:放行函数!!!!!!
    //用户是否登录:取决于仓库里面是否有token！！！
    //token
    let hasToken = store.state.user.TOKEN;
    //用户信息
    let hasNickName = store.state.user.nickName;
    //   如果没有token,跳转到登录页面
    if (!hasToken) return next("/login");
    //   路径判断
    if (to.name == "login") {
      next("/home");
    } else {
      //如果跳转的除login之外的页面：调用
      isHasNick(hasNickName, next);
    }
    next();
  });
  //如果跳转的除login之外的页面：定义
};
const isHasNick = async (hasNickName, next) => {
  // 判断是否有用户信息
  if (hasNickName) {
    next();
  } else {
    console.log("无用户信息HasNickName");
    //用户登陆了,但是没有用户信息
    // try {
    //   //发请求获取用户信息以后在放行
    //   await store.dispatch("user/getUserInfo");
    //   next();
    // } catch (error) {
    //   //用户没有信息，还携带token发请求获取用户信息【失败】
    //   //token【学生证失效了】
    //   //token失效:本地清空数据、服务器的token通知服务器清除
    //   await store.dispatch("logout");
    //   //回到登录页，重新获取一个新的学生证
    //   next("/login");
    // }
  }
};
