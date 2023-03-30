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
import { getUser } from "./server";
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
    getUser().then((data) => {
      console.log(data.data);
    });
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
