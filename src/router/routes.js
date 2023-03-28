// 定义路由路径
const routes = [
  // 重定向
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home"),
  },
  {
    path: "/myself",
    name: "myself",
    component: () => import("@/views/myself"),
  },
  {
    path: "/shopCart",
    name: "shopCart",
    component: () => import("@/views/shopCart"),
  },
];

export default routes;
