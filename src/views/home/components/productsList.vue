<template>
  <div>
    <!-- 商品列表 -->
    <div>
      <div class="title">{{ title }}</div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item
        v-for="item in productList"
        :key="item.id"
        icon="photo-o"
        text="文字123"
      >
        <van-image :src="item.pic" width="100" height="100" lazy-load>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="van-ellipsis">{{ item.name | getPretext }}</div>
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
      required: true,
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
  mounted() {
  },
  filters: {
    getPretext(val) {
      return val.slice(0, 8) + "...";
    },
  },
};
</script>
<style scoped></style>
