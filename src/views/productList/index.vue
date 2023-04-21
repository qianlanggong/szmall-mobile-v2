<template>
  <div class="productList">
    <!-- <baseTitle title="商品列表" :back="true" @goBack="goBack"></baseTitle> -->
    <loading v-if="loading"></loading>
    <van-nav-bar
      title="商品列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- start商品筛选 -->
    <div class="selectType" ref="selectType" @click="selectType">
      <van-button
        color="#333"
        :class="{ selected: currentSelector == '综合' }"
        plain
        data-name="综合"
        >综合</van-button
      >
      <van-button
        color="#333"
        plain
        :class="{ selected: currentSelector == '价格' }"
        data-name="价格"
        ref="priceButton"
        >价格
        <van-icon name="arrow-up" v-show="sortWay == 3" />
        <van-icon name="arrow-down" v-show="sortWay == 4" />
      </van-button>
      <van-button
        color="#333"
        plain
        :class="{ selected: currentSelector == '新品' }"
        data-name="新品"
        >新品</van-button
      >
    </div>
    <!-- end商品筛选 -->
    <!-- start商品列表 -->
    <!-- <div class="products">
      <van-grid :border="false" :column-num="2" :gutter="20">
        <van-grid-item v-for="item in products" :key="item.id">
          <van-image fit="cover" lazy-load :src="item.pic">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
            <template v-slot:error>加载失败</template>
          </van-image>
          <div class="title">{{ item.subTitle }}</div>
          <div class="price">{{ item.price }}</div>
        </van-grid-item>
      </van-grid>
    </div> -->
    <productsList :productList="products" @clickItem="clickItem"></productsList>
    <!-- start点击查看更多 -->
    <van-row type="flex" justify="center">
      <van-button style="" color="#333" round plain @click="getMore">
        加载更多
      </van-button>
    </van-row>
    <!-- end点击查看更多 -->
    <router-view></router-view>
    <!-- end商品列表 -->
  </div>
</template>
<script>
import loading from "@/common/loading.vue";
import productsList from "@/common/productsList.vue";

import store from "@/store";
import { Toast } from "vant";
export default {
  name: "productList",
  components: {
    loading,
    productsList,
  },
  data() {
    return {
      // 这些是在 Vue 组件的数据对象中定义的属性。
      currentSelector: "综合",
      loading: true,
      pageNum: 1,
      pageSize: 10,
      sortWay: 0,
      products: [],
    };
  },
  methods: {
    async selectType(e) {
      let button = e.target;
      switch (button.dataset.name) {
        case "综合":
          this.sortWay = 0;
          break;
        case "价格":
          this.sortWay = this.sortWay == 3 ? 4 : 3;
          break;
        case "新品":
          this.sortWay = 1;
          break;
      }
      if (
        this.currentSelector === button.dataset.name &&
        this.currentSelector !== "价格"
      )
        return;
      this.loading = true;
      this.products = [];
      this.pageNum = 1;
      this.currentSelector = button.dataset.name;
      await this.getProductList();
      this.loading = false;
      this.goods = store.state.goods.productList;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      Toast("搜索");
    },
    goBack() {
      // 返回上一页
      this.$router.go(-1);
    },
    // 获取all商品列表数据
    async getProductList() {
      //整理参数
      const { pageNum, pageSize, sortWay } = this;
      this.pageNum++;
      // `pageNum: this.pageNum++, pageSize: this.pageSize, sortWay: this.sortWay` 是一个对象，作为参数传递给 Vuex
      // 存储中的 `getProducts` 操作。它包含产品列表的当前页码、请求数量大小和排序方式。每次调用 getProductList 方法时，`this.pageNum++` 都会将
      // `pageNum` 属性递增 1。
      let data = { pageNum, pageSize, sortWay };
      try {
        //请求成功
        let meg = await store.dispatch("goods/getProducts", data);
        this.products = store.state.goods.productList;
        Toast(meg);
      } catch (error) {
        //请求失败
        Toast(error.message);
      }
    },
    // 获取更多数据
    async getMore() {
      //整理参数
      const { pageNum, pageSize, sortWay } = this;
      this.pageNum++;
      let data = { pageNum, pageSize, sortWay };
      try {
        //请求成功
        let meg = await store.dispatch("goods/getMoreProcuts", data);
        Toast(meg);
      } catch (error) {
        //请求失败
        Toast(error.message);
      }
    },
    async clickItem(id) {
      this.$router.push({
        path: `/productList/detail/${id}`,
      });
    },
  },
  computed: {},
  async mounted() {
    await this.getProductList();
    this.goods = store.state.goods.productList;
    this.loading = false;
  },
};
</script>
<style lang="less" scoped>
.productList {
  background-color: rgba(241, 241, 241, 0.492);
  .selectType {
    display: flex;
    margin: 10px auto;
    width: 90%;
    justify-content: space-evenly;
    background-color: #fff;
    button {
      width: 6.25rem;
      border: none;
    }
    .selected {
      color: red !important;
    }
  }
  .products {
    .title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 100px;
      text-align: center;
    }
    .price {
      color: #ffd942;
    }
  }
}
</style>
