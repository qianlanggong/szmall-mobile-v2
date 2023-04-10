<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- <div>我是category页面</div> -->
    <div class="main" ref="category">
      <van-sidebar v-model="classifyKey" class="sidebar">
        <!-- 遍历渲染主类 -->
        <van-sidebar-item
          v-for="(item, i) in classify"
          :key="i"
          @click="classSwitch(i)"
          :title="item.name"
        />
      </van-sidebar>
      <div class="category">
        <!-- <div style="width: 258px; height: 92px; background: #bfa"></div> -->
        <!-- 遍历渲染二级分类 -->
        <van-grid :gutter="10" :column-num="3">
          <!-- v-for="(item, index) in 100" -->
          <van-grid-item
            v-for="(item, index) in category"
            :key="index"
            :icon="item.icon"
            :text="item.name"
            @click="clickCategory"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>
<script>
// 引入数据
import { requestCategoryList } from "@/server/apis.js";

export default {
  name: "category",
  data() {
    return {
      // 主类
      classify: [],
      classifyKey: 0,
      // 侧边内容
      category: [],
    };
  },
  methods: {
    classSwitch(i) {
      // 点击主类级别导航切换
      // this.classify = data.data;
      // 根据i进行二级菜单筛选
      this.category = this.classify[i].children;
    },
    clickCategory() {
      console.log("点击了clickCategory");
    },
  },
  async mounted() {
    try {
      await requestCategoryList().then((res) => {
        // 结构出分类数据
        const {
          data: { data },
        } = res;
        console.log("😜🏀[ data ]-68", data);
        this.classify = data;
        this.category = data[0].children;
      });
    } catch (error) {
      console.log("[ error ] >", error);
    }
  },
};
</script>
<style scoped>
div.main {
  display: flex;
  /* height: 600px; */
  overflow: auto;
}
div.sidebar {
  flex: 0.3;
}
div.category {
  flex: 1;
}
</style>
