<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- <div>我是购物车页面</div> -->
    <div class="cart">
      <div v-if="cartList.length === 0" class="empty-cart">
        <van-icon name="cart-o" size="64" />
        <p>购物车是空的</p>
        <router-link to="/">去逛逛</router-link>
      </div>
      <van-cell-group v-else>
        <van-cell
          v-for="(item, index) in cartList"
          :key="item.id"
          :title="item.productName"
          :label="item.price + '元/个'"
          :icon="item.image"
          is-link
        >
          <!-- @click="gotoDetail(item.id)" -->
          <van-stepper
            slot="right-icon"
            v-model="item.quantity"
            @change="handleChange(index, $event)"
          />
        </van-cell>
      </van-cell-group>
      <div v-if="cartList.length > 0" class="cart-toolbar">
        <van-button type="primary" round @click="checkout">结算</van-button>
        <van-button type="danger" round @click="clearCart"
          >清空购物车</van-button
        >
        <div class="total-price">总价：{{ totalPrice }}元</div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { Toast } from "vant";
export default {
  name: "shopCart",
  data() {
    return {
      cartList: [],
      showEmpty: false, // 购物车是否为空
    };
  },
  computed: {
    totalPrice() {
      return this.cartList.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    // 这些是在 Vue 组件中定义的用于处理购物车功能的方法。
    addToCart(product) {
      const index = this.cartList.findIndex((item) => item.id === product.id);
      if (index === -1) {
        this.cartList.push({
          ...product,
          quantity: 1,
        });
      } else {
        this.cartList[index].quantity++;
      }
    },
    removeFromCart(index) {
      this.cartList.splice(index, 1);
    },
    clearCart() {
      this.cartList = [];
    },
    handleChange(index, value) {
      this.cartList[index].quantity = value;
    },
    // gotoDetail(productId) {
    //   this.$router.push(`/detail/${productId}`);
    // },
    checkout() {
      Toast("结算");
      // TODO: 处理结算逻辑
    },
  },

  async mounted() {
    try {
      let token = JSON.parse(store.state.user.TOKEN).value;
      let meg = await store.dispatch("shopCart/getshopCartList", {
        token,
        id: store.state.user.USERINFO.id,
      });
      Toast(meg);
    } catch (error) {
      Toast(error);
    }
    // this.cartList = JSON.parse(localStorage.getItem("cartList")) || [];
    // 使用 Vuex 商店的“state”对象中的“shopCartList”属性值初始化 Vue 组件的“cartList”数据属性。如果 `shopCartList`
    // 未定义或为假，则默认为空数组。
    this.cartList = store.state.shopCart["shopCartList"] || [];
  },
  watch: {
    cartList: {
      handler(val) {
        localStorage.setItem("cartList", JSON.stringify(val));
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 16px;
  color: #999;
}
.cart-toolbar {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
}
.total-price {
  font-size: 16px;
  color: #f60;
  font-weight: bold;
}
.van-cell .van-cell__left-icon {
  font-size: 5rem;
}
</style>
