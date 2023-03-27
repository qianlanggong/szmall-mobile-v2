<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>111</div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { getUser } from "./server";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    getUser().then((data) => {
      console.log(data.data);
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
