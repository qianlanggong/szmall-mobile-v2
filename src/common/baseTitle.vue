<template>
  <div>
    <div class="title border-bottom">
      <div class="left" v-if="back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <div class="shoptitle">{{ title }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "baseTitle",
  data() {
    return {};
  },
  props: {
    title: { type: String, default: "" },
    back: { type: Boolean, default: false },
  },
  methods: {
    goBack() {
      this.$emit("goBack");
    },
  },
};
</script>
<style scoped>
.title {
  height: 54px;
  line-height: 40px;
  background: #fff;
  text-align: center;
  padding: 0 15px;
  position: relative;
  z-index: 400;
}
.title .left {
  position: absolute;
  left: 0px;
  width: 40px;
}
.title .left i {
  font-weight: 700;
}
.title .shoptitle {
  font-size: 15px;
}
</style>
