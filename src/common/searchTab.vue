<template>
  <div>
    <!-- 搜索栏 -->
    <van-search
      v-model="searchVal"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- 搜索栏 -->
  </div>
</template>
<script>
// 引入弹窗提示
import { Toast } from "vant";
export default {
  name: "searchTabVue",
  data() {
    return {
      // 搜索内容值
      searchVal: "",
    };
  },
  methods: {
    //搜索栏搜索事件
    onSearch() {
      Toast(this.searchVal);
    },
  },
};
</script>
<style scoped></style>
