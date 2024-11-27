<template>
  <div class="user-order-list">
    <div class="user-com-tab">
      <span class="item" :class='orderStatus==0 ? "on": ""' @click="statusClick(0)">{{$t(`page.users.orderList.orderStatus[0].name`)}}({{orderData.unPaidCount || 0}})</span>
      <span class="item" :class='orderStatus==1 ? "on": ""' @click="statusClick(1)">{{$t(`page.users.orderList.orderStatus[1].name`)}}({{orderData.unShippedCount || 0}})</span>
      <span class="item" :class='orderStatus==2 ? "on": ""' @click="statusClick(2)">{{$t(`page.users.orderList.orderStatus[2].name`)}}({{orderData.receivedCount || 0}})</span>
      <span class="item" :class='orderStatus==3? "on": ""' @click="statusClick(3)">{{$t(`page.users.orderList.complete`)}}({{orderData.completeCount || 0}})</span>
    </div>
    <div v-loading="loading" class="width100">
      <div v-if="orderList.length > 0">
        <div v-for="(itemn,index) in orderList" :key="itemn.id" class="order-list">
          <template v-if="orderStatus === 0">
            <div v-for="(item,index) in itemn.orderList" :key="index">
              <div class="bd">
                <div class="order-txt acea-row row-middle" @click="goMerchant(item)">
                  <span class="mr10 iconfont icon-shangjiadingdan"></span>
                  <div class="name mr10">{{ item.merName }}</div>
                  <span class="iconfont icon-gengduo" style="font-size: 10px;"></span>
                </div>
                <div class="content" @click="goDetail(itemn)">
                  <div class="goods-item" v-for="(goods, index) in item.orderInfoList" :key="index">
                    <div class="acea-row">
                      <div class="img-box">
                        <img :src='goods.image' alt="">
                      </div>
                      <div class="info-txt">
                        <div class="title line2">{{goods.productName}}</div>
                      </div>
                    </div>
                    <div class="info-price">
                      <div class="price">{{GLOBAL.shopPayCurrency}} {{ goods.price }}</div>
                      <div class="num">x{{ goods.payNum }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="bd">
              <div class="order-txt acea-row row-middle" @click="goMerchant(itemn)">
                <span class="mr10 iconfont icon-shangjiadingdan"></span>
                <div class="name mr10">{{ itemn.merName }}</div>
                <span class="iconfont icon-gengduo" style="font-size: 10px;"></span>
              </div>
              <div class="content" @click="goDetail(itemn)">
                <div class="goods-item" v-for="(goods, index) in itemn.orderInfoList" :key="index">
                  <div class="acea-row">
                    <div class="img-box">
                      <img :src='goods.image' alt="">
                    </div>
                    <div class="info-txt">
                      <div class="title line2">{{goods.productName}}</div>
                    </div>
                  </div>
                  <div class="info-price">
                    <div class="price">{{GLOBAL.shopPayCurrency}} {{ goods.price }}</div>
                    <div class="num">x{{ goods.payNum }}</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div class="foot">
            <p>{{itemn.totalNum}} {{$t(`page.users.orderList.item`)}}，{{$t(`page.users.orderList.totalPay`)}}
              <span class="price">{{GLOBAL.shopPayCurrency}}{{itemn.payPrice}} </span>
            </p>
            <div class="btn-wrapper">
              <div class='rest' v-if="!itemn.paid" @click='cancelOrder(index,itemn.orderNo)'>
                {{$t(`page.users.orderList.cancelOrder`)}}
              </div>
              <div class='pay' v-if="!itemn.paid" @click='goPays(itemn)'>{{$t(`page.users.orderList.pay`)}}</div>
              <div class='pay' v-else-if="itemn.status== 0 || itemn.status== 1 || itemn.status== 3"
                   @click='goDetail(itemn)'>{{$t(`page.users.orderList.viewDetails`)}}
              </div>
              <div class='rest' v-if="itemn.status == 3" @click='delOrder(index,itemn.orderNo)'>
                {{$t(`page.users.orderList.delete`)}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pages-box" v-if="total > 0">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="bindPageCur"
          :total="total">
        </el-pagination>
      </div>
      <div class="empty-box" v-if="orderList.length == 0 && !loading">
        <img src="~assets/images/noorder.png" alt="">
        <p>{{$t(`page.users.orderList.empty`)}}~</p>
      </div>
      <!-- 微信支付弹窗 -->
      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="dialogVisibleQrcode"
        width="380px"
        :title="$t(`page.users.orderConfirm.payment`)"
        center
        :show-close="false"
        :before-close="handleCloseQrcode">
        <div v-loading="loadingQrcode" class="payQrcode">
          <div id="payQrcode"></div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="handleCloseQrcode">{{$t(`page.users.orderConfirm.paymentResultsNo`)}}</el-button>
          <el-button size="small" type="primary" @click="getPaymentStatus">{{$t(`page.users.orderConfirm.paymentResults`)}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  // +----------------------------------------------------------------------
  // | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
  // +----------------------------------------------------------------------
  // | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
  // +----------------------------------------------------------------------
  // | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
  // +----------------------------------------------------------------------
  // | Author: CRMEB Team <admin@crmeb.com>
  // +----------------------------------------------------------------------
  import {MessageBox} from 'element-ui';
  import {goShopDetail, cancelOrders, delOrders, goPay, goMerchant} from '@/utils/order.js';
  import {Debounce} from '@/utils/validate.js'
  import QRcode from 'qrcodejs2';
  export default {
    name: "order_list",
    auth: "guest",
    data() {
      return {
        orderStatus: 0, //支付状态
        orderData: {},
        page: 1,
        limit: 10,
        total: 0,
        settingIndex: 0,
        orderList: [],
        loading: false,
        dialogVisibleQrcode: false, //微信支付弹窗
        loadingQrcode: false, //微信支付弹窗加载
        orderNo: '' //订单号
      }
    },
    async asyncData({app, query}) {
      return {
        orderStatus: Number(query.orderStatus) || 0,
      }
    },
    beforeMount() {
      this.getOrderData()
      if (this.orderStatus === 0) {
        this.getOrderAwaitPay();
      } else {
        this.getOrderList();
      }
    },
    methods: {
      goMerchant(item) {
        goMerchant(item.merId, this);
      },
      // 查看详情
      goDetail(item) {
        this.$router.push({
          path: `/order/order_detail`,
          query: {
            orderNo: item.orderNo,
            orderStatus: this.orderStatus
          }
        })
      },
      statusClick(status) {
        this.orderStatus = status;
        if (this.orderStatus === 0) {
          this.getOrderAwaitPay();
        } else {
          this.getOrderList();
        }
      },
      /**
       * 支付
       */
      goPays: Debounce(function (item) {
        this.orderNo = item.orderNo;
        goPay(this, item).then((res) => {
          this.loadingQrcode = true;
          this.dialogVisibleQrcode = true;
          setTimeout(()=>{
            this.getQRcode(res.data.redirect)
          },800)
        });
      }),
      //预览二维码
      getQRcode(redirect) {
        document.getElementById('payQrcode').innerHTML = '';
        new QRcode('payQrcode', { width: 135, height: 135, text: redirect });
        this.loadingQrcode = false;
      },
      //关闭微信支付弹窗
      handleCloseQrcode(){
        this.dialogVisibleQrcode = false;
      },
      //获取微信支付结果
      getPaymentStatus(){
        this.loadingQrcode = true;
        this.$axios.get(`/api/front/pay/query/wechat/pay/result/${this.orderNo}`).then(res => {
          this.getOrderAwaitPay();
          this.handleCloseQrcode();
          this.loadingQrcode = false;
        }).catch(err => {
          this.getOrderAwaitPay();
          this.handleCloseQrcode();
          this.loadingQrcode = false;
        })
      },
      /**
       * 取消订单
       */
      cancelOrder: Debounce(function (index, orderNo) {
        this.settingIndex = index
        cancelOrders(this, orderNo).then(() => {
          this.orderList.splice(index, 1);
          this.$set(this.orderData, 'unPaidCount', this.orderData.unPaidCount - 1);
        });
      }),
      /**
       * 删除订单
       */
      delOrder: Debounce(function (index, orderNo) {
        this.settingIndex = index
        delOrders(this, orderNo).then(() => {
          this.orderList.splice(index, 1);
          this.$set(this.orderData, 'completeCount', this.orderData.completeCount - 1);
        });
      }),
      /**
       * 待支付列表
       */
      getOrderAwaitPay: function () {
        let that = this;
        that.loading = true;
        that.$axios.get('/api/front/order/await/pay/list', {
          params: {
            page: this.page,
            limit: this.limit
          }
        }).then(res => {
          that.orderList = res.data.list
          that.total = res.data.total
          that.loading = false;
        }).catch(err => {
          that.loading = false;
        })
      },
      /**
       * 获取订单列表
       */
      getOrderList: function () {
        let that = this;
        that.loading = true
        that.$axios.get('/api/front/order/list', {
          params: {
            page: that.page,
            limit: that.limit,
            type: that.orderStatus
          }
        }).then(res => {
          that.orderList = res.data.list
          that.total = res.data.total
          that.loading = false;
        }).catch(err => {
          that.loading = false;
        })
      },
      // 分页点击
      bindPageCur(data) {
        this.page = data
        if (this.orderStatus === 0) {
          this.getOrderAwaitPay();
        } else {
          this.getOrderList();
        }
      },
      /**
       * 获取订单统计数据
       *
       */
      getOrderData() {
        this.$axios.get('/api/front/order/data').then(res => {
          this.orderData = res.data;
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .payQrcode{
    margin: auto;
    width: 135px;
    height: 135px;
  }
  .width100 {
    width: 100%;
    height: 100%;
  }

  .user-com-tab {
    background-color: #fff;
    padding: 0 30px;
    margin-bottom: 15px;
    .item {
      padding: 0;
    }
  }

  .order-list {
    background-color: #fff;
    padding: 0 40px;
    margin-bottom: 15px;
  }

  .user-order-list {
    width: 100%;
    height: 100%;
    li {
      position: relative;
      padding: 30px 0 26px;
      border-bottom: 1px solid #ECECEC;

    }
    .refund-icon {
      position: absolute;
      right: 50px;
      top: 40px;
    }
    .goods_item {

    }
    .bd {
      padding-top: 30px;
      cursor: pointer;
      border-bottom: 1px dashed #E1E1E1;
      .order-txt {
        color: #333333;
        font-size: 14px;
        .mer_name {
          display: inline-block;
          color: #333333;
          &:hover {
            color: #E93323;
          }
        }
        .status {
          float: right;
          color: #E93323;
        }
      }
      .content {
        margin-top: 20px;
        .goods-item {
          display: flex;
          position: relative;
          margin-bottom: 20px;
          align-items: center;
          justify-content: space-between;
          .img-box {
            width: 120px;
            height: 120px;
            position: relative;
            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 12px;
              line-height: 18px;
              background: rgba(0, 0, 0, .5);
              position: absolute;
              left: 0;
              bottom: 0;
              color: #fff;
            }
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .info-price {
            text-align: right;
          }
          .info-txt {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 500px;
            margin-left: 30px;
            font-size: 14px;
            .title {
              color: #333;
            }
            .info {
              font-size: 12px;
              color: #aaa;
              margin-top: 4px;
            }
            .price {
              margin-top: 10px;
              color: #E93323;
            }

          }
          .develity_date {
            color: #FD6523;
            margin-top: 6px;
            font-size: 14px;
          }
          .price {
            color: #999999;
            margin-bottom: 6px;
          }
          .num {
            /*position: absolute;*/
            /*right: 0;*/
            /*top: 50%;*/
            transform: translateY(-50%);
            color: #999999;
          }
        }
      }
    }
    .foot {
      padding: 25px 0;
      p {
        text-align: right;
        color: #666;
        font-size: 14px;
        .price {
          color: #E93323;
        }
      }
      .btn-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        div {
          width: 110px;
          height: 36px;
          text-align: center;
          line-height: 34px;
          margin-left: 20px;
          border: 1px solid #999999;
          border-radius: 4px;
          font-size: 14px;
          color: #666666;
          cursor: pointer;
          &.pay {
            border-color: #E93323;
            background: #E93323;
            color: #fff;
          }
        }
      }
    }
  }

  .pages-box {
    margin-top: 30px;
    text-align: right;
  }
</style>
