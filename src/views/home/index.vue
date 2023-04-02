<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <loading></loading>
    <!-- <div>我是home页面</div> -->
    <!-- 搜索栏 -->
    <van-search
      v-model="searchVal"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- 搜索栏 -->
    <!-- 可垂直滚动区域 -->
    <div class="scroll">
      <!-- swipe轮播图 -->
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        @click="clickSwipe(event)"
        :stop-propagation="false"
      >
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
      <!-- swipe轮播图 -->
      <!-- 图标功能栏 -->
      <van-grid>
        <van-grid-item icon="shop" text="全部商品" />
        <van-grid-item icon="coupon" text="优惠券" />
        <van-grid-item icon="point-gift" text="积分商品" />
        <van-grid-item icon="gift-card" text="积分签到" />
      </van-grid>
      <!-- 图标功能栏 -->
      <!-- 商品列表 -->
      <productsList
        title="精品推荐"
        :productList="newProductList"
      ></productsList>
      <productsList
        title="精品推荐"
        :productList="advertiseList"
      ></productsList>
      <productsList title="精品推荐"></productsList>
      <!-- 商品列表 -->
    </div>
    <!-- 可垂直滚动区域 -->
  </div>
</template>
<script>
// 引入弹窗提示
import { Toast } from "vant";
import { requestProductList } from "@/server/apis.js";
import loading from "@/common/loading.vue";
import productsList from "./components/productsList.vue";
export default {
  name: "homeVue",
  data() {
    return {
      // 搜索内容值
      searchVal: "",
      advertiseList: "",
      newProductList: "",
    };
  },
  // 注册组件
  components: { productsList, loading },
  methods: {
    //搜索栏搜索事件
    onSearch() {
      Toast(this.searchVal);
    },
    // 轮播图事件
    clickSwipe(e) {
      console.log(e);
    },
  },
  async mounted() {
    //请求商品列表
    await requestProductList().then((res) => {
      // console.log("😜🏀[ res ]-73", res.data);
      const { advertiseList, newProductList } = res.data.data;
      console.log("😜🏀[ newProductList ]-78", newProductList);
      console.log("😜🏀[ advertiseList ]-78", advertiseList);
      this.advertiseList = advertiseList;
      this.newProductList = newProductList;
    });
  },
};
</script>
<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.scroll{
  overflow: scroll;
}
</style>
