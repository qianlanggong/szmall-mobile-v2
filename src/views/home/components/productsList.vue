<template>
  <div>
    <!-- 商品列表 -->
    <div>
      <div class="title">{{ title }}</div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item
        v-for="value in 4"
        :key="value"
        icon="photo-o"
        text="文字"
      />
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
  },
  data() {
    return {};
  },
};
</script>
<style scoped></style>
