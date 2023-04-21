import { get, post, requestWithToenAJSON } from "./requestWay";
export const getUser = () => {
  return get("/user");
};
export const test02 = (url, params) => {
  return post(url, params);
};
//获取用户个人信息
// export const reqUserInfo = () => requests({ url: `xxx`, method: "get" });
//请求登录的接口
export const requestLogin = (data) => post("/portal/userMember/login", data);
// 请求注册的接口
export const requestRegister = (data) =>
  post("/portal/userMember/register", data);
// 请求退出用户的接口
export const requestExitLogin = (id) => post("/portal/userMember/loginOut", id);
// 请求首页商品数据的接口
export const requestHomeProductList = () => get("/portal/home/content");
// 请求分类数据的接口
export const requestCategoryList = () =>
  get("/portal/psmProduct/categoryTreeList");
// 请求全部商品列表的数据
export const requestAllProductList = (data) =>
  get(
    `/portal/psmProduct/search?pageNum=${data.pageNum}&pageSize=${data.pageSize}&sort=${data.sortWay}`
  );
// 获取更多商品
export const requestMoreProducts = (data) =>
  get(
    `/portal/psmProduct/search?pageNum=${data.pageNum}&pageSize=${data.pageSize}&sort=${data.sortWay}`
  );
// 获取用户的所有收货地址
export const requestAddreassList = (headers, data) =>
  requestWithToenAJSON("/portal/member/address/list", "GET", headers, data);
// 增加用户的收货地址
export const requestAddAddress = (headers, data) =>
  requestWithToenAJSON("/portal/member/address/add", "POST", headers, data);
export const requestProductDetail = (id) =>
  get(`/portal/psmProduct/detail/${id}`);
