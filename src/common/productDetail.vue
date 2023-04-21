<template>
  <div class="productDetail">
    <van-nav-bar
      title="商品详情"
      left-arrow
      @click-left="goBack"
      :fixed="true"
      :placeholder="false"
      :border="false"
    />
    <div class="goods">
      <van-swipe class="goods-swipe" :autoplay="3000">
        <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
          <img :src="thumb" />
        </van-swipe-item>
      </van-swipe>

      <van-cell-group>
        <van-cell>
          <div class="goods-title">{{ product.name }}</div>
          <div class="goods-price">{{ formatPrice(product.price) }}</div>
        </van-cell>
        <van-cell class="goods-express">
          <van-col span="10">运费：{{ product.feightTemplateId }}</van-col>
          <van-col span="14">出售：{{ product.sale }}</van-col>
        </van-cell>
      </van-cell-group>

      <van-cell-group class="goods-cell-group">
        <van-cell title="选择规格" is-link @click="sorry" />
        <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
          <template #title>
            <span class="van-cell-text">{{ product.brandName }}</span>
            <van-tag class="goods-tag" type="danger">官方</van-tag>
          </template>
        </van-cell>
        <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
      </van-cell-group>
      <van-cell-group class="goods-cell-group">
        <van-cell title="图文详情" @click="sorry" />
        <div v-html="product.detailHtml"></div>
      </van-cell-group>

      <van-goods-action>
        <van-goods-action-icon icon="chat-o" @click="sorry">
          客服
        </van-goods-action-icon>
        <van-goods-action-icon icon="cart-o" @click="onClickCart">
          购物车
        </van-goods-action-icon>
        <van-goods-action-button type="warning" @click="addCart">
          加入购物车
        </van-goods-action-button>
        <van-goods-action-button type="danger" @click="sorry">
          立即购买
        </van-goods-action-button>
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { requestProductDetail } from "@/server";
export default {
  name: "productDetail",
  data() {
    return {
      product: null,
      carousel: null,
      goods: {
        title: "美国伽力果（约680g/3个）",
        price: 2680,
        express: "免运费",
        remain: 19,
        thumb: [
          "https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",
          "https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg",
        ],
      },
    };
  },
  async created() {
    let id = this.$route.params.id;
    try {
      let result = await requestProductDetail(id);
      let {
        data: {
          data: {
            product,
            //   skuStockLis,
            //   productAttributeList,
            //   productAttributeValueList,
          },
        },
      } = result;
      this.product = product;
    } catch (error) {
      console.log(error);
    }
    // let regex = /[a-zA-z]+:\/\/[^\s"]*/g;
    // this.carousel = this.product.detailHtml.test(regex);
    // console.log("😜🏀[  this.carousel ]-101", this.carousel);
    console.log("😜🏀[  this.product ]-94", this.product);
  },
  mounted() {
    console.log("[ this.$route.params.id ] >", this.$route.params.id);
  },

  methods: {
    formatPrice(val) {
      return "¥" + val.toFixed(2);
    },
    onClickCart() {
      //   this.$router.push("show");
    },
    sorry() {
      Toast("暂无后续逻辑~");
    },
    addCart() {},
    goBack() {
      // 返回上一页
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.productDetail {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #f2f2f2;
  z-index: 100;
}

.goods {
  height: 100%;
  overflow: auto;
  padding-bottom: 50px;
}
.goods-swipe img {
  width: 100%;
  display: block;
}
.goods-title {
  font-size: 16px;
}
.goods-price {
  color: #f44;
}
.goods-express {
  color: #999;
  font-size: 12px;
  padding: 5px 15px;
}
.goods-cell-group {
  margin: 15px 0;
}
.goods-cell-group .van-cell__value {
  color: #999;
}
.goods-tag {
  margin-left: 5px;
}
</style>
