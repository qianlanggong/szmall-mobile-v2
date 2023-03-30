import Vue from "vue";
import Router from "vue-router";
//引入路由相关的配置项
import routes from "./routes";
import { createRouterGuards } from "./guard.js";
//安装插件
Vue.use(Router);
// 创建router实例
const router = new Router({ routes });
createRouterGuards(router);
export default router;
