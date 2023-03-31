import axios from "axios";
//实例化一个axios
const baseURL = "/api";
export const instance = axios.create({
  baseURL,
  timeout: 5000,
});
//导出请求接口
export * from "./apis";
