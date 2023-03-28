<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <van-tabbar v-model="active" @change="changePage">
      <van-tabbar-item icon="wap-home">商城</van-tabbar-item>
      <van-tabbar-item icon="wap-nav">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "footerVue",
  data() {
    return { active: 0 };
  },
  methods: {
    changePage(e) {
      console.log(e);
    },
  },
};
</script>
<style scoped></style>
