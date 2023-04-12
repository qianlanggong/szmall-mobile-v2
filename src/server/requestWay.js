//封装对应的get请求
// import store from "@/store";
import instance from "./index";
export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, { params })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
//封装对应的post请求
export const post = (url, param) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, param)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
//封装对应的通用的request请求
// let token = store.state.user.TOKEN;
// let headers = {
//   Authorization: `Bearer ${token}`,
//   "Content-Type": "application/json",
// };
export const requestWithToenAJSON = (url, method,headers, data = null) =>
  new Promise((resolve, reject) => {
    instance({ url, method, headers, data })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
