<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 底部标签栏 -->
    <footerVue></footerVue>
  </div>
</template>

<script>
import store from "./store";
import footerVue from "@/common/footer.vue";

export default {
  name: "App",
  data() {
    return {
      // 测试token
      token: store.state.user.TOKEN,
    };
  },
  components: { footerVue },
  mounted() {
    store.commit("user/myMutation"); //mutation
    store.dispatch("user/myAction"); //action
    // localStorage.setItem("TOKEN", new Date().toISOString());
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
