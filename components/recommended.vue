<template>
  <div class="wrapper">
    <div class="seckill acea-row row-middle" v-if="activityData">
      <div class="trending-top" @click="gopage()">
        <span class="title">
          {{ activityData.name }}
        </span>
        <span class="iconfont icon-gengduo more"></span>
      </div>
      <div class="seckillList">
        <div v-swiper:myScroll="swiperScroll">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide item"
              v-for="(item, index) in activityData.productList"
              :key="index"
            >
              <div class="picTxt" @click="goDetail(item)">
                <!-- {{ item }} -->
                <div
                  class="pictrue"
                  :style="{ 'background-image': `url(${item.image}` }"
                ></div>

                <div class="line2 pro-info">{{ item.storeName }}</div>
                <div class="price">
                  <span>{{ GLOBAL.shopPayCurrency }}{{ item.price }}</span>

                  <span class="ot-price"
                    >{{ GLOBAL.shopPayCurrency }}{{ item.otPrice }}</span
                  >

                  <span class="percent-price">
                    {{
                      Math.round(
                        ((item.otPrice - item.price) / item.otPrice) * 100
                      )
                    }}% OFF
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev" slot="pagination"></div>
          <div class="swiper-button-next" slot="pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goShopDetail } from "@/utils/order.js";
import { Debounce } from "@/utils/validate.js";
export default {
  name: "promotion",
  props: {
    activityData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tempArr: [],
      params: {
        page: 1,
        limit: 10,
      },
      swiperOption: {
        pagination: {
          el: ".paginationBanner",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          disableOnInteraction: false,
          delay: 5000,
        },
        loop: true,
        speed: 1000,
        observer: true,
        observeParents: true,
      },
      swiperScroll: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        freeMode: true,
        freeModeMomentum: false,
        slidesPerView: "auto",
        observer: true,
        observeParents: true,
      },
    };
  },
  methods: {
    gopage: Debounce(function () {
      this.$router.push({
        path: "/goods/activity_list",
        query: {
          id: this.activityData.id,
          type: this.activityData.type,
          name: this.activityData.name,
        },
      });
    }),
    goDetail: Debounce(function (item) {
      goShopDetail(item.proId, this);
    }),
  },
};
</script>
<style lang="scss" scoped>
.percent-price {
  color: rgb(140, 140, 11);
  text-align: right;
  float: right;
  margin-right: 10px;
  font-size: 14px;
}
.seckill {
  width: 1200px;
  height: 413px;
  background: #ffffff;
  margin: auto;
  margin-top: 40px;

  .trending-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

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

  .seckillList {
    width: 1200px;
    height: 305px;
    background-color: #fff;
    position: relative;

    .swiper-wrapper {
      margin-left: 20px;
    }

    .item {
      cursor: pointer;
      display: inline-block;
      width: 288px;
      position: relative;

      .picTxt {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
      }

      & ~ .item:before {
        content: " ";
        position: absolute;
        width: 1px;
        height: 98px;
        background-color: #f4f4f4;
        top: 50%;
        margin-top: -49px;
      }

      .pictrue {
        margin: 0;
        width: 100%;
        height: 198px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      }

      .pro-info {
        width: 190px;
        height: 38px;
        margin-top: 10px;
      }

      .name {
        color: #282828;
        text-align: center;
        width: 164px;
        margin: 10px auto 0 auto;
      }

      .money {
        text-align: center;
        width: 164px;
        margin: 12px auto 0 auto;

        .font-color {
          font-weight: bold;
          font-size: 16px;
        }

        .y_money {
          color: #a3a3a3;
          text-decoration: line-through;
          margin-left: 6px;
        }
      }

      .title {
        margin: 10px 0 15px 20px;
      }

      .price {
        font-size: 16px;
        font-family: DINCond-Black, DINCond;
        font-weight: 900;
        color: #e93323;
        line-height: 15px;
        margin-top: 15px;

        .ot-price {
          font-size: 12px;
          font-family: DINPro-Regular, DINPro;
          font-weight: 400;
          color: #888888;
          line-height: 10px;
          text-decoration: line-through;
        }
      }
    }
  }
}

.swiper-button-next {
  background-image: url("../assets/images/right01.png");
  width: 25px;
  height: 34px;
  background-size: 100% 100%;
  right: 0;
}

.swiper-button-prev {
  background-image: url("../assets/images/left01.png");
  width: 25px;
  height: 34px;
  background-size: 100% 100%;
  left: 0;
}

.seckillList:hover .swiper-button-next {
  background-image: url("../assets/images/right02.png");
}

.seckillList:hover .swiper-button-prev {
  background-image: url("../assets/images/left02.png");
}
</style>
