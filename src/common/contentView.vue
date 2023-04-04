<template>
  <div class="scroll" ref="scrollContent">
    <slot></slot>
  </div>
</template>
<script>
//引入调节内容区高度函数，和整体视口高度
import { adaptContentHeight, viewHight } from "@/utils";
export default {
  name: "contentView",
  data() {
    return {
      // 视口高度
      viewHight,
    };
  },
  watch: {
    //监视视口高度
    viewHight: {
      handler(nVal) {
        adaptContentHeight(this, "scrollContent", nVal);
      },
        immediate: true,
    },
  },
  mounted() {},
};
</script>
<style scoped>
.scroll {
  height: 100%;
  overflow: auto;
}
</style>
