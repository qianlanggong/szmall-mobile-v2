import { get, post, requests } from "./requestWay";
export const getUser = () => {
  return get("/user");
};
export const test02 = (url, params) => {
  return post(url, params);
};
//获取用户个人信息
export const reqUserInfo = () => requests({ url: `xxx`, method: "get" });
//请求登录的接口
export const requestLogin = (data) =>
  requests("/portal/userMember/login", "post", data);
// 请求注册的接口
export const requestRegister = (data) =>
  requests("/portal/userMember/register", "post", data);
// 请求商品数据的接口
export const requestProductList = () => get("/portal/home/content");
