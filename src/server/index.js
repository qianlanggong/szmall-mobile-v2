import axios from "axios";
//实例化一个axios
const baseURL = "/myapi";
const instance = axios.create({
  baseURL,
  timeout: 5000,
});
//导出请求接口
export * from "./apis";
export default instance;
