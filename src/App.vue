<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
import store from "./store";
import { getUser } from "./server";
export default {
  name: "App",
  data() {
    return {
      token: store.state.user.TOKEN,
    };
  },
  components: {},
  mounted() {
    getUser().then((data) => {
      console.log(data.data);
    });
    store.commit("user/myMutation"); //mutation
    store.dispatch("user/myAction"); //action
  },
};
</script>

<style></style>
