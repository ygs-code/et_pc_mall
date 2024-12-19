<template>
  <div class="container">
    <div class="hade-box">
      <div class="hade">
        <div class="middle">
          <div class="left-box">
            <div class="logo">
              <div class="img-box">
                <nuxt-link :to="{ path: '/' }">
                  <p
                    style="
                      color: #fff;
                      font-weight: 700;
                      font-size: 22px;
                      font-family: var(--font-primary);
                      line-height: 57px;
                      height: 50px;
                    "
                  >
                    AMBASHOP
                  </p>
                </nuxt-link>
              </div>
            </div>
          </div>

          <div>
            <el-input
              :placeholder="$t(`page.goodsSearch.placeSearch`)"
              v-model="search"
              class="input-with-select"
            >
              <el-select
                v-model="selectValue"
                slot="prepend"
                placeholder="请选择"
                @change="change"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                  v-for="item in options"
                ></el-option>
              </el-select>
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="submit"
              ></el-button>
            </el-input>
          </div>

          <div class="right-box">
            <!-- <div class="input">
              <div class="left_select">
                <input
                  type="text"
                  :placeholder="$t(`page.goodsSearch.placeSearch`)"
                  v-model="search"
                />
              </div>
              <div class="right_select">
                <div class="search" @click="submit">
                  <span class="iconfont icon-sousuo"></span>
                </div>
              </div>
            </div> -->

            <nuxt-link to="/order/shopping_cart" class="cartNum">
              <div class="car">
                <span class="iconfont icon-gouwuche"></span>
                <span v-if="$store.state.cartNumber" class="num">{{
                  $store.state.cartNumber
                }}</span>
              </div>
            </nuxt-link>

            <div class="pic">
              <img :src="$auth.user ? $auth.user.avatar : defaultPic" />
            </div>

            <div v-if="!$auth.loggedIn" class="login  login-box" @click="longin">
              {{ $t(`page.users.login.sign`) }}
            </div>
            <div v-else  class="login-box">
              <el-dropdown>
                <span class="login el-dropdown-link line1">
                  {{ $auth.user.nickname
                  }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div class="userBox acea-row row-middle">
                    <div class="avatarPic">
                      <img :src="$auth.user ? $auth.user.avatar : defaultPic" />
                    </div>
                    <div>
                      <div class="nickname">{{ $auth.user.nickname }}</div>
                      <div v-show="$auth.user.phone" class="count">
                        {{ $auth.user.phone }}
                      </div>
                      <div v-show="$auth.user.email" class="count">
                        {{ $auth.user.email }}
                      </div>
                    </div>
                  </div>
                  <el-dropdown-item
                    v-for="(menu, index) in userMenu"
                    :key="menu.id"
                    @click.native="goPage(menu)"
                  >
                    <div
                      class="dropdownBox"
                      v-show="menu.pc_url && menu.pc_url != ' '"
                    >
                      {{ $t(`page.user.mineNav[${index}].name`) }}
                    </div>
                  </el-dropdown-item>
                  <div class="userInfo">
                    <el-divider></el-divider>
                  </div>
                  <el-dropdown-item
                    v-for="(menu, index) in menus"
                    :key="menu.id"
                    @click.native="goPage(menu)"
                  >
                    <div
                      class="dropdownBox"
                      v-show="menu.pc_url && menu.pc_url != ' '"
                    >
                      {{ menu.name }}
                    </div>
                  </el-dropdown-item>
                  <el-button @click="longOut" class="btn">{{
                    $t(`page.users.userInfo.logOut`)
                  }}</el-button>
                </el-dropdown-menu>
              </el-dropdown>
            </div>

            <!-- <div class="category acea-row" @mouseleave="leave()" v-if="hide">
              <div class="sort">
                <div
                  class="item acea-row row-between-wrapper"
                  :class="index === current ? 'bg-color' : ''"
                  v-for="(item, index) in $store.state.productClassify"
                  :key="index"
                  @mouseenter="enter(index)"
                >
                  <div class="name line1">{{ item.name }}</div>
                </div>
              </div>
              <div
                class="sortCon"
                @mouseleave="show"
                v-if="seen && categoryCurrent"
              >
                <div class="erSort">
                  <div
                    class="item acea-row row-middle"
                    v-for="(item, index) in categoryCurrent"
                    :key="index"
                  >
                    <div class="name line1">{{ item.name }}</div>
                    <div class="cateList">
                      <span
                        class="cateItem"
                        @click="goCate(items)"
                        v-for="(items, indexn) in item.childList"
                        :key="indexn"
                      >
                        {{ items.name }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>   -->
          </div>
        </div>

        <div class="middle">
          <ul class="mainmenu">
            <li class="menu-item-has-children">
              <nuxt-link :to="{ path: '/' }" class="home">{{
                $t(`page.goodsDetail.home`)
              }}</nuxt-link>
            </li>
            <!-- <li class="menu-item-has-children">
              <el-menu
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
              >
                <el-submenu index="2">
                  <template slot="title">
                    <nuxt-link
                      :to="{ path: '/goods/goods_search' }"
                      class="home"
                    >
                      {{ $t(`page.index.menus.shop`) }}
                    </nuxt-link>
                  </template>
                  <my-sub-menu :subMenu="menuData"></my-sub-menu>
                </el-submenu>
              </el-menu>
            </li> -->

            <li>
              <nuxt-link :to="{ path: '/about/us' }" class="home">{{
                $t(`page.index.menus.about`)
              }}</nuxt-link>
            </li>
            <li class="mainmenu-odd">
              <nuxt-link :to="{ path: '/contact/us' }" class="home">{{
                $t(`page.index.menus.contact`)
              }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- <div class="header" :class="navBarFixed == true ? 'navBarWrap' : ''">
      <div class="header_con">
        <span v-if="$nuxt.$route.path == '/'" class="iconfont icon-more"></span>
        <span v-else class="iconfont icon-more" @mouseenter="show"></span>

        <div class="logo">
          <nuxt-link :to="{ path: '/' }"
            ><img :src="logoUrl" alt=""
          /></nuxt-link>
        </div>

        <div class="input">
          <div class="left_select">
            <input
              type="text"
              :placeholder="$t(`page.goodsSearch.placeSearch`)"
              v-model="search"
            />
          </div>
          <div class="right_select">
            <div
              class="keyword"
              @click="(search = item.title) && submit()"
              v-for="item in hotSearchList.slice(0, 3)"
              :key="item.id"
            >
              {{ item.title }}
            </div>
            <div class="search" @click="submit">
              <span class="iconfont icon-sousuo"></span>
            </div>
          </div>
        </div>

        <el-dropdown>
          <div class="code">
            <span class="iconfont icon-yuyanqiehuan"></span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <template v-for="(item, index) in langList">
              <el-dropdown-item
                v-for="(items, idx) in item.intro"
                :key="idx"
                @click.native="languagelTab(items)"
              >
                {{ $t(`userDrawer.language[${idx}].name`) }}
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>

        <nuxt-link to="/order/shopping_cart" class="cartNum">
          <div class="car">
            <span class="iconfont icon-gouwuche"></span>
            <span v-if="$store.state.cartNumber" class="num">{{
              $store.state.cartNumber
            }}</span>
          </div>
        </nuxt-link>

        <div class="pic">
          <img :src="$auth.user ? $auth.user.avatar : defaultPic" />
        </div>
        <div v-if="!$auth.loggedIn" class="login" @click="longin">
          {{ $t(`page.users.login.sign`) }}
        </div>
        <div v-else>
          <el-dropdown>
            <span class="login el-dropdown-link line1">
              {{ $auth.user.nickname
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="userBox acea-row row-middle">
                <div class="avatarPic">
                  <img :src="$auth.user ? $auth.user.avatar : defaultPic" />
                </div>
                <div>
                  <div class="nickname">{{ $auth.user.nickname }}</div>
                  <div v-show="$auth.user.phone" class="count">
                    {{ $auth.user.phone }}
                  </div>
                  <div v-show="$auth.user.email" class="count">
                    {{ $auth.user.email }}
                  </div>
                </div>
              </div>
              <el-dropdown-item
                v-for="(menu, index) in userMenu"
                :key="menu.id"
                @click.native="goPage(menu)"
              >
                <div
                  class="dropdownBox"
                  v-show="menu.pc_url && menu.pc_url != ' '"
                >
                  {{ $t(`page.user.mineNav[${index}].name`) }}
                </div>
              </el-dropdown-item>
              <div class="userInfo">
                <el-divider></el-divider>
              </div>
              <el-dropdown-item
                v-for="(menu, index) in menus"
                :key="menu.id"
                @click.native="goPage(menu)"
              >
                <div
                  class="dropdownBox"
                  v-show="menu.pc_url && menu.pc_url != ' '"
                >
                  {{ menu.name }}
                </div>
              </el-dropdown-item>
              <el-button @click="longOut" class="btn">{{
                $t(`page.users.userInfo.logOut`)
              }}</el-button>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="category acea-row" @mouseleave="leave()" v-if="hide">
          <div class="sort">
            <div
              class="item acea-row row-between-wrapper"
              :class="index === current ? 'bg-color' : ''"
              v-for="(item, index) in $store.state.productClassify"
              :key="index"
              @mouseenter="enter(index)"
            >
              <div class="name line1">{{ item.name }}</div>
            </div>
          </div>
          <div
            class="sortCon"
            @mouseleave="show"
            v-if="seen && categoryCurrent"
          >
            <div class="erSort">
              <div
                class="item acea-row row-middle"
                v-for="(item, index) in categoryCurrent"
                :key="index"
              >
                <div class="name line1">{{ item.name }}</div>
                <div class="cateList">
                  <span
                    class="cateItem"
                    @click="goCate(items)"
                    v-for="(items, indexn) in item.childList"
                    :key="indexn"
                  >
                    {{ items.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div> -->
    </div>
  </div>
</template>
<script>
//AMBA-注释
// import VueI18n from 'vue-i18n';
// const i18n = new VueI18n();
import { configMap } from "@/utils/validate.js";
import "../assets/css/style.min.css";
import { MenuItem } from "element-ui";
import { v4 as uuidv4 } from "uuid";
import { findTreeData } from "@/utils/ergodic";
import mySubMenu from "./MySubMenu";
export default {
  name: "headers",
  mixins: [],
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      selectValue: "all",

      // logoUrl: '',
      categoryCurrent: [],
      langList: [
        {
          name: "语言",
          current: 0,
          intro: ["en"],
          // intro: ['zh-CN', 'en', 'fr', 'th', 'lao']
        },
      ],
      menus: [],
      seen: false,
      hide: false,
      navBarFixed: false,
      headerList: [],
      search: "",
      userInfo: {},
      showCode: false,
      hotSearchList: [],
      searchList: [],
      list: [],
      dialogVisible: false,
      current: 1,
      info: "",
      isShow: true,
      appidNum: "",
      hosts: "",
      fromPath: "",
      disabled: false,
      defaultPic: require("../assets/images/morentou.png"),
      cid: null,
      userMenu: [
        {
          id: 111,
          name: this.$t(`page.user.myOrder`),
          pc_url: "/users/order_list",
        },
        {
          id: 222,
          name: this.$t(`page.users.goodsReturn.refundList`),
          pc_url: "/users/refund_list",
        },
        {
          id: 333,
          name: this.$t(`page.users.replyList.navTitle`),
          pc_url: "/users/evaluation_list",
        },
      ],
      menuData: [
        {
          name: "1",
          key: "1",
          title: "Item 1",
          children: [
            {
              key: "1-1",
              name: "1-1",
              title: "Item 1-1",
            },
            {
              key: "1-2",
              name: "1-2",
              title: "Item 1-2",
            },
          ],
        },
        // ... 更多菜单项
      ],

      options: [
        {
          label: "all",
          value: "all",
        },
      ],

      //  label="餐厅名" value="1"
    };
  },
  computed: configMap(["logoUrl"]),
  watch: {
    $route: {
      handler: function (newVal, oldVal) {
        this.search = newVal.query.title ? newVal.query.title : "";
      },
      // 深度观察监听
      deep: true,
    },

    "$store.state.productClassify": {
      handler: function (newVal, oldVal) {
        // this.search = newVal.query.title ? newVal.query.title : "";
        this.menuData = this.toTree(newVal);
        console.log("this.menuData==", this.menuData);
      },
      // 深度观察监听
      deep: true,
    },
  },
  head() {
    if (this.$route.path == "/") {
      // this.hide = true;
      this.navBarFixed = false;
    } else {
      this.hide = false;
    }
    if (this.$auth.loggedIn) {
      this.getMenus();
      this.carCount();
    }
    return {
      title: this.$store.state.titleCon,
    };
  },
  beforeMount() {
    if (this.$auth.loggedIn) {
      this.getMenus();
      this.carCount();
    }
    if (!localStorage.getItem("homeDataPc")) {
      this.getHomeIndex();
    }
    this.getHotSearchList();
    this.$store.dispatch("getProductClassify");
    // this.getLogoUrl()
  },
  mounted() {
    window.addEventListener("keydown", this.keyDown);
    this.hosts = location.origin + location.pathname;

    this.menuData = this.toTree(this.$store.state.productClassify);

    this.fromPath = this.$cookies.get("fromPath");

    window.addEventListener("scroll", this.watchScroll);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  },

  components: {
    mySubMenu,
    MenuItem: {
      name: "MenuItem",
      props: ["item"],
      template: `
        <el-submenu v-if="item.children" :index="item.name">
          <template slot="title">{{ item.title }}</template>
          <menu-item v-for="child in item.children" :key="child.name" :item="child" />
        </el-submenu>
        <el-menu-item v-else :index="item.name">{{ item.title }}</el-menu-item>
      `,
      components: {
        MenuItem,
      },
    },
  },
  methods: {
    change(v) {
      console.log("ags=", v);

      console.log("v==", v);
      this.selectValue = v;
    },
    handleSelect(key, keyPath) {
      let item = findTreeData(
        this.menuData, // 树形数组或者数组数据
        key, // 需要查找的value
        "key" //需要查找数组对象的key
      );

      console.log(key, item);

      this.cid = item.id;
      this.$router.push({
        path: "/goods/goods_search",
        query: {
          cid: item.id,
          // title: this.search ? this.search.trim() : "",
        },
      });
    },
    toTree(data) {
      return data.map((item, index) => {
        const { childList = [], id, name } = item;

        if (!childList.length) {
          this.options.push({
            label: name,
            value: uuidv4(),
            ...item,
          });

          this.options = this.options;
        }

        return {
          children: childList.length ? this.toTree(childList) : [],
          ...item,
          key: uuidv4(),
        };
      });
    },
    getLogoUrl() {
      this.logoUrl = JSON.parse(localStorage.getItem("homeDataPc"))["logoUrl"];
    },
    getHomeIndex() {
      this.$axios.get("/api/pc/home/index").then((res) => {
        // console.log("res.data==", res.data);
        localStorage.setItem("homeDataPc", JSON.stringify(res.data));
      });
    },
    carCount() {
      this.$axios
        .get("/api/front/cart/count?numType=true&type=total")
        .then((res) => {
          this.$store.commit("cartNum", res.data.count);
        });
    },
    /**
     *
     * 语言切换
     */
    languagelTab(n) {
      this.$i18n.locale = n;
      this.$cookies.set("locale", n);
      this.$store.commit("SET_LANG", n);
    },
    /**
     *
     * 退出登录
     */
    async longOut() {
      let val = this.$cookies.get("auth.strategy");
      await this.$auth.logout().then((res) => {
        this.$store.commit("cartNum", 0);
        window.localStorage.clear();
        this.$router.replace({
          path: "/",
        });
      });
    },
    //跳入移动商城地址
    go(url) {
      window.open("https://mobile.glofinerittech.com");
    },
    // 商品分类
    goCate(items) {
      this.cid = items.id;
      this.$router.push({
        path: "/goods/goods_search",
        query: {
          cid: items.id,
          title: this.search ? this.search.trim() : "",
        },
      });
    },
    /**
     *
     * 商户入驻
     */
    goMerSettled() {
      this.$router.push({
        path: `/users/merchant_settled`,
        query: { menuCur: 70 },
      });
    },
    goPage(menu) {
      this.$router.push({
        path: `${menu.pc_url}`,
        query: { menuCur: menu.id },
      });
    },
    /**
     *
     * 获取菜单
     */
    getMenus() {
      this.$axios.get("/api/front/user/menu/user").then((res) => {
        this.menus = res.data.routine_my_menus;
      });
    },
    longin() {
      this.$store.commit("isLogin", true);
      this.$store.commit("isTourists", false);
    },
    getHotSearchList() {
      this.$axios.get("/api/front/search/keyword").then((res) => {
        this.hotSearchList = res.data;
      });
    },
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      // console.log("scrollTop===", scrollTop);

      // if ($nuxt.$route.path == "/" && scrollTop > 120) {
      //   this.navBarFixed = true;
      //   this.hide = false;
      // } else if ($nuxt.$route.path == "/" && scrollTop < 120) {
      //   this.navBarFixed = false;
      //   this.hide = true;
      // } else if ($nuxt.$route.path !== "/" && scrollTop > 120) {
      //   this.navBarFixed = true;
      // } else if ($nuxt.$route.path !== "/" && scrollTop < 120) {
      //   this.navBarFixed = false;
      // }
    },
    AddFavorite() {
      let url = window.location;
      let title = document.title;
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("360se") > -1) {
        this.$message(this.$t(`message.tips.browser`));
      } else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
      } else if (document.all) {
        try {
          window.external.addFavorite(url, title);
        } catch (e) {
          this.$message(this.$t(`message.tips.nubrowser`));
        }
      } else if (window.sidebar) {
        this.$message(this.$t(`message.tips.nubrowser`));
      } else {
        this.$message(this.$t(`message.tips.nubrowser`));
      }
    },

    change(v) {
      this.search = "";
      this.submit();
    },
    submit() {
      const { id = "" } = this.options.find((item) => {
        return this.selectValue == item.value;
      });

      this.$router.push({
        path: "/goods/goods_search",
        query: {
          title: this.search ? this.search.trim() : "",
          cid: id,
        },
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    showLogin() {
      this.$store.commit("isLogin", true);
    },
    keyDown(e) {
      // this.submit()
    },
    enter(index) {
      this.seen = true;
      this.hide = true;
      this.current = index;
      this.categoryCurrent = this.$store.state.productClassify[index].childList;

      console.log(
        "this.$store.state.productClassify==",
        this.$store.state.productClassify
      );
    },
    leave() {
      if ($nuxt.$route.path == "/") {
        this.seen = false;
        this.hide = true;
      } else {
        this.seen = false;
      }
    },
    show(flag) {
      this.hide = flag; // !this.hide;
    },
  },
};
</script>

<style lang="scss">
.middle {
  .el-input-group__prepend {
  }
  .el-select {
    .el-input__inner {
      color: #fff !important ;
    }
  }
  .el-input__inner {
    border: 1px rgb(73, 36, 62) solid;
  }
  .el-input-group__prepend {
    background-color: rgb(73, 36, 62) !important ;
    border-color: rgb(73, 36, 62) !important ;
    .el-icon-arrow-up {
      color: white !important ;
    }
  }
  .el-input-group__append {
    background: rgb(73, 36, 62) !important ;
    border-color: rgb(73, 36, 62) !important ;
    .el-button {
      background: rgb(73, 36, 62) !important ;
      border-color: rgb(73, 36, 62) !important ;

      .el-icon-search {
        color: white !important ;
      }
    }
  }
}

.el-select .el-input {
  width: 100px;
}
</style>
<style scoped lang="scss">
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.mainmenu {
  background: white;
  height: 40px;
  line-height: 10px;
}

.mainmenu > li a {
  height: 40px;
  line-height: 35px;
}

.input-with-select {
  width: 700px;
  margin-top: 20px;
  margin-right: 20px;
}
.mainmenu-odd {
}
.hade-box {
  width: 100%;
  height: 120px;
  overflow: visible;
  position: fixed;
  z-index: 999;
  background: white;

  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

  .hade {
    width: 100%;
    height: 80px;
    background: rgb(0, 0, 0);
    position: fixed;
    z-index: 99;

    .middle {
      width: 1200px;
      height: 80px;
      display: flex;
      margin: 0 auto;

      .left-box {
        flex: 1;

        height: 80px;
        position: relative;

        .menu {
          font-size: 22px;

          position: relative;
          top: 28px;
        }

        .menu:hover {
          color: rgb(233, 51, 35);
          cursor: pointer;
        }

        .logo {
          position: absolute;

          width: 140px;
          height: 80px;
          left: 0px;
          top: 0;

          .img-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            img {
              width: 140px;
              height: auto;
            }
          }
        }
      }

      .right-box {
        height: 80px;
        width: 266px;
       //  display: flex;
        box-sizing: border-box;
        padding-top: 20px;
        padding-left: 20px;

        .input {
          width: 240px;
          height: 40px;
          // border: 1px solid #e93323;
          border: 1px solid #000;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 20px;
          margin-right: 22px;

          .left_select {
            flex: 1;
            input {
              width: 100%;
              outline: none;
              border: 0;
            }
          }

          .right_select {
            display: flex;
            align-items: center;

            .keyword {
              width: 62px;
              height: 16px;
              background: #eeeeee;
              border-radius: 20px;
              font-size: 12px;
              font-family: ArialMT;
              color: #999999;
              line-height: 16px;
              text-align: center;
              margin-right: 5px;
              cursor: pointer;
            }

            .search {
              width: 60px;
              height: 40px;
              // background: #e93323;
              background: #000000;
              border-radius: 20px;
              text-align: center;
              line-height: 40px;
              color: #fff;
              margin-left: 11px;
              cursor: pointer;
            }
          }
        }


        .cartNum{
          display: inline-flex;
        }

      
        .code,
        .car {
          width: 34px;
          height: 34px;
          background: #ffffff;
          border: 1px solid #999999;
          border-radius: 50%;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          position: relative;

          .num {
            position: absolute;
            top: -6px;
            left: 21px;
            color: #fff;
            font-size: 12px;
            padding: 2px 5px;
            border-radius: 100px;
            background-color: #e93323;
            display: inline-block;
            font-weight: 800;
            line-height: 14px;
          }
        }

        .code:hover,
        .car:hover {
        }

        .car {
          margin: 0 20px;

          .icon {
            font-size: 16px;
            color: #333;
          }
        }

         .login-box{
            display: inline-block;
         }
        .login {
          line-height: 30px;
          margin-left: 10px;
          cursor: pointer;
          color: white;
          font-size: 14px;
          font-family: Arial-BoldMT, Arial;
          font-weight: normal;
          cursor: pointer;
          width: 90px;
           
          margin-left: 10px;
        }

        .pic {
          width: 30px;
          height: 30px;
          background: #eeeeee;
          border-radius: 50%;
          display: inline-flex;
          text-align: center;
          line-height: 30px;
          overflow: hidden;
         position: relative;
         top: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .mainmenu {
        a {
          display: inline-block;
        }
      }
    }
  }
}

.userInfo {
  ::v-deep.el-divider--horizontal {
    margin: 10px 0 !important;
  }
}

.dropdownBox {
  width: 245px;
}

.btn {
  margin: 15px 94px;
}

.userBox {
  padding: 10px 20px 20px 20px;

  .avatarPic {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .nickname {
    font-size: 16px;
    font-family: Arial-BoldMT, Arial;
    font-weight: bold;
    color: #333333;
    margin-bottom: 5px;
  }

  .count {
    font-size: 12px;
    font-family: ArialMT;
    color: #999999;
  }
}

.container {
  width: 100%;
  z-index: 99;
  height: 120px;
  overflow: visible;
  background: rgb(0, 0, 0);

  .nav {
    background: #f4f4f4;

    .nav_con {
      width: 1200px;
      height: 30px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      background: #f4f4f4;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 14px;

      .left_nav {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;

        .icon {
          font-size: 12px;
          background: #8a8a8a;
        }

        .home {
          margin-right: 20px;
          cursor: pointer;
        }
      }

      .right_nav {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;

        .orders {
          margin-right: 10px;
        }

        .line {
          width: 1px;
          height: 10px;
          background: #000000;
          opacity: 0.1;
        }

        .apply {
          margin: 0 10px;
          cursor: pointer;
        }

        .mobile {
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }

  .header {
    width: 100%;
    height: 90px;
    margin: auto;
    background: #ffffff;

    .header_con {
      width: 1200px;
      height: 90px;
      margin: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;

      .icon-more {
        font-size: 22px;
        color: #000000;
        cursor: pointer;
      }

      .logo {
        width: 112px;
        height: 40px;
        margin: 0 33px 0 40px;

        img {
          width: 112px;
          height: 40px;
        }
      }

      .input {
        width: 750px;
        height: 40px;
        // border: 1px solid #e93323;
        border: 1px solid #000000;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;

        .left_select {
          input {
            width: 435px;
            outline: none;
            border: 0;
          }
        }

        .right_select {
          display: flex;
          align-items: center;

          .keyword {
            width: 62px;
            height: 16px;
            background: #eeeeee;
            border-radius: 20px;
            font-size: 12px;
            font-family: ArialMT;
            color: #999999;
            line-height: 16px;
            text-align: center;
            margin-right: 5px;
            cursor: pointer;
          }

          .search {
            width: 60px;
            height: 40px;
            // background: #e93323;
            background: #000;
            border-radius: 20px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            margin-left: 11px;
            cursor: pointer;
          }
        }
      }

      .code,
      .car {
        width: 34px;
        height: 34px;
        background: #ffffff;
        border: 1px solid #999999;
        border-radius: 50%;
        text-align: center;
        line-height: 34px;
        cursor: pointer;
        position: relative;

        .num {
          position: absolute;
          top: -6px;
          left: 21px;
          color: #fff;
          font-size: 12px;
          padding: 2px 5px;
          border-radius: 100px;
          background-color: #e93323;
          display: inline-block;
          font-weight: 800;
          line-height: 14px;
        }
      }

      .code {
        margin-left: 24px;
      }

      .car {
        margin: 0 20px;

        .icon {
          font-size: 16px;
          color: #333;
        }
      }

      .pic {
        width: 30px;
        height: 30px;
        background: #eeeeee;
        border-radius: 50%;
        margin-right: 10px;
        text-align: center;
        line-height: 30px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .login {
        font-size: 14px;
        font-family: Arial-BoldMT, Arial;
        font-weight: normal;
        color: #333333;
        line-height: 14px;
        cursor: pointer;
        width: 90px;
        display: block;
        margin-left: 110px;
      }
    }
  }
}

.navBarWrap {
  position: fixed;
  top: 0;
  z-index: 999;
}

.category {
  position: absolute;
  top: 80px;
  left: 0;
  z-index: 999;
}

.sort {
  width: 208px;
  height: 480px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 14px 0;

  .item {
    height: 39px;
    padding: 0 21px;

    .name {
      width: 150px;
      cursor: pointer;
    }

    .iconfont {
      font-size: 10px;
    }
  }
}

.sortCon {
  position: absolute;
  left: 208px;
  width: 772px;
  height: auto;
  background-color: #fff;
  box-shadow: 5px 1px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #f2f2f2;
  border-left: 0;
  border-right: 0;
  padding: 0 5px 20px 20px;

  .title {
    padding-bottom: 8px;
    border-bottom: 1px solid #f1f1f1;

    .font-color {
      padding-bottom: 8px;
      font-size: 16px;
      border-bottom: 2px solid #e93323;
    }
  }

  .erSort {
    min-height: 480px;

    .item {
      margin-top: 23px;
      width: 100%;
      max-height: 100px;
      border-width: 1px;
      border-style: none none solid none;
      border-color: #eee;
      cursor: pointer;

      .name {
        color: #333333;
        font-size: 14px;
        width: 100%;
        font-family: Arial-BoldMT, Arial;

        &:hover {
          color: #e93323;
        }
      }

      .item-child {
        margin: 12px 30px 10px 0;
        font-size: 14px;
        // color: #333333;
        color: #000;
        font-family: ArialMT;
      }

      .pictrue {
        width: 50px;
        height: 50px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .cateList {
      margin: 12px 30px 10px 0;
      font-size: 14px;
      color: #333333;
      font-family: ArialMT;

      .cateItem {
        text-align: center;
        padding: 0 20px;
        display: inline-block;
        cursor: pointer;

        &:hover {
          color: #e93323;
        }
      }
    }
  }
}
</style>

<style>
.el-menu.el-menu--horizontal,
.el-menu--horizontal > .el-submenu .el-submenu__title,
.el-menu--horizontal > .el-submenu .el-submenu__title {
  color: #000;
  border-bottom: none !important ;
}
</style>
