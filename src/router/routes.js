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
    children: [
      {
        path: "addressList",
        name: "addressList",
        component: () => import("@/views/myself/childPages/addressList.vue"),
        meta: {
          title: "我的地址列表",
        },
      },
      {
        path: "addressEdit",
        name: "addressEdit",
        component: () => import("@/views/myself/childPages/addressEdit.vue"),
        meta: {
          title: "地址编辑",
        },
      },
      {
        path: "addressAdd",
        name: "addressAdd",
        component: () => import("@/views/myself/childPages/addressAdd.vue"),
        meta: {
          title: "地址添加",
        },
      },
    ],
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
    children: [
      {
        path: "detail/:id",
        name: "productDetail",
        component: () => import("@/common/productDetail"),
        meta: {
          title: "商品详情页",
        },
      },
    ],
  },
];

export default routes;
