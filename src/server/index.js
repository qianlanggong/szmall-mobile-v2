import axios from "axios";
//实例化一个axios
const baseURL = "/myapi";
const instance = axios.create({
  baseURL,
  timeout: 5000,
});
// 请求拦截
// instance.interceptors.request.use(
//   (config) => {
//     let token = JSON.parse(localStorage.getItem("TOKEN")).value;
//     // token = eval("(" + token + ")");
//     console.log(token);
//     // let token = 123123;
//     // if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//     config.headers.token = token;
//     //   //将token放到请求头发送给服务器
//     //   //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中 // config.headers['token'] = Token;
//     //   //config.headers.token的token是需要和后台定义叫什么的，我这里定义叫token了
//     // }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
//导出请求接口
export * from "./apis";
export default instance;
