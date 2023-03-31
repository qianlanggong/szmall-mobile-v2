import { get, post, requests } from "./requestWay";
export const getUser = () => {
  return get("/user");
};
export const test02 = (url, params) => {
  return post(url, params);
};
//获取用户个人信息
export const reqUserInfo = () => requests({ url: `xxx`, method: "get" });
export const requestLogin = (data) =>
  requests("/portal/userMember/login", "post", data);
