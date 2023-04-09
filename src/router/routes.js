// 定义路由路径
const routes = [
  // 重定向
  {
    path: "*",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/category",
    name: "category",
    component: () => import("@/views/category"),
    meta: {
      title: "分类",
    },
  },
  {
    path: "/myself",
    name: "myself",
    component: () => import("@/views/myself"),
    meta: {
      title: "个人",
    },
  },
  {
    path: "/shopCart",
    name: "shopCart",
    component: () => import("@/views/shopCart"),
    meta: {
      title: "购物车",
    },
  },
  {
    path: "/productList",
    name: "productList",
    component: () => import("@/views/productList"),
    meta: {
      title: "商品列表",
    },
  },
];

export default routes;
