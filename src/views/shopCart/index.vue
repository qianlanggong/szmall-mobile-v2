<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <baseTitle title="购物车"></baseTitle>
    <div>我是购物车页面</div>
  </div>
</template>
<script>
import baseTitle from "@/common/baseTitle.vue";

export default {
  name: "shopCart",
  data() {
    return {};
  },
  components: { baseTitle },
};
</script>
<style scoped></style>
