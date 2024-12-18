<template>
  <div>
    <div class="footer">
      <div class="wrapper_1200">
        <ul class="acea-row row-around row-middle">
          <li class="acea-row row-middle">
            <div class="picture">
              <span class="iconfont icon-pinzhong"></span>
            </div>
            <div>{{ $t(`page.index.footer1`) }}</div>
          </li>
          <li class="acea-row row-middle">
            <div class="picture"><span class="iconfont icon-zhifa"></span></div>
            <div>{{ $t(`page.index.footer2`) }}</div>
          </li>
          <li class="acea-row row-middle">
            <div class="picture">
              <span class="iconfont icon-hanghuo"></span>
            </div>
            <div>{{ $t(`page.index.footer3`) }}</div>
          </li>
          <li class="acea-row row-middle">
            <div class="picture"><span class="iconfont icon-dijia"></span></div>
            <div>{{ $t(`page.index.footer4`) }}</div>
          </li>
        </ul>
        <div class="middle-wrap acea-row">
          <div
            class="navlist-wrap"
            v-for="(item, index) in navList"
            :key="index"
          >
            <!-- <h5 class="m-i-title">{{ item.title }}</h5> -->
            <div class="m-i-content-wrap">
              <div
                class="nav-link-wrap"
                v-for="(subItem, subIndex) in item.list"
                :key="subIndex"
              >
                <nuxt-link class="nav-link" :to="{ path: subItem.url }">{{
                  subItem.label
                }}</nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="recordNum">
          <div>
            <span>Copyright © 2024 ambahome.in. All Rights Reserved</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//AMBA-注释
export default {
  name: "footers",
  components: {},
  mixins: [],
  data() {
    return {
      companyInfo: {},
      codeUrl: "",
      iScode: false,
    };
  },
  computed: {
    navList() {
      return [
        {
          list: [
            {
              label: this.$t("page.index.footer.middleNavList.policy.refund"),
              url: "/policy/refund",
            },
            {
              label: this.$t("page.index.footer.middleNavList.policy.shipping"),
              url: "/policy/shipping",
            },
            {
              label: "Shop",
              url: "/",
            },
            {
              label: this.$t("page.index.footer.middleNavList.about.contactUs"),
              url: "/contact/us",
            },
          ],
        },
        {
          list: [
            {
              label: this.$t("page.index.footer.middleNavList.about.aboutUs"),
              url: "/about/us",
            },
            {
              label: "Delivery Information",
              url: "/delivery/information",
            },
            // {
            //   label: this.$t("page.index.footer.middleNavList.about.account"),
            //   url: "/users/user_info?menuCur=584",
            // },
            {
              label: this.$t("page.index.footer.middleNavList.policy.privacy"),
              url: "/policy/privacy",
            },
          ],
        },
        {
          list: [
            {
              label: this.$t("page.index.footer.middleNavList.policy.tearms"),
              url: "/policy/terms",
            },
            {
              label: "Order Policy",
              url: "/policy/order",
            },
            // {
            //   label: this.$t("page.index.footer.middleNavList.policy.refund"),
            //   url: "/policy/refund",
            // },
            // {
            //     label: 'Amba Homes Delivery Information',
            //     url: '/policy/refund'
            // },
            // {
            //     label: 'Amba Homes Order Policy',
            //     url: '/policy/refund'
            // },
            // {
            //     label: this.$t('page.index.footer.middleNavList.policy.return'),
            //     url: '/policy/return'
            // },
          ],
        },
      ];
    },
  },
  head() {
    return {
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: this.companyInfo.site_keywords,
        },
        {
          hid: "description",
          name: "description",
          content: this.companyInfo.site_description,
        },
      ],
    };
  },
  beforeMount() {
    this.getCompanyInfo();
  },
  mounted() {},
  methods: {
    goTop() {
      (function n() {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if (t > 0) {
          window.requestAnimationFrame(n);
          window.scrollTo(0, t - t / 5);
        }
      })();
    },
    goRecommend() {},
    wxCode() {
      this.iScode = true;
    },
    wxCodeHide() {
      this.iScode = false;
    },
    goCart() {
      // this.$router.push({path:'/shopping_cart'});
    },
    getCompanyInfo() {
      // this.$axios.get("/api/pc/config").then(res=>{
      //   this.companyInfo = res.data;
      //   this.$store.commit('logo', res.data.site_logo);
      //   this.$cookies.set('logo',res.data.site_logo);
      //   this.$store.commit('titles', res.data.site_name);
      //   this.$cookies.set('titles',res.data.site_name);
      //   this.$store.commit('qrCode', res.data.wechat_qrcode);
      //   this.$store.commit('consumerHotline', res.data.sys_phone);
      //   this.$cookies.set('consumerHotline',res.data.sys_phone);
      //   this.$store.commit('domainName', res.data.site_url);
      //   this.$cookies.set('domainName',res.data.site_url);
      //   this.$store.commit('openService', res.data.is_open_service);
      //   this.$cookies.set('openService',res.data.is_open_service);
      // })
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  margin-top: 50px;
  /* background-color: #f2f2f2; */
  // position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9999;

  ul {
    height: 104px;
    border-bottom: 1px solid #e2e2e2;

    li {
      .picture {
        width: 40px;
        height: 40px;
        border: 1px solid #707070;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        margin-right: 14px;

        .iconfont {
          font-size: 23px;
          color: #707070;
        }
      }
    }
  }

  .middle-wrap {
    color: #777;
    font-size: 14px;
    margin-top: 50px;

    .m-i-title {
      font-size: 18px;
      font-weight: bold;
      color: #000;
      margin-bottom: 20px;
    }
    .navlist-wrap {
      flex: 1;
    }

    .m-i-content-wrap {
      //   width: 300px;

      .address {
        width: 200px;
        line-height: 1.7;
        /* margin-bottom: 30px; */
      }

      .nav-link-wrap {
        margin: 12px 0;
      }

      .nav-link {
        color: #777;
      }
    }
  }

  .recordNum {
    text-align: center;
    font-size: 12px;
    line-height: 22px;
    color: #777;
    padding: 30px 0 20px 0;
    border-top: 1px solid #e2e2e2;
    margin-top: 40px;

    img {
      width: 14px;
      height: 14px;
      display: inline-block;
      margin-right: 1px;
      position: relative;
      top: 2px;
    }

    .address {
      margin-left: 40px;
    }

    .record {
      margin-top: 6px;

      .num {
        margin-left: 10px;

        &:hover {
          color: #e93323;
        }
      }
    }
  }

  span.copyright {
    cursor: default;
  }

  .copyright {
    color: #999;

    &:after {
      content: "|";
      display: inline-block;
      color: #ccc;
      font-size: 16px;
      margin: 0 10px;
    }

    &:last-child {
      &:after {
        display: none;
      }
    }
  }

  .company {
    width: 200px;
  }
}

.mb-12 {
  margin-bottom: 12px;
}
</style>
