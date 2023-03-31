//封装对应的get请求
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
export const requests = (url, method, data) =>
  new Promise((resolve, reject) => {
    instance({ url, method, data })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
