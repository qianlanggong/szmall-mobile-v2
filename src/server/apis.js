import { get, post } from "./requestWay";
export const getUser = () => {
  return get("/user");
};
export const test02 = (url, params) => {
  return post(url, params);
};
