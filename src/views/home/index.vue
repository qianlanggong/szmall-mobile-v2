<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div>我是home页面</div>
    <footerVue></footerVue>
  </div>
</template>
<script>
import footerVue from "@/common/footer.vue";
export default {
  name: "homeVue",
  data() {
    return {};
  },
  components: { footerVue },
};
</script>
<style scoped></style>
