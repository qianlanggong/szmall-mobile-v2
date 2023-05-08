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
        <van-swipe-item v-for="thumb in good.thumb" :key="thumb">
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
        <van-goods-action-button type="warning" @click="showBuyPage">
          加入购物车
        </van-goods-action-button>
        <van-goods-action-button type="danger" @click="showBuyPage">
          立即购买
        </van-goods-action-button>
        <div>
          <van-sku
            v-model="show"
            :sku="sku"
            :goods="goods"
            :goods-id="goodsId"
            :quota="quota"
            :quota-used="quotaUsed"
            :hide-stock="sku.hide_stock"
            :message-config="messageConfig"
            @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked"
          />
        </div>
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { requestProductDetail } from "@/server";
import store from "@/store";
export default {
  name: "productDetail",
  data() {
    return {
      product: {},
      carousel: null,
      good: {
        title: "美国伽力果（约680g/3个）",
        price: 2680,
        express: "免运费",
        remain: 19,
        thumb: [
          "https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",
          "https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg",
        ],
      },
      show: true, //展示showBuyPage与否
      goodsId: this.$route.params.id, //	商品 id
      quota: 2, //	限购数，0 表示不限购
      quotaUsed: 0, //已经购买过的数量
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "粉色", // skuValueName：规格值名称
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png", // 用于预览显示的规格类目图片
              },
              {
                id: "2",
                name: "黄色",
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-2.png",
                previewImgUrl: "https://b.yzcdn.cn/vant/sku/shoes-2.png",
              },
            ],
            largeImageMode: false, //  是否展示大图模式
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "留言", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "1", // 是否必填 '1' 表示必填
            placeholder: "", // 可选值，占位文本
            extraDesc: "", // 可选值，附加描述文案
          },
        ],
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://b.yzcdn.cn/vant/sku/shoes-1.png",
      },
      messageConfig: {
        // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
        uploadImg: () => {
          return new Promise((resolve) => {
            setTimeout(
              () =>
                resolve(
                  "https://img01.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg"
                ),
              1000
            );
          });
        },
        // 可选项，自定义图片上传逻辑，使用此选项时，会禁用原生图片选择
        customUpload: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve("https://img01.yzcdn.cn/vant/leaf.jpg");
            }, 1000);
          });
        },
        // 最大上传体积 (MB)
        uploadMaxSize: 3,
        // placeholder 配置
        placeholderMap: {
          text: "xxx",
          tel: "xxx",
        },
        // 初始留言信息
        // 键：留言 name
        // 值：留言内容
        initialMessages: {
          留言: "留言信息",
        },
      },
      goodData: {
        // 默认值
        productId: 26,
        productSkuId: 90,
        memberId: store.state.user.USERINFO.id,
        quantity: 1,
        productPic: "",
        productName: "华为 HUAWEI P20",
        productSubTitle:
          "AI智慧全面屏 6GB +64GB 亮黑色 全网通版 移动联通电信4G手机 双卡双待手机 双卡双待",
        productSkuCode: "201806070026001",
        memberNickname: "",
        deleteStatus: 1,
        productCategoryId: 19,
        productBrand: "",
        productSn: "",
        productAttr: "",
        price: 0,
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
      this.goodData.deleteStatus = this.product.deleteStatus;
      this.goodData.productName = this.product.name;
      this.goodData.productId = this.product.id;
      this.goodData.productSubTitle = this.product.subTitle;
      this.goodData.productSubTitle = this.product.subTitle;
      this.goodData.price = this.product.price;
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
      return "¥" + val?.toFixed(2);
    },
    // 跳转到购物车页面
    onClickCart() {
      this.$router.push({ name: "shopCart" });
    },
    sorry() {
      Toast("暂无后续逻辑~");
    },
    // 加入购物车
    showBuyPage() {
      this.show = true;
    },
    goBack() {
      // 返回上一页
      this.$router.go(-1);
    },
    //点击立即购买事件
    onBuyClicked(event) {
      console.log("😜🏀[ event ]-238", event);
    },

    //点击加入购物车事件
    async onAddCartClicked(event) {
      // let headers = {};
      console.log("goodData", this.goodData);
      try {
        let token = JSON.parse(store.state.user.TOKEN).value;
        console.log("😜🏀[ token ]-264", token);
        let meg = await store.dispatch("goods/AddCardList", {
          ...this.goodData,
          token,
        });
        this.show = false;
        Toast(meg);
      } catch (error) {
        Toast(error.message);
        console.log(error);
      }
      console.log("😜🏀[ event ]-243", event);
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
