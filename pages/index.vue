<template>
  <div class="container">
    <div class="banner">
      <div class="slider-banner">
        <el-carousel height="480px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <el-image class="img" :src="item.pic">
              <div slot="placeholder" class="image-slot">
                loading<span class="dot">...</span>
              </div>
            </el-image>
            <div class="box"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div v-for="item in actList" :key="item.id">
      <recommended v-if="item.type === 1" :activityData="item"></recommended>
      <promotions v-if="item.type === 2" :activityData="item"></promotions>
      <first-new v-if="item.type === 3" :activityData="item"></first-new>
    </div>
    <!-- 店铺街 -->
    <!-- <div class="brandstore"> -->
    <!-- <div class="left">
        <div class="left-top" @click="gopage()">
          <div class="title">{{ $t(`page.index.shopStreet`) }}</div>
          <span class="iconfont icon-gengduo"></span>
        </div>
        <div class="left-bottom">
          <div class="left-bottom-left">
            <el-carousel indicator-position="none">
              <el-carousel-item v-for="(item, index) in storeList" :key="index">
                <div style="height: 3px">
                  <div>
                    <el-image
                      class="backImg img"
                      :src="item.backImage"
                      @click="goMerchant(item)"
                    >
                      <div slot="placeholder" class="image-slot">
                        loading<span class="dot">...</span>
                      </div>
                    </el-image>
                  </div>
                  <div class="logo">
                    <el-image class="img" :src="item.avatar">
                      <div slot="placeholder" class="image-slot">
                        loading<span class="dot">...</span>
                      </div>
                    </el-image>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="left-bottom-right">
            <div
              @click="goMerchant(item)"
              class="logo"
              v-for="(item, index) in storeList.slice(0, 6)"
              :key="index"
            >
              <el-image class="img" :src="item.avatar">
                <div slot="placeholder" class="image-slot">
                  loading<span class="dot">...</span>
                </div>
              </el-image>
            </div>
          </div>
        </div>
      </div> -->
    <!-- TOP ONE -->
    <!-- <div class="right">
        <div class="right-top" @click="goTopone()">
          <div class="title">{{ $t(`page.index.topOne`) }}</div>
          <span class="iconfont icon-gengduo"></span>
        </div>
        <div class="right-bottom">
          <img class="pic pic1" src="../assets/images/top-list0.png" alt="" />
          <img class="pic pic2" src="../assets/images/top-list1.png" alt="" />
          <img class="pic pic3" src="../assets/images/top-list2.png" alt="" />
          <div
            class="goods"
            v-for="(item, index) in toponeList"
            :key="index"
            @click="goDetail(item)"
          >
            <el-image class="img" :src="item.image">
              <div slot="placeholder" class="image-slot">
                loading<span class="dot">...</span>
              </div>
            </el-image>
            <div class="title line2">
              {{ item.storeName }}
            </div>
            <span class="price">{{ item.price }}</span>
          </div>
        </div>
      </div> -->
    <!-- </div> -->

    <!-- 活动列表 -->
    <div v-for="item in activityindexList" :key="item.id">
      <recommended v-if="item.type === 1" :activityData="item"></recommended>
      <promotions v-if="item.type === 2" :activityData="item"></promotions>
      <first-new v-if="item.type === 3" :activityData="item"></first-new>
    </div>
    <!-- 轮播广告 -->
    <!-- <div class="ad">
      <el-carousel width="100%" height="120px" indicator-position="none">
        <el-carousel-item v-for="item in adList" :key="item.id">
          <el-image class="img" :src="item.pic">
            <div slot="placeholder" class="image-slot">
              loading<span class="dot">...</span>
            </div>
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div> -->

    <div class="product">
      <div class="product-top">
        <span class="title"> {{ $t(`page.index.titAlso`) }} </span>
      </div>

      <div class="product-bottom">
        <div class="brandshop" v-if="productList.length">
          <!-- 这里展示的是推荐商品暂时去掉 -->
          <!-- <div class="left">
            <el-image class="img" :src="list.recommendImage">
              <div slot="placeholder" class="image-slot">
                loading<span class="dot">...</span>
              </div>
            </el-image>
          </div> -->

          <div class="store">
            <div class="wrapper">
              <div
                @click="goDetail(item)"
                class="goods_item imgItem"
                v-for="item in productList.slice(0, 8)"
                :key="item.id"
              >
                <div
                  class="img"
                  :style="{ 'background-image': `url(${item.image}` }"
                ></div>
                <div class="goods_content">
                  <div class="lines2 store_name1">
                    {{ item.storeName }}
                  </div>
                  <div class="acea_row">
                    <div class="price1">
                      {{ GLOBAL.shopPayCurrency }}{{ item.price }}
                    </div>

                    <span class="ot-price"
                      >{{ GLOBAL.shopPayCurrency }}{{ item.otPrice }}</span
                    >



             

                    <div class="ot_price">
                      <span class="percent-price">
                        {{
                          Math.round(
                            ((item.otPrice - item.price) / item.otPrice) * 100
                          )
                        }}% OFF
                      </span>
                      <span
                        >{{
                          Math.floor(item.sales) + Math.floor(item.ficti) || 0
                        }}
                        {{ $t(`page.goodsDetail.sold`) }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom" v-if="productList.length > 8">
        <product :productList="productList.slice(8)"></product>
      </div>
    </div>
    <!-- 加载更多 -->
    <div
      class="loadingicon acea-row row-center-wrapper"
      v-if="productList.length && productList.length >= limits"
    >
      <span class="loading iconfont icon-jiazai" v-if="!pullRefreshss"></span>
    </div>
    <!--右侧浮窗-->
    <!-- <FloatWindow></FloatWindow> -->
  </div>
</template>

<script>
import recommended from "@/components/recommended.vue";
import promotions from "@/components/promotions.vue";
import firstNew from "@/components/first_new.vue";
import { goMerchant, goShopDetail } from "@/utils/order.js";

import product from "@/components/product.vue";

export default {
  name: "IndexPage",
  auth: false,
  components: {
    recommended,
    promotions,
    firstNew,
    product,
  },
  data() {
    return {
      seen: false,
      hide: true,
      activityindexList: [],
      storeList: [],
      bannerList: [],
      colors: ["#99A9BF", "#E93323", "#E93323"],
      visible: false,
      recommendList: [],
      productList: [],
      adList: [],
      goodsList: [],
      MerTypeList: [],
      categoryCurrent: [],
      toponeList: [],
      list: [],
      actList: [],
      pullRefreshss: true,
      page: 1, //代表页面的初始页数
      limit: 10,
      limits: 13,
      scollY: null, // 离底部距离有多少
      pageTotal: 0, //总页数
    };
  },
  async asyncData({ app, error, store }) {
    typeof localStorage !== "undefined" && window.localStorage.clear();
    let [list, storeList, activityindexList, toponeList, proList] =
      await Promise.all([
        app.$axios.get("/api/pc/home/index"),
        app.$axios.get("/api/front/merchant/street"),
        app.$axios.get("/api/front/activity/index/list"),
        app.$axios.get("/api/front/product/leaderboard"),
        app.$axios.get("/api/front/index/product", {
          params: {
            page: 1,
            limit: 13,
          },
        }),
        app.$axios.get("/api/front/activity/index/list"),
      ]);
    typeof localStorage !== "undefined" &&
      localStorage.setItem("homeDataPc", JSON.stringify(list.data));
    return {
      list: list.data,
      bannerList: list.data.banner,
      adList: list.data.bastBanner,
      storeList: storeList.data.list,
      activityindexList: activityindexList.data,
      actList: activityindexList.data.splice(0, 1),
      toponeList: toponeList.data.splice(0, 3),
      proList: proList.data.list,
    };
  },
  beforeDestroy() {
    window.onscroll = null;
  },
  beforeMount() {
    this.getList();
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
    this.$cookies.set("merPlatChatConfig", {
      serviceEmail: this.list.consumerEmail,
      serviceLink: this.list.consumerH5Url,
      servicePhone: this.list.consumerHotline,
      serviceMessage: this.list.consumerMessage,
      serviceType: this.list.consumerType,
    });
    this.pullRefresh();
  },
  methods: {
    goDetail(item) {
      goShopDetail(item.id, this);
    },
    goTopone() {
      this.$router.push({
        path: "/goods/top_one",
      });
    },
    watchScroll() {
      let _this = this;
      this.scollY =
        this.comsys.getScrollTop() +
        this.comsys.getWindowHeight() -
        this.comsys.getScrollHeight();
      // 把下拉刷新置为false，防止多次请求
      if (this.scollY >= -50) {
        if (this.page >= Math.ceil(this.pageTotal / this.limits)) {
          this.pullRefreshss = true;
          return false;
        }
        if (!this.pullRefreshss) {
          return false;
        }
        _this.pullRefreshss = false;
        if (_this.productList.length < _this.pageTotal) {
          // 加页码数
          _this.page++;
          _this.getList();
        }
      } else {
        // 其他时候把下拉刷新置为true
        _this.pullRefreshss = true;
      }
    },
    getList() {
      let currentPage = { page: this.page, limit: this.limits };
      this.$axios
        .get(`/api/front/index/product`, {
          params: currentPage,
        })
        .then((res) => {
          this.pageTotal = res.data.total;
          let proList = res.data.list;
          this.productList = this.productList.concat(proList);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    gopage() {
      this.$router.push({
        path: "/merchant/merchant_street",
      });
    },
    goMerchant(item) {
      goMerchant(item.id, this);
    },
    // 下拉加载ajax
    pullRefresh: function () {
      let _this = this;
      window.onscroll = function () {
        _this.watchScroll();
      };
    },
  },
};
</script>
<style lang="scss" scoped>




.container {
  width: 100%;
  flex: 1;

  .banner {
    width: 100%;
    height: 480px;
    margin: auto;
    position: relative;
    min-width: 1200px;

    .slider-banner {
      width: 100%;
      margin: auto;

      ::v-deep .el-carousel__arrow--left {
      }
    }

    .nav-tabs {
      width: 260px;
      height: 480px;
      background: #242424;
      opacity: 0.85;
      position: absolute;
      top: 0;
      left: 360px;
      z-index: 99;
    }

    .img {
      width: 100%;
      height: 100%;
    }
  }

  .brandstore {
    width: 1200px;
    height: 413px;
    margin: auto;
    display: flex;
    margin-top: 40px;

    .left {
      width: 590px;
      height: 413px;
      background: url("../assets/images/storeShop.png") no-repeat;
      display: flex;
      flex-wrap: wrap;
      margin-right: 15px;

      .left-top {
        width: 100%;
        height: 90px;
        color: #000;
        display: flex;
        justify-content: space-between;
        cursor: pointer;

        .title {
          font-size: 20px;
          font-family: Arial-BoldMT, Arial;
          font-weight: normal;
          line-height: 20px;
          margin: 20px 0 43px 20px;
        }

        .iconfont {
          margin-top: 20px;
          margin-right: 20px;
        }

        .more {
          font-size: 16px;
          font-family: ArialMT;
          line-height: 16px;
          margin-left: 71px;
        }

        .icon {
          width: 12px;
          height: 12px;
          display: inline-block;
          border: 1px solid #fff;
          opacity: 0.8;
          border-radius: 50%;
          font-size: 12px;
        }
      }

      .left-bottom {
        width: 100%;
        height: 305px;
        display: flex;
        flex-wrap: wrap;
        margin: 0 20px 20px 20px;

        .left-bottom-left {
          width: 243px;
          cursor: pointer;

          .logo {
            width: 241px;
            height: 64px;
            margin-top: 10px;
            display: flex;
            justify-content: center;

            .img {
              width: 96px;
              height: 48px;
            }
          }

          .backImg {
            width: 241px;
            height: 241px;
            display: inline-block !important;
          }
        }

        .left-bottom-right {
          width: 306px;
          height: 304px;

          .logo {
            width: 150px;
            height: 101px;
            background: #ffffff;
            padding: 32px;
            margin: 1px;
            float: left;
            cursor: pointer;

            .img {
              width: 90px;
              height: 36px;
            }
          }
        }
      }
    }

    .right {
      width: 590px;
      height: 413px;
      background: url("../assets/images/topOne.png") no-repeat;
      display: flex;
      flex-wrap: wrap;

      .right-top {
        width: 100%;
        height: 90px;
        color: #000;
        display: flex;
        justify-content: space-between;
        cursor: pointer;

        .title {
          font-size: 20px;
          font-family: Arial-BoldMT, Arial;
          font-weight: normal;
          line-height: 20px;
          margin: 20px 0 43px 20px;
        }

        .iconfont {
          margin-top: 20px;
          margin-right: 20px;
        }

        .more {
          font-size: 16px;
          font-family: ArialMT;
          line-height: 16px;
          margin-left: 71px;
        }

        .icon {
          width: 12px;
          height: 12px;
          display: inline-block;
          border: 1px solid #fff;
          opacity: 0.8;
          border-radius: 50%;
          font-size: 12px;
        }
      }

      .right-bottom {
        width: 100%;
        height: 313px;
        display: flex;
        position: relative;

        .pic {
          position: absolute;
          width: 36px;
          height: 44px;
          z-index: 99;
        }

        .pic1 {
          left: 30px;
        }

        .pic2 {
          left: 220px;
        }

        .pic3 {
          left: 410px;
        }

        .goods {
          width: 170px;
          margin-left: 20px;
          cursor: pointer;

          .img {
            width: 170px;
            height: 170px;
          }

          .title {
            width: 100%;
            height: 44px;
            font-size: 16px;
            font-family: ArialMT;
            color: #333333;
            line-height: 22px;
            margin: 15px 0 30px 0;
          }

          .price {
            font-size: 20px;
            font-family: DINCond-Black, DINCond;
            font-weight: 900;
            color: #e93323;
            line-height: 24px;
            margin-left: 46px;
          }
        }
      }
    }
  }

  .product {
    width: 1200px;
    margin: auto;

    .product-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 26px;
        text-align: center;
        margin: 28px 20px;
      }

      .more {
        font-size: 14px;
        text-align: center;
        float: right;
        color: #666;
        margin-right: 20px;
      }
    }

    .product-bottom {
      display: flex;
      flex-wrap: wrap;

      .brandshop {
        display: flex;
      }

      .left {
        width: 288px;
        height: 675px;
        background: #fff;
        margin: 0 15px 15px 0;
        float: left;

        .img {
          width: 288px;
          height: 675px;
        }
      }
      .store {
        //  background: red;
      }
      .goods_item {
        display: inline-block;
        width: 288px;
        height: 330px;
        margin-right: 15px;

        background: #ffffff;
        cursor: pointer;

        .img {
          margin: 0;
          width: 100%;
          height: 198px;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
        }

        .goods_content {
          margin-top: 10px;
          .store_name {
            height: 44px;
            margin: 0 22px 20px 15px;
            font-size: 16px;
            font-family: ArialMT;
            color: #333333;
            line-height: 22px;
          }

          .lines2 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        .acea_row {
          .price {
            font-size: 18px;
            font-family: DINCond-Black, DINCond;
            font-weight: 900;
            color: #e93323;
            line-height: 15px;
            margin-left: 15px;
            float: left;
          }


          .ot-price {
            font-size: 12px;
            font-family: DINPro-Regular, DINPro;
            font-weight: 400;
            color: #888888;
            line-height: 10px;
            text-decoration: line-through;
          }

          .percent-price {
            color: rgb(140, 140, 11);
            text-align: right;
           
            margin-right: 10px;
            font-size: 14px;
          }

          .ot_price {
            font-size: 12px;
            font-family: ArialMT;
            color: #999999;
            line-height: 24px;
            float: right;
            margin-right: 12px;
          }
        }
      }
      .goods_item:nth-child(3n) {
        margin-right: 0 !important;
      }
    }
  }

  .ad {
    width: 1200px;
    height: 120px;
    margin: auto;
    margin-top: 40px;

    .img {
      width: 100%;
      height: 120px;
    }
  }

  .el-carousel__item.is-animating {
    display: flex;
  }
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.wrapper {
  .goods_item {
    display: inline-block;
    margin: 0 13px 15px 0;
    background: #ffffff;

    .img {
      margin: 20px 20px 8px;
    }

    .goods_content {
      .store_name {
        height: 44px;
        margin: 0 22px 13px 15px;
        font-size: 16px;
        color: #333333;
        line-height: 22px;
      }

      .store_name1 {
        height: 44px;
        margin: 0 22px 20px 15px;
        font-size: 16px;
        color: #333333;
        line-height: 22px;
      }

      .lines2 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .acea_row1 {
      display: flex;
    }

    .acea_row {
      margin-left: 15px;
      justify-content: space-between;

      .price1 {
        font-size: 16px;
        font-weight: 900;
        color: #e93323;
        line-height: 20px;
        margin-bottom: 9px;
        display: inline-block;

        .sold {
          font-size: 12px;
          color: #999999;
          margin-right: 15px;
        }
      }

      .ot_price {
        font-size: 12px;
        font-weight: 400;
        color: #888888;
        line-height: 12px;
        display: flex;
        justify-content: space-between;
        margin-right: 20px;

        .lines {
          text-decoration: line-through;
        }
      }

      .ot_price1 {
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        line-height: 29px;

        .lines {
          text-decoration: line-through;
        }
      }
    }
  }

  .imgItem {
    width: 228px;
    height: 330px;
  }
}

.goods_item:nth-child(4n) {
  // margin-right: 0 !important;
}

.topindeximg1 {
  width: 54px;
  height: 66px;
  position: absolute;
  left: 900px;
  background-image: url("../assets/images/01.png");
}

.topindeximg2 {
  width: 54px;
  height: 66px;
  position: absolute;
  left: 1090px;
  background-image: url("../assets/images/02.png");
}

.topindeximg3 {
  width: 54px;
  height: 66px;
  position: absolute;
  left: 1280px;
  background-image: url("../assets/images/03.png");
}
</style>
