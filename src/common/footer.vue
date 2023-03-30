<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <van-tabbar v-model="active" @change="changePage" v-if="showNav">
      <van-tabbar-item icon="wap-home">商城</van-tabbar-item>
      <van-tabbar-item icon="wap-nav">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
    <!-- {{ showNav }}
    {{ routeName }} -->
  </div>
</template>
<script>
export default {
  name: "footerVue",
  data() {
    return {
      active: 0,
      //定义一个基本的路由
      BASE_ROUTER: ["/home", "/category", "/shopCart", "/myself"],
      // 获取当前的路由名称
      routeName: this.$route.name,
    };
  },
  methods: {
    changePage(e) {
      // console.log(e);
      this.$router.push(this.BASE_ROUTER[e]);
    },
  },
  computed: {
    showNav() {
      let showNavList = this.BASE_ROUTER.map(function (item) {
        return item.replace("/", "");
      });
      // console.log(showNavList);
      return showNavList.includes(this.routeName);
    },
  },
  watch: {
    // 监视路由切换，及时修改routeName的值
    $route: {
      handler(val) {
        this.routeName = val.name;
        // console.log(val); //新路由信息
        // console.log(oldval); //老路由信息
      },
      // 深度观察监听
      deep: true,
    },
  },
};
</script>
<style scoped></style>
