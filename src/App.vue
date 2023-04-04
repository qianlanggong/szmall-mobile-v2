<template>
  <div id="app">
    <!-- 搜索栏 -->
    <searchTab></searchTab>
    <!-- 搜索栏 -->
    <contentView>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </contentView>
    <!-- 底部标签栏 -->
    <footerVue></footerVue>
  </div>
</template>

<script>
import store from "./store";
import footerVue from "@/common/footer.vue";
import contentView from "./common/contentView.vue";
import searchTab from "@/common/searchTab.vue";
export default {
  name: "App",
  data() {
    return {
      // 测试token
      token: store.state.user.TOKEN,
    };
  },
  components: { footerVue, contentView, searchTab },
  mounted() {
    store.commit("user/myMutation"); //mutation
    store.dispatch("user/myAction"); //action
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
</style>
