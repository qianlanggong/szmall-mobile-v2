<template>
  <div class="addressEdit">
    <van-nav-bar
      title="编辑地址"
      placeholder
      fixed
      left-arrow
      @click-left="goBack"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>
<script>
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
export default {
  name: "addressEdit",
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>
<style scoped>
.addressEdit {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #f2f2f2;
  z-index: 100;
}
</style>
