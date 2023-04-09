<template>
  <div>
    <component :is="topTab" :title="title"></component>
    <div class="scroll" ref="scrollContent">
      <slot></slot>
    </div>
  </div>
</template>
<script>
//引入调节内容区高度函数，和整体视口高度
import { adaptContentHeight, viewHight } from "@/utils";
// 引入顶部栏
import searchTab from "@/common/searchTab.vue";
import baseTitle from "@/common/baseTitle.vue";
export default {
  name: "contentView",
  data() {
    return {
      // 视口高度
      viewHight,
      topTab: "",
      title: "",
    };
  },
  components: { searchTab, baseTitle },
  watch: {
    //监视视口高度
    viewHight: {
      handler(nVal) {
        adaptContentHeight(this, "scrollContent", nVal);
      },
      immediate: true,
    },
    // 监视搜索词变化
    // 此代码正在监视 `` 对象的变化，该对象包含有关 Vue 路由器中当前路由的信息。 `immediate: true` 选项确保在挂载组件时在对 ``
    // 发生任何更改之前立即调用处理函数。
    $route: {
      immediate: true,
      handler() {
        let baseTitle = ["home", "category", "shopCart", "myself"];
        let name = this.$route.name;
        if (name == baseTitle[0]) {
          this.topTab = "searchTab";
        } else if (baseTitle.includes(name)) {
          this.topTab = "baseTitle";
          this.title = this.$route.meta.title;
        } else {
          this.topTab = "";
        }
      },
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
