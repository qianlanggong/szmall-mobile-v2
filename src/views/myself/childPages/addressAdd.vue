<template>
  <div class="addressAdd">
    <!-- 标题start -->
    <van-nav-bar
      title="地址添加"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <!-- 标题end -->
    <!-- 内容区start -->
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
    <!-- 内容区end -->
  </div>
</template>
<script>
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
import store from "@/store";
export default {
  name: "addressAdd",
  data() {
    return {
      areaList,
      searchResult: [],
      //   提交给接口要求的格式
      commitData: null,
      //   {
      //     memberId: 0,
      //     name: "",
      //     phoneNumber: "",
      //     defaultStatus: 0,
      //     postCode: "",
      //     province: "",
      //     city: "",
      //     region: "",
      //     detailAddress: "",
      //   }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async onSave(content) {
      try {
        let token = JSON.parse(store.state.user.TOKEN).value;
        let memberId = store.state.user.USERINFO.id;
        let {
          name,
          tel: phoneNumber,
          postalCode: postCode,
          province,
          city,
          county: region,
          addressDetail: detailAddress,
        } = content;
        const commitData = {
          memberId,
          name,
          phoneNumber,
          postCode,
          province,
          city,
          region,
          detailAddress,
          defaultStatus: 0,
        };
        //   console.log(commit);
        //   console.log(token);
        let message = await store.dispatch("goods/addressAdd", {
          token,
          data: commitData,
        });
        Toast(message);
        this.$router.push({ name: "addressList" });
      } catch (error) {
        Toast(error.message);
        console.log(error);
      }
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
.addressAdd {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #f2f2f2;
  z-index: 100;
}
</style>
