<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <loading v-if="loading"></loading>
    <!-- <div>我是home页面</div> -->
    <!-- 可垂直滚动区域 -->
    <div class="scroll">
      <!-- swipe轮播图 -->
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        @click="clickSwipe(event)"
        :stop-propagation="false"
        width="100%"
        height="195"
      >
        <van-swipe-item v-for="item in advertiseList" :key="item.id">
          <van-image :src="item.pic" fit="cover" width="100%"></van-image
        ></van-swipe-item>
      </van-swipe>
      <!-- swipe轮播图 -->
      <!-- 图标功能栏 -->
      <van-grid>
        <van-grid-item icon="shop" text="全部商品" @click="toProductList" />
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
      <!-- 商品列表 -->
    </div>
    <!-- 可垂直滚动区域 -->
  </div>
</template>
<script>
// 引入等待动画
import loading from "@/common/loading.vue";
// 引入产品列表提示
import { requestHomeProductList } from "@/server/apis.js";
import productsList from "@/common/productsList.vue";
import { Toast } from "vant";
export default {
  name: "homeVue",
  data() {
    return {
      advertiseList: "",
      newProductList: "",
      // 搜索内容值
      searchVal: "",
      //是否加载中
      loading: true,
    };
  },
  computed: {},
  // 注册组件
  components: { productsList, loading },
  methods: {
    // 轮播图事件
    clickSwipe(e) {
      console.log(e);
    },
    //搜索栏搜索事件
    onSearch() {
      Toast(this.searchVal);
    },
    // 跳转到商品列表页面 `toProductList()` 是当用户点击“全部商品”网格项时调用的方法。显示所有可用产品的列表
    toProductList() {
      this.$router.push("productList");
    },
  },
  async mounted() {
    //请求商品列表
    await requestHomeProductList().then((res) => {
      const { advertiseList, newProductList } = res.data.data;
      console.log("😜🏀[ newProductList ]-78", newProductList);
      console.log("😜🏀[ advertiseList ]-78", advertiseList);
      this.advertiseList = advertiseList;
      this.newProductList = newProductList;
      this.loading = false;
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
.scroll {
  height: 100%;
  overflow: auto;
}
</style>
