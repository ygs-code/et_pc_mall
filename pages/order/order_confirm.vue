<template>
  <div class="order_confirm wrapper_1200">
    <div class="header">
      <nuxt-link class="home" to="/"
        >{{ $t(`userDrawer.data[0].name`) }}
      </nuxt-link>
      <span> > {{ $t(`page.users.orderConfirm.navTitle`) }} </span>
    </div>
    <!--选择地址-->
    <div class="address">
      <div class="title">{{ $t(`page.orderDetails.address`) }}</div>
      <div class="lines">
        <img src="../../assets/images/line.png" />
      </div>
      <div class="list acea-row row-middle" :class="isShow ? 'on' : ''">
        <div
          class="item"
          :class="current === index ? 'on' : ''"
          v-for="(item, index) in addressList"
          :key="index"
          @click="tapCurrent(index, item)"
        >
          <div class="default bg-color" v-if="item.isDefault">
            {{ $t(`page.goodsList.default`) }}
          </div>
          <div class="name line1">{{ item.realName }}</div>
          <div class="phone">{{ item.phone }}</div>
          <div class="details line4">{{ item.country }}{{ item.detail }}</div>
          <div
            class="iconfont icon-xuanzhong4 font-color"
            v-if="current === index"
          ></div>
        </div>
        <div class="item add" @click="addAddress">
          <div class="iconfont icon-tianjia"></div>
          <div class="tip">{{ $t(`page.users.userAddressList.add`) }}</div>
        </div>
      </div>
    </div>
    <div class="isShow" @click="open" v-if="!isShow && addressList.length > 3">
      {{ $t(`message.tips.more`) }}<span class="iconfont icon-xiangxia"></span>
    </div>
    <div style="margin-top: 10px" v-if="addressList.length <= 3"></div>
    <div class="isShow" @click="close" v-if="isShow && addressList.length > 3">
      {{ $t(`message.tips.hide`)
      }}<span class="iconfont icon-xiangshang"></span>
    </div>
    <!--商品信息-->
    <div class="wrapper wrapper_1200">
      <div v-for="(item, index) in cartInfo" :key="index">
        <order-goods
          :cartInfo="item.orderInfoList"
          :orderInfo="item"
        ></order-goods>
      </div>
      <div class="wrapper_count">
        <!--优惠券选择-->
        <div v-show="couponList.length > 0" class="couponListBox">
          <div class="integral_count acea-row row-between">
            <div class="integral_title">
              {{ $t(`page.users.orderConfirm.CouponDeduction`) }}：
            </div>
            <div class="couponPrice font-color">
              -{{ GLOBAL.shopPayCurrency }}{{ orderInfoVo.couponFee }}
            </div>
          </div>
          <div class="couponList acea-row row-middle">
            <div
              class="item acea-row row-middle"
              :class="itemn.disabled ? 'disabled' : ''"
              v-for="(itemn, indexn) in couponList"
              :key="indexn"
              @click="getCoupon(itemn, indexn)"
            >
              <div class="name" v-if="itemn.useType === 1">
                {{ $t(`page.users.userCoupon.navList[0].name`) }}
              </div>
              <div class="name" v-else>
                {{ $t(`page.users.userCoupon.navList[1].name`) }}
              </div>
              <div class="money line1">
                {{ itemn.minPrice }} {{ $t(`page.users.userCoupon.minus`) }}
                {{ parseFloat(itemn.money) }}
              </div>
              <div
                class="iconfont icon-xuanzhong4 font-color"
                v-if="couponIndex === indexn && couponId"
              ></div>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <!--支付选择-->
        <div class="payType">
          <div class="title">{{ $t(`page.orderPayStatus.payType`) }}</div>
          <div class="type acea-row row-middle mb30">
            <div
              v-if="payInfo.stripeStatus"
              class="item acea-row row-center-wrapper mr20"
              :class="payStatus === 0 ? 'on' : ''"
              @click="currentPay(0)"
            >
              <div class="iconfont icon-yue">
                <img src="../../assets/images/stripe.png" />
              </div>
              <div>
                <div class="name">Stripe</div>
              </div>
              <div
                class="iconfont icon-xuanzhong4 font-color"
                v-if="payStatus === 0"
              ></div>
            </div>

            <div
              v-if="payInfo.paypalStatus"
              class="item acea-row row-center-wrapper"
              :class="payStatus === 1 ? 'on' : ''"
              @click="currentPay(1)"
            >
              <div class="iconfont icon-weixinzhifu1">
                <img src="../../assets/images/PayPal.png" />
              </div>
              <div>
                <div class="name">PayPal</div>
              </div>
              <div
                class="iconfont icon-xuanzhong4 font-color"
                v-if="payStatus === 1"
              ></div>
            </div>

            <div
              v-if="payInfo.wechatPaySwitch"
              class="item acea-row row-center-wrapper"
              :class="payStatus === 2 ? 'on' : ''"
              @click="currentPay(2)"
            >
              <div class="iconfont icon-weixinzhifu1">
                <img class="img" src="../../assets/images/wechat.png" />
              </div>
              <div>
                <div class="name">Wechat</div>
              </div>
              <div
                class="iconfont icon-xuanzhong4 font-color"
                v-if="payStatus === 2"
              ></div>
            </div>
            <div
              v-if="payInfo.codSwitch"
              class="item acea-row row-center-wrapper"
              :class="payStatus === 3 ? 'on' : ''"
              @click="currentPay(3)"
            >
              <div class="iconfont icon-weixinzhifu1">
                <img class="img" src="../../assets/images/delivery_man.png" />
              </div>
              <div>
                <div class="name">COD</div>
              </div>
              <div
                class="iconfont icon-xuanzhong4 font-color"
                v-if="payStatus === 3"
              ></div>
            </div>
            <div
              v-if="payInfo.upiSwitch"
              class="item acea-row row-center-wrapper"
              :class="payStatus === 4 ? 'on' : ''"
              @click="currentPay(4)"
            >
              <div class="iconfont icon-weixinzhifu1">
                <img class="img" src="../../assets/images/upi.png" />
              </div>
              <div>
                <div class="name">UPI</div>
              </div>
              <div
                class="iconfont icon-xuanzhong4 font-color"
                v-if="payStatus === 4"
              ></div>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <div class="coupon message acea-row">
          <div class="msgTitle">{{ $t(`page.users.orderConfirm.note`) }}</div>
          <textarea
            class="textarea"
            :placeholder="$t(`page.users.orderConfirm.placeNote`)"
            v-model="mark"
            maxlength="150"
          ></textarea>
        </div>
        <div class="totalCon">
          <div class="total acea-row row-middle row-right">
            <div>{{ $t(`page.users.orderConfirm.allPrice`) }}：</div>
            <div class="money">
              {{ GLOBAL.shopPayCurrency }}{{ orderInfoVo.proTotalFee || 0 }}
            </div>
          </div>
          <div
            class="total acea-row row-middle row-right"
            v-if="
              orderInfoVo.couponFee && parseFloat(orderInfoVo.couponFee) > 0
            "
          >
            <div>{{ $t(`page.users.orderConfirm.CouponDeduction`) }}：</div>
            <div class="money">
              -{{ GLOBAL.shopPayCurrency }}{{ orderInfoVo.couponFee }}
            </div>
          </div>
          <div class="total acea-row row-middle row-right">
            <div>{{ $t(`page.users.orderConfirm.freight`) }}：</div>
            <div class="money">
              +{{ GLOBAL.shopPayCurrency }}{{ orderInfoVo.freightFee }}
            </div>
          </div>
        </div>
        <div class="totalAmount">
          {{ $t(`page.users.orderConfirm.total`) }}：<span
            class="money font-color"
            >{{ GLOBAL.shopPayCurrency }}{{ orderInfoVo.payFee || 0 }}</span
          >
        </div>
        <div class="bnt acea-row row-right">
          <button class="submit" :loading="loading" @click="SubOrder($event)">
            {{ $t(`page.users.orderConfirm.payPal`) }}
          </button>
        </div>
      </div>
    </div>
    <!-- 右侧浮标 -->
    <!-- <FloatWindow></FloatWindow> -->
    <!-- 微信支付弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisibleQrcode"
      width="380px"
      :title="$t(`page.users.orderConfirm.payment`)"
      center
      :show-close="false"
      :before-close="handleCloseQrcode"
    >
      <div v-loading="loadingQrcode" class="payQrcode">
        <div id="payQrcode" ref="payQrcode"></div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCloseQrcode">{{
          $t(`page.users.orderConfirm.paymentResultsNo`)
        }}</el-button>
        <el-button
          size="small"
          type="primary"
          @click="getPaymentStatus(payStatus)"
          >{{ $t(`page.users.orderConfirm.paymentResults`) }}</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加地址弹窗 -->
    <el-dialog
      :title="$t(`page.users.userAddressList.add`)"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
    >
      <add-address @closeAddress="closeAddress" ref="addAddress"></add-address>
    </el-dialog>
  </div>
</template>

<script>
//AMBA-注释
import { Message, MessageBox } from "element-ui";
import orderGoods from "@/components/orderGoods";
import addAddress from "@/components/addAddress";
import { Debounce } from "@/utils/validate.js";
export default {
  name: "order_confirm",
  auth: "guest",
  components: { orderGoods, addAddress },
  data() {
    return {
      news: 1,
      loading: false,
      dialogVisible: false,
      addressList: [],
      current: 0,
      payStatus: 0, // 0stripe支付，1PayPal支付，2微信支付,3 cod，4 upi
      mark: "", //备注信息
      addressInfo: {},
      couponIndex: 0, //选择商铺优惠券索引
      couponList: [],
      orderInfoVo: {},
      payType: "",
      isShow: false,
      cartInfo: {},
      couponId: null,
      dialogVisibleQrcode: false, //微信支付弹窗
      loadingQrcode: false, //微信支付弹窗加载
    };
  },
  async asyncData({ app, query }) {
    let [list, pay] = await Promise.all([
      app.$axios.get("/api/pc/address/all/list"),
      app.$axios.get("/api/front/pay/method"),
    ]);

    return {
      addressList: list.data,
      preOrderNo: query.preOrderNo,
      payInfo: pay.data,
      orderNo: "", //支付订单号
    };
  },
  mounted() {
    if (
      this.payInfo.paypalStatus &&
      this.payInfo.stripeStatus &&
      this.payInfo.wechatPaySwitch &&
      this.payInfo.codSwitch &&
      this.payInfo.upiSwitch
    ) {
      this.payStatus = 0;
      this.payType = "stripe";
    } else if (!this.payInfo.paypalStatus && this.payInfo.stripeStatus) {
      this.payStatus = this.payInfo.paypalStatus ? 1 : 0;
      this.payType = this.payInfo.paypalStatus ? "paypal" : "stripe";
    } else if (
      !this.payInfo.paypalStatus &&
      !this.payInfo.stripeStatus &&
      this.payInfo.wechatPaySwitch
    ) {
      this.payStatus = 2;
      this.payType = "wechat";
    } else if (
      !this.payInfo.paypalStatus &&
      !this.payInfo.stripeStatus &&
      !this.payInfo.wechatPaySwitch &&
      this.payInfo.codSwitch
    ) {
      this.payStatus = 3;
      this.payType = "cod";
    } else if (
      !this.payInfo.paypalStatus &&
      !this.payInfo.stripeStatus &&
      !this.payInfo.wechatPaySwitch &&
      !this.payInfo.codSwitch &&
      this.payInfo.upiSwitch
    ) {
      this.payStatus = 4;
      this.payType = "upi";
    } else {
      this.payStatus = 0;
      this.payType = "";
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
  },
  head() {
    return {
      title: this.$t(`page.users.orderConfirm.navTitle`),
    };
  },
  beforeCreate() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
  },
  beforeMount() {
    this.getAddressList();
    this.getloadPreOrder();
    this.getPlantCoupon();
  },
  methods: {
    currentPay(index) {
      this.payStatus = index;
      if (index === 0) {
        this.payType = "stripe";
      } else if (index === 1) {
        this.payType = "paypal";
      } else if (index === 2) {
        this.payType = "wechat";
      } else if (index === 3) {
        this.payType = "cod";
      } else if (index === 4) {
        this.payType = "upi";
      }
    },
    getloadPreOrder() {
      this.$axios
        .get(`/api/front/order/load/pre/${this.preOrderNo}`)
        .then((res) => {
          let orderInfoVo = res.data;
          this.orderInfoVo = orderInfoVo;
          this.orderInfoVo.couponFee = 0;
          this.cartInfo = orderInfoVo.orderList;
        })
        .catch((err) => {
          this.$router.push({ path: "/users/order_list" });
        });
    },
    closeAddress() {
      this.handleClose();
      this.getAddressList();
    },
    //关闭地址弹窗
    handleClose() {
      this.$refs.addAddress.resetForm("formData");
      this.dialogVisible = false;
    },
    /*订单优惠券*/
    getPlantCoupon() {
      this.$axios
        .get(`/api/front/coupons/order/${this.preOrderNo}`)
        .then((res) => {
          this.couponList = res.data;
        });
    },

    getCoupon(coupon, index) {
      this.couponIndex = index;
      this.$set(coupon, "checked", !coupon.checked);
      if (coupon.checked) {
        this.couponId = coupon.id;
      } else {
        this.couponId = "";
      }
      this.$axios
        .post("/api/front/order/computed/price", {
          addressId: this.addressInfo.id,
          couponId: this.couponId,
          preOrderNo: this.preOrderNo,
        })
        .then((res) => {
          let data = res.data;
          this.orderInfoVo.couponFee = data.couponFee;
          this.orderInfoVo.freightFee = data.freightFee;
          this.orderInfoVo.proTotalFee = data.proTotalFee;
          this.orderInfoVo.payFee = data.payFee;
        });
    },
    addAddress() {
      this.dialogVisible = true;
    },
    //提交订单
    SubOrder: Debounce(function (event) {
      let that = this;
      let data = {};
      // this.loadingQrcode = true;
      // this.dialogVisibleQrcode = true;
      // this.getQRcode(
      //   "http://192.168.2.161:8000/order/order_confirm?preOrderNo=917345343425ec05d297d7641b98719aa5113e4090d"
      // );
      MessageBox.confirm(
        "Are you sure you want to proceed with this order ? ",

        " ",

        {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t(`page.goodsDetail.confirm`),
          cancelButtonText: this.$t(`page.goodsDetail.cancel`),
        }

        // "tips"
      ).then((res) => {
        that.loading = true;
        if (!that.addressInfo.id)
          return Message.error(that.$t(`message.orderConfirm.emptyAddress`));
        let btn = event.target;
        btn.disabled = true;
        data = {
          realName: that.addressInfo.realName,
          phone: that.addressInfo.phone,
          addressId: that.addressInfo.id,
          couponId: that.couponId,
          payType: that.payType,
          preOrderNo: that.preOrderNo,
          mark: that.mark,
          email: that.addressInfo.email,
          payChannel: "pc",
        };
        that.$axios
          .post("/api/front/order/create", data)
          .then((res) => {
            this.orderNo = res.data.orderNo;
            // alert(1);
            that.getOrderPay(res.data.orderNo);
          })
          .catch((err) => {
            btn.disabled = false;
          });
      });
    }),
    //支付订单
    getOrderPay(orderNo) {
      this.$axios
        .post("/api/front/pay/payment", {
          orderNo: orderNo,
          payType: this.payType,
          payChannel: "pc",
        })
        .then((res) => {
          // alert(1);
          if (this.payType === "paypal") {
            window.location.href = res.data.redirect;
          } else if (this.payType === "stripe") {
            this.$router.push({
              path: `/order/stripe_payment`,
              query: { clientSecret: res.data.stripeClientSecret },
            });
          } else if (this.payType === "wechat") {
            this.loadingQrcode = true;
            this.dialogVisibleQrcode = true;
            this.getQRcode(res.data.redirect);
          } else if (this.payType === "upi") {
            this.loadingQrcode = true;
            this.dialogVisibleQrcode = true;
            this.getQRcode(res.data.redirect);
          } else {
            this.$router.push({ path: "/users/order_list?orderStatus=0" });
          }
        });
    },
    //预览二维码
    async getQRcode(redirect) {
      this.dialogVisibleQrcode = true;
      setTimeout(async () => {
        this.$refs.payQrcode.innerHTML = "";
        let QRcode = await import("qrcodejs2");
        QRcode = QRcode.default;
        new QRcode("payQrcode", { width: 135, height: 135, text: redirect });
        this.loadingQrcode = false;
      }, 800);
    },
    //获取微信支付结果
    getPaymentStatus(payState) {
      this.loadingQrcode = true;
      var resUrl = `/api/front/pay/query/wechat/pay/result/${this.orderNo}`;
      if (payState === 4) {
        resUrl = `/api/front/pay/query/upi/pay/result/${this.orderNo}`;
      }
      this.$axios
        .get(resUrl)
        .then((res) => {
          // if (!res.data){
          //    return;
          // }
          this.handleCloseQrcode();
          this.loadingQrcode = false;
          this.$router.push({ path: "/users/order_list?orderStatus=0" });
        })
        .catch((err) => {
          this.handleCloseQrcode();
          this.loadingQrcode = false;
          this.$router.push({ path: "/users/order_list?orderStatus=0" });
        });
    },
    //关闭微信支付弹窗
    handleCloseQrcode() {
      this.dialogVisibleQrcode = false;
      this.$router.push({ path: "/users/order_list?orderStatus=0" });
    },
    getAddressList() {
      let that = this;
      that.$axios.get("api/pc/address/all/list").then((res) => {
        that.addressList = res.data;
        that.addressList.forEach((item, index) => {
          if (item.isDefault) {
            that.addressInfo = item;
            that.current = index;
          } else {
            that.addressInfo = item;
            that.current = 0;
          }
        });
      });
    },
    tapCurrent(index, item) {
      this.current = index;
      this.addressInfo = item;
    },
    open() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
  },
};
</script>

<style scoped lang="scss">
.payQrcode {
  margin: auto;
  width: 135px;
  height: 135px;
}

.mr20 {
  margin-right: 20px;
}

.payType {
  width: 100%;
  background-color: #fff;
  padding: 0 30px;

  .title {
    height: 68px !important;
    line-height: 68px !important;
    font-size: 14px !important;
    color: #282828 !important;
    padding: 0 !important;
  }

  .type {
    .item {
      width: 210px;
      height: 70px;
      border: 1px solid #d4d4d4;
      position: relative;
      cursor: pointer;

      & ~ .item {
        margin-right: 20px;
      }

      &.on {
        border-color: #e93323;
      }

      .iconfont {
        color: #09bb07;
        font-size: 29px;
        margin-right: 11px;
        width: 30px;
        height: 30px;

        .img {
          width: 100%;
          height: 100%;
        }

        &.icon-yue {
          font-size: 32px;
          color: #fe9c01;
        }

        &.icon-zhifubao {
          font-size: 36px;
          color: #00aaea;
        }
      }

      .icon-xuanzhong4 {
        position: absolute;
        right: -4px;
        bottom: -4px;
        margin: 0 !important;
      }

      .name {
        font-size: 16px;
        color: #4e4e4e;
      }

      .yue {
        font-size: 14px;
        color: #969696;
        margin-top: 6px;
      }
    }
  }

  .goPay {
    margin: 80px 50px 0 0;

    .bnt,
    .button {
      width: 180px;
      height: 46px;
      font-size: 16px;
      color: #fff;
      border-radius: 4px;
      text-align: center;
      line-height: 46px;
      cursor: pointer;
    }

    .button {
      outline: none;
      border: none;
      background-color: #e93323;

      &:disabled {
        border-color: #fab6b6;
        background-color: #fab6b6;
      }
    }
  }
}

.line {
  border-bottom: 1px solid #efefef;
}

.couponListBox {
  padding: 30px 30px 0 30px;
}

.input-item {
  margin-bottom: 20px;
}

.item-require {
  color: #e93323;
  margin-right: 2px;
}

.text-wrapper {
  position: relative;
  height: 40px;
  line-height: 40px;
  border: 1px solid #dcdfe6;
  padding: 0 15px;
  box-sizing: border-box;
  border-radius: 4px;
  color: #cfcfcf;

  .select-wrapper {
    z-index: 10;
    position: absolute;
    left: 0;
    top: 45px;
    width: 100%;
    padding: 0 15px;
    background: #fff;
    border: 1px solid #e93323;
    border-radius: 4px;
    line-height: 2;

    .title-box {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #efefef;
      color: #e93323;
      font-size: 14px;

      span {
        margin-right: 8px;
        color: #666666;
      }
    }

    .label-txt {
      margin: 8px 0 18px;
      color: #666666;
      font-size: 14px;

      span {
        margin-right: 10px;
        cursor: pointer;

        &.on {
          color: #e93323;
        }
      }
    }
  }
}

.order_confirm {
  .header {
    height: 60px;
    line-height: 60px;
    color: #999999;

    .home {
      color: #282828;
    }
  }

  .address {
    background-color: #fff;

    .title {
      height: 64px;
      font-size: 18px;
      padding: 0 28px;
      line-height: 64px;
    }

    .lines {
      width: 100%;
      height: 4px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .list {
      padding: 0 25px 26px 25px;
      height: 217px;
      overflow: hidden;

      &.on {
        height: auto;
      }

      .item {
        width: 250px;
        height: 170px;
        border: 1px solid #eaeaea;
        padding: 22px 27px;
        overflow: hidden;
        margin: 30px 0 0 30px;
        position: relative;
        cursor: pointer;

        &.on {
          border: 1px solid #e93323;
        }

        .icon-xuanzhong4 {
          position: absolute;
          right: -4px;
          bottom: -4px;
          font-size: 27px;
        }

        .default {
          position: absolute;
          width: 56px;
          height: 23px;
          font-size: 12px;
          color: #fff;
          text-align: center;
          line-height: 23px;
          top: 0;
          right: 0;
        }

        &.add {
          text-align: center;

          .iconfont {
            font-size: 35px;
            color: #bfbfbf;
            margin-top: 25px;
          }

          .tip {
            color: #c8c8c8;
            margin-top: 8px;
          }
        }

        .name {
          font-size: 16px;
        }

        .phone {
          margin-top: 9px;
        }

        .details {
          color: #999;
          margin-top: 4px;
        }
      }
    }
  }

  .develivery {
    margin-left: 30px;
  }

  .develivery_take {
    margin-left: 100px;
    font-size: 14px;
    font-weight: normal;
    padding-left: 16px;
    position: relative;
    top: -10px;
    padding-bottom: 8px;

    span {
      color: #e93323;
      font-size: 14px;
      position: absolute;
      top: 3px;
      left: 0;
    }
  }

  .deliviery_item {
    margin-right: 12px;
    box-sizing: border-box;
    cursor: pointer;

    .cont {
      position: relative;
      height: 32px;
      border: 1px solid #d3d3d3;
      display: flex;
    }

    &.checked {
      .cont {
        border-color: #e93323;
        color: #e93323;
      }
    }

    .name {
      padding: 0 50px;
      font-size: 16px;
    }

    .iconfont {
      position: absolute;
      right: -2px;
      bottom: -3px;
      font-size: 22px;
    }
  }

  .isShow {
    width: 100%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: #707070;
    cursor: pointer;

    .iconfont {
      margin-left: 8px;
      font-size: 12px;
    }
  }

  .couponList {
    .item {
      height: 40px;
      /*width: 182px;*/
      border: 1px solid #e93323;
      margin: 0 20px 30px 0;
      position: relative;
      cursor: pointer;

      &.disabled {
        pointer-events: none;
        opacity: 0.6;
      }

      &.grey {
        border-color: #b4b4b4;
      }

      .iconfont {
        position: absolute;
        right: -3px;
        bottom: -2px;
        font-size: 20px;
      }

      .name {
        width: 70px;
        height: 100%;
        color: #fff;
        text-align: center;
        line-height: 40px;
        background-color: #e93323;

        &.grey {
          background-color: #b4b4b4;
        }
      }

      .money {
        width: 110px;
        text-align: center;
        color: #e93323;

        &.grey {
          color: #b4b4b4;
        }
      }

      &.svip {
        border-color: #333;

        .name {
          background-color: #333;
          color: #fdd7b4;
        }

        .money {
          color: #333;
        }
      }
    }
  }

  .coupon {
    .icon-wenhao {
      color: #fff;
      display: inline-block;
      width: 14px;
      height: 14px;
      text-align: center;
      line-height: 14px;
      background-color: #236fe9;
      border-radius: 100%;
      font-size: 8px;
      margin-right: 5px;
    }

    .plantTitle {
      font-size: 18px;
      position: relative;

      .title {
        align-items: center;
        padding: 0;

        span {
          margin-left: 3px;
          cursor: pointer;
        }
      }
    }

    .couponTitle {
      font-size: 18px;
      padding: 26px 0;
      position: relative;

      .title {
        align-items: center;

        span {
          margin-left: 3px;
          cursor: pointer;
        }
      }

      .couponPrice {
        font-size: 16px;
        font-weight: bold;
      }

      .couponPriceNo {
        font-size: 14px;
      }
    }

    &.invoice {
      padding-bottom: 26px;

      .couponTitle {
        padding-bottom: 15px;
      }
    }

    .invoice_info {
      font-size: 14px;
      margin-left: 102px;
      color: #236fe9;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .invoice_data {
      position: absolute;
      right: 0;
      bottom: 20px;
      font-size: 16px;
      display: flex;

      .data_item {
        margin-left: 20px;

        &.modify {
          cursor: pointer;
        }
      }
    }

    .integralCurrent {
      margin-left: 33px;

      .num {
        margin-left: 6px;
      }
    }

    .msgTitle {
      font-size: 14px;
      color: #282828;
    }
  }

  .message {
    padding: 30px;

    .textarea {
      width: 820px;
      height: 120px;
      background-color: #f7f7f7;
      border: 0;
      outline: none;
      resize: none;
      padding: 12px 14px;
      margin-left: 26px;
    }
  }

  .wrapper {
    .wrapper_count {
      background-color: #fff;
      padding-bottom: 56px;

      &:last-child {
        margin-top: 14px;
      }
    }

    .checkbox-wrapper {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 10px;
    }

    .money_count {
      margin-right: 30px;
    }

    .money_down {
      color: #fff;
      font-size: 12px;
      line-height: 17px;
      height: 17px;
      background-color: #e93323;
      width: 34px;
      text-align: center;
      border-radius: 3px;
      margin-right: 10px;
    }

    .money_final {
      margin-top: 6px;
      color: #666666;
      font-size: 14px;
    }

    .integral_count {
      padding: 0 0 24px 0;
      position: relative;

      .integral_title {
        font-size: 14px;
        color: #282828;
      }

      .money {
        margin-top: 15px;
        align-items: center;
      }

      .integral_price {
        position: absolute;
        right: 32px;
      }
    }

    .title {
      height: 64px;
      line-height: 64px;
      padding: 0 28px;
      font-size: 18px;
    }

    .cartCount {
      padding: 0 32px 26px;
      margin-bottom: 20px;
      border: 1px solid #efefef;
    }

    .storeInfo {
      height: 60px;
      border-bottom: 1px solid #efefef;
      position: relative;

      .qrcode {
        position: absolute;
        background: #fff;
        right: -15px;
        display: none;
        z-index: 10;
        bottom: 60px;
        border: 1px solid #ddd;
        width: 110px;
        height: 110px;

        img {
          width: 100%;
        }
      }

      .name {
        color: #666666;
      }

      .service {
        cursor: pointer;

        .iconfont {
          color: #e93323;
          font-size: 18px;
        }

        &:hover {
          + .qrcode {
            display: inline;
          }
        }
      }
    }

    .totalCon {
      padding: 27px 46px;

      .total {
        & ~ .total {
          margin-top: 12px;
        }

        .money {
          width: 120px;
          text-align: right;
          font-size: 16px;
        }
      }
    }

    .totalAmount {
      width: 1160px;
      height: 70px;
      line-height: 70px;
      background: #f7f7f7;
      text-align: right;
      padding-right: 22px;
      margin: 0 auto;

      .money {
        font-size: 20px;
        font-weight: bold;
        margin-left: 4px;
        width: 120px;
        display: inline-block;
      }
    }

    .bnt {
      margin: 38px 20px 0 0;
      cursor: pointer;

      .submit {
        width: 180px;
        height: 46px;
        border-radius: 4px;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 46px;
        outline: none;
        border: none;
        background-color: #e93323;

        &:disabled {
          border-color: #fab6b6;
          background-color: #fab6b6;
        }
      }
    }
  }
}

.virtual_form {
  margin-top: 30px;
  border-top: 1px solid #efefef;

  .virtual-item {
    margin-top: 20px;

    .item {
      align-items: center;
    }

    .virtual-title {
      width: 100px;
    }

    .discount,
    .el-date-editor.el-input {
      width: 330px;
    }

    .el-range-editor--small.el-input__inner {
      height: 40px;
      width: 330px;
    }
  }
}

.presell_protocol {
  cursor: pointer;
}

.check_protocal .icon {
  border-radius: 0;
  width: 16px;
  height: 16px;
}

.invoice_description img {
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
}

.invoice_data_container {
  padding-left: 26px;
  padding-right: 26px;
}

.invoice_item {
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 14px;

  &:last-child {
    margin-right: 0;
  }

  .cont {
    position: relative;
    height: 32px;
    border: 1px solid #d3d3d3;
    display: flex;
    align-items: center;
  }

  &.checked {
    .cont {
      border-color: #e93323;
      color: #e93323;
    }

    .iconfont {
      display: block;
    }
  }

  .name {
    padding: 0 40px;
    font-size: 14px;
    line-height: 32px;
  }

  .iconfont {
    position: absolute;
    right: -3px;
    bottom: -12px;
    font-size: 22px;
    display: none;
  }
}

.invoice_type_info {
  font-size: 12px;
  color: #999999;
  line-height: 20px;
  margin-top: 10px;
}
</style>
