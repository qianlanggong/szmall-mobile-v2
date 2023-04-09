<template>
  <div>
    <!-- <baseTitle title="商品列表" :back="true" @goBack="goBack"></baseTitle> -->
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
    <!-- 商品列表 -->
    <div class="goods-list">
      <van-dropdown-menu :z-index="99">
        <van-dropdown-item
          v-model="activeFilter"
          :title="filterTitles.all"
          :options="allOptions"
        ></van-dropdown-item>
        <van-dropdown-item
          v-model="activeFilter"
          :title="filterTitles.price"
          :options="priceOptions"
        ></van-dropdown-item>
        <van-dropdown-item
          v-model="activeFilter"
          :title="filterTitles.new"
          :options="newOptions"
        ></van-dropdown-item>
      </van-dropdown-menu>
      <div class="goods-container">
        <van-row gutter="10">
          <van-col v-for="item in filteredGoods" :key="item.id" :span="12">
            <div class="goods-item">
              <div class="goods-image">
                <img :src="item.image" alt="" />
              </div>
              <div class="goods-info">
                <div class="goods-name">{{ item.name }}</div>
                <div class="goods-price">￥{{ item.price.toFixed(2) }}</div>
              </div>
            </div>
          </van-col>
        </van-row>
        <van-empty v-if="filteredGoods.length === 0" description="暂无商品" />
      </div>
    </div>
    <!-- 商品列表 -->
  </div>
</template>
<script>
import { Toast } from "vant";
import { Col } from "vant";
export default {
  name: "productList",
  components: {
    "van-col": Col,
  },
  data() {
    return {
      filterTitles: {
        all: "综合",
        price: "价格",
        new: "新品",
      },
      allOptions: [
        { text: "无", value: "null" },
        { text: "综合", value: "all" },
      ],
      priceOptions: [
        { text: "无", value: "null" },
        { text: "价格", value: "price" },
      ],
      newOptions: [
        { text: "无", value: "null" },
        { text: "新品", value: "new" },
      ],
      activeFilter: "all",
      goods: [
        {
          id: 1,
          name: "商品1111111111111111",
          image: "https://dummyimage.com/300x300/000/fff",
          price: 50,
          new: false,
        },
        {
          id: 2,
          name: "商品2",
          image: "https://dummyimage.com/300x300/000/fff",
          price: 80,
          new: true,
        },
        {
          id: 3,
          name: "商品3",
          image: "https://dummyimage.com/300x300/000/fff",
          price: 20,
          new: true,
        },
        {
          id: 4,
          name: "商品4",
          image: "https://dummyimage.com/300x300/000/fff",
          price: 120,
          new: false,
        },
        {
          id: 5,
          name: "商品5",
          image: "https://dummyimage.com/300x300/000/fff",
          price: 60,
          new: false,
        },
        {
          id: 6,
          name: "商品6",
          image: "https://dummyimage.com/300x300/000/fff",
          price: 90,
          new: true,
        },
      ],
    };
  },
  methods: {
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
  },
  computed: {
    filteredGoods() {
      let goods = this.goods.slice(); // 复制原数组，避免修改原数据
      switch (this.activeFilter) {
        case "all":
          break; // 默认不需要排序和筛选
        case "price":
          goods.sort((a, b) => a.price - b.price);
          break;
        case "new":
          goods = goods.filter((item) => item.new);
          break;
      }
      return goods;
    },
  },
};
</script>
<style scoped>
.goods-list {
  padding: 10px;
}
.goods-container {
  margin-top: 10px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
}
.goods-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.goods-image {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}
.goods-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.goods-info {
  flex: 1;
}
.goods-info .goods-name {
  font-size: 16px;
  margin-bottom: 5px;
}
.goods-info .goods-price {
  font-size: 18px;
  color: #f60;
}
.goods-info .goods-name{
  width: 6.25rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
