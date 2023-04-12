<template>
  <div class="addressVue">
    <loading v-if="showLoading"></loading>
    <div class="address-list">
      <van-nav-bar
        title="地址列表"
        left-text="返回"
        left-arrow
        @click-left="goBack"
      />
      <!-- <van-cell-group>
        <van-cell
          v-for="(address, index) in addressList"
          :key="index"
          @click="selectAddress(address)"
        >
          <div class="cell-title">{{ address.name }}</div>
          <div class="cell-desc">{{ address.phone }}</div>
          <div class="cell-desc">
            {{ address.province }}{{ address.city }}{{ address.district
            }}{{ address.address }}
          </div>
          <van-icon
            class="cell-icon"
            :name="address.isDefault ? 'location-o' : 'location-o'"
          />
        </van-cell>
      </van-cell-group> -->
      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>
<script>
// import { mapState } from "vuex";
import loading from "@/common/loading.vue";
import { Toast } from "vant";
import store from "@/store";
export default {
  name: "addressList",
  data() {
    return {
      chosenAddressId: "1",
      showLoading: true,
      addressList: [
        // {
        // 	"id": 8,
        // 	"memberId": 35,
        // 	"name": "fw",
        // 	"phoneNumber": "13642444946",
        // 	"defaultStatus": 0,
        // 	"postCode": "518000",
        // 	"province": "广东省",
        // 	"city": "广州",
        // 	"region": "天河",
        // 	"detailAddress": "长隆"
        // },
      ],
      disabledList: [],
    };
  },
  components: {
    loading,
  },
  computed: {
    // ...mapState({
    //   addressList: (state) => state.address.list,
    // }),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    selectAddress(address) {
      // 将选中的地址存储到本地
      localStorage.setItem("selectedAddress", JSON.stringify(address));
      this.$router.go(-1);
    },
    goToAddAddress() {
      this.$router.push("/add-address");
    },
    onAdd() {
      Toast("新增地址");
    },
    onEdit(item, index) {
      this.$router.push({ name: "addressEdit" });
      Toast("编辑地址:" + index);
    },
  },
  async created() {
    try {
      let token = JSON.parse(store.state.user.TOKEN).value;
      let meg = await store.dispatch("goods/getAddressList", token);
      this.showLoading = false;
      Toast(meg);
    } catch (error) {
      Toast(error.message);
      console.log(error);
    }
    let list = store.state.goods.addressList;
    //拼接信息
    this.addressList = list.map((item) => {
      let {
        id,
        name,
        phoneNumber,
        province,
        city,
        region,
        detailAddress,
        defaultStatus,
      } = item;
      let address = province + city + region + detailAddress;
      return {
        id,
        name,
        tel: phoneNumber,
        address,
        isDefault: defaultStatus,
      };
    });
    // this.addressList
    if (!this.addressList.length) {
      Toast("请先添加收货地址");
      this.$router.push("/add-address");
    }
  },
};
</script>
<style scoped>
.addressVue {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #f2f2f2;
  z-index: 100;
}

.address-list {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 60px;
}

.cell-title {
  font-size: 16px;
  font-weight: 500;
}

.cell-desc {
  margin-top: 4px;
  font-size: 14px;
  color: #888;
}

.cell-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #999;
}

.add-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 16px;
  z-index: 10;
}
</style>
