<template>
  <div class="productList">
    <!-- 商品列表 -->
    <div v-if="!title === '商品列表'">
      <div class="title">{{ title }}</div>
    </div>
    <van-grid :column-num="2" :gutter="10">
      <van-grid-item
        v-for="item in productList"
        :key="item.id"
        icon="photo-o"
        text="文字123"
        @click="clickItem(item.id)"
      >
        <van-image :src="item.pic" width="100" height="100" lazy-load>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="van-ellipsis">{{ item.name | getPretext }}</div>
        <div class="price">{{ item.price | embellishPrice }}</div>
      </van-grid-item>
    </van-grid>

    <!-- 商品列表 -->
  </div>
</template>
<script>
export default {
  name: "productList",
  props: {
    title: {
      type: String,
      required: false,
      default: "商品列表",
    },
    productList: {
      type: [],
      required: false,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    clickItem(id) {
      this.$emit("clickItem", id);
    },
  },
  mounted() {},
  filters: {
    getPretext(val) {
      return val.slice(0, 8) + "...";
    },
    embellishPrice(val) {
      return `￥${val.toFixed(2)}`;
    },
  },
};
</script>
<style scoped>
.price {
  color: #ffd942;
}
</style>
