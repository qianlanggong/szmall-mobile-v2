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
export const requestExitLogin = (headers, id) =>
  requestWithToenAJSON("/portal/userMember/loginOut", "GET", headers, id);
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
export const requestAddreassList = (headers, id) =>
  requestWithToenAJSON(
    `/portal/member/address/list?memberId=${id}`,
    "GET",
    headers
  );
// 增加用户的收货地址
export const requestAddAddress = (headers, data) =>
  requestWithToenAJSON("/portal/member/address/add", "POST", headers, data);
//增加爱用户进行编辑地址的接口
export const requestEditAddress = (headers, data) =>
  requestWithToenAJSON(
    "/portal/member/address/getItem?id=5&memberId=11",
    "GET",
    headers,
    data
  );
//查看商品的详情页
export const requestProductDetail = (id) =>
  get(`/portal/psmProduct/detail/${id}`);
// 添加到个人购物车
export const requestAddCardList = (headers, data) =>
  requestWithToenAJSON("/portal/cart/add", "POST", headers, data);
// 获取购物车商品列表
export const requestCardList = (headers, id) =>
  requestWithToenAJSON(`/portal/cart/list?memberId=${id}`, "GET", headers);
