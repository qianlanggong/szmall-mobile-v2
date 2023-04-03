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
    <div class="scroll" ref="scrollContent">
      <!-- swipe轮播图 -->
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        @click="clickSwipe(event)"
        :stop-propagation="false"
        width="392"
        height="195"
      >
        <van-swipe-item v-for="item in advertiseList" :key="item.id">
          <van-image
            :src="item.pic"
            fit="cover"
          ></van-image
        ></van-swipe-item>
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
      <productsList title="精品推荐"></productsList>
      <productsList
        title="精品推荐"
        :productList="advertiseList"
      ></productsList>
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
//引入搜索栏的高度，和底部导航栏的高度
import { searchHEIGHT, tabbarHEIGHT } from "./enum";
export default {
  name: "homeVue",
  data() {
    return {
      // 搜索内容值
      searchVal: "",
      advertiseList: "",
      newProductList: "",
      // 视口高度
      viewHight: document.documentElement.clientHeight,
    };
  },
  computed: {
    // 计算内容区的高度
    contentHight() {
      return this.viewHight - tabbarHEIGHT - searchHEIGHT;
    },
  },
  watch: {
    //监视视口高度
    viewHight: {
      handler(nVal) {
        this.setContentHeight(nVal);
      },
    },
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
    // clientWidth 处理兼容性
    getWindowClient() {
      return {
        width:
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
        height:
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight,
      };
    },
    // scrollTop兼容性处理
    getScrollTop() {
      return window.pageYOffset || document.documentElement.scrollTop;
    },
    // 重新设置内容区高度
    setContentHeight(value) {
      this.$refs.scrollContent.style.height =
        value - tabbarHEIGHT - searchHEIGHT + "px";
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
    //视口发生变化的钩子
    this.setContentHeight(this.viewHight);
    window.onresize = () => {
      this.viewHight = this.getWindowClient().height;
    };
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
  overflow: scroll;
}
</style>
