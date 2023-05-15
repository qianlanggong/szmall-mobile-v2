<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="myself">
    <!-- <div>我是meself页面</div> -->
    <!-- 个人信息栏 -->
    <van-cell
      center
      title="个人信息"
      :icon="avatar"
      :label="nickname"
      :value="phone"
    />
    <!-- 订单栏 -->
    <van-card class="card">
      <template #tags>
        <h2 class="card-title">我的订单</h2>
        <van-cell-group>
          <van-grid :column-num="5">
            <van-grid-item v-for="item in items" :key="item.name">
              <van-icon :name="item.icon" size="24px" color="#888"></van-icon>
              <div>{{ item.title }}</div>
            </van-grid-item>
          </van-grid>
        </van-cell-group>
      </template>
    </van-card>
    <!-- 收货地址栏 -->
    <van-cell
      title="我的收货地址"
      :icon="address"
      is-link
      @click="goToAddress"
    />
    <!-- 功能栏 -->
    <van-cell-group>
      <van-cell title="收藏" icon="star-o" is-link @click="goToFavorite" />
      <van-cell title="足迹" icon="underway" is-link @click="goToFootprint" />
    </van-cell-group>
    <!-- 退出登录按钮栏 -->
    <div class="logout-button">
      <van-button type="primary" @click="logout"> 退出登录 </van-button>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import store from "@/store";
import { Toast } from "vant";
export default {
  name: "myseflf",
  data() {
    return {
      items: [
        { icon: "orders-o", title: "待付款" },
        { icon: "logistics", title: "待发货" },
        { icon: "after-sale", title: "待收货" },
        { icon: "comment-o", title: "待评价" },
        { icon: "refund-o", title: "售后" },
      ],
      avatar: null,
      nickname: null,
      phone: null,
      order: "orders-o",
      address: "location-o",
    };
  },
  methods: {
    goToFavorite() {
      // 跳转到收藏页面
    },
    goToFootprint() {
      // 跳转到足迹页面
    },
    goToOrder() {
      // 跳转到我的订单页面
    },
    goToToPay() {
      //  // 跳转到待付款页面
    },
    goToToShip() {
      // 跳转到待发货页面
    },
    goToToReceive() {
      // 跳转到待收货页面
    },
    goToToComment() {
      // 跳转到待评价页面
    },
    goToRefund() {
      // 跳转到退款/售后页面
    },
    goToAddress() {
      // 跳转到收货地址页面
      this.$router.push({ name: "addressList" });
    },
    async logout() {
      try {
        //请求成功
        let token = JSON.parse(store.state.user.TOKEN).value;
        let meg = await store.dispatch("user/logout", {
          id: store.state.user.USERINFO.id,
          token,
        });
        this.$router.push("home");
        Toast(meg);
      } catch (error) {
        //请求失败
        Toast(error.message);
        console.log(error.message);
      }
      console.log("退出");
      // 退出登录
    },
  },
  mounted() {},
  created() {
    this.nickname = store.state.user.USERINFO?.nickname ?? "heibi";
    this.avatar =
      store.state.user.USERINFO?.icon ??
      "https://avatars.githubusercontent.com/u/26635812?v=4";
    this.phone =
      store.state.user.USERINFO?.phone?.replace(
        /(\d{3})(\d{5})(\d{3})/g,
        "$1*****$3"
      ) ?? "138****8888";
  },
};
</script>
<style scoped>
.myself {
  background-color: rgba(140, 140, 140, 0.062);
  height: 100%;
}
.logout-button {
  margin: 20px auto;
  text-align: center;
}
.card {
  margin: 16px;
  border-radius: 8px;
  background-color: #fff;
}

.card-title {
  margin: 0;
  padding: 16px 0;
}

.order-grid {
  padding: 16px;
}
</style>
