<template>
  <div class="login-count">
    <div class="login-box acea-row">
      <div class="loginPic"><el-image :src="loginPic"></el-image></div>
      <!-- 登录弹窗 -->
      <div class="wrapper-count">
        <span class="closeBtn iconfont icon-guanbi" @click="closeLogin"></span>
        <div class="wrapper" v-show="current === 1 || current === 3">
          <!-- <div class="title">
            <span class="item_title" @click="current = 2">{{$t(`page.users.register.tabNav[0].name`)}}</span>
            <span class="font_red item_title">{{$t(`page.users.register.tabNav[1].name`)}}</span>
          </div> -->
          <div class="item phone acea-row row-middle">
            <span class="iconfont icon-shouji"></span>
            <div class="tel-container">
              <country-code-selector :countryCode.sync="countryCode">
              </country-code-selector>
            </div>
            <input type="text" :placeholder="$t(`page.users.register.placePhone`)" v-model="phone">
          </div>
          <div v-show="current === 1" class="item pwd acea-row row-middle mb15">
            <span class="iconfont icon-mima"></span>
            <input type="password" :placeholder="$t(`page.users.login.placePasd`)" v-model="password">
          </div>
          <div v-show="current === 3" class="item verificat acea-row row-between row-middle mb15">
            <div class="acea-row row-middle">
              <span class="iconfont icon-yanzhengma"></span>
              <input type="text" :placeholder="$t(`message.login.emptyCaptche`)" v-model="captcha">
            </div>
            <button class="code font-color" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="code('login')">
              {{ text }}
            </button>
          </div>
          <div class="checkbox-wrapper item_protocol">
            <div v-show="current === 1" class="show_protocol" @click="current = 3">{{$t(`page.users.login.quick`)}}</div>
            <div v-show="current === 3" class="show_protocol" @click="current = 1">{{$t(`page.users.login.pasdLogin`)}}</div>
          </div>
        </div>
        <div class="wrapper" v-show="current === 2" style="margin-bottom: 39px">
          <div class="title">
            <span class="item_title font_red" @click="current = 2"> {{ $t(`page.users.userInfo.email`) }} &nbsp;&nbsp; Login</span>
            <!-- <span class="item_title" @click="current = 1">{{ $t(`page.users.register.tabNav[1].name`) }}</span> -->
          </div>
          <div class="item phone acea-row row-middle">
            <span class="iconfont icon-youxiang"></span>
            <input type="text" :placeholder="$t(`page.users.login.placeEmail`)" v-model="email">
          </div>
          <div class="item pwd acea-row row-between row-middle">
            <div class="acea-row row-middle" style="width: 80%">
              <span class="iconfont icon-mima"></span>
              <input type="password" :placeholder="$t(`page.users.login.placePasd`)" v-model="password">
            </div>
            <el-button type="text font_red" @click="emailPassword=true, current=4">{{$t(`page.users.login.forget`)}}</el-button>
          </div>
        </div>

        <div v-show="current < 4">
          <el-button type="primary" @click="submit" class="signIn bg-color mt15">{{$t(`page.users.login.sign`)}}</el-button>
          <el-button @click="current = 6" class="signIn mat20 creat_account mt15">{{$t(`page.users.login.create`)}}</el-button>
          <div v-if="loginInfo.visitorOpen && $store.state.isShowTourists" @click="current = 7" class="tourists mt15">{{$t(`page.users.login.tourists`)}}</div>
          <div class="checkbox-wrapper item_protocol mt15">
            <label class="well-check">
              <input
                type="checkbox"
                name=""
                value=""
                :checked="isAgree"
                @click="isAgree = !isAgree"
              />
              <i class="icon mr50"></i>
              <span style="margin-left: 30px">{{$t(`message.login.agree`)}}</span>
            </label>
            <nuxt-link
              :to="{path:`/middlewares/privacy_agreement`}"
              target="_blank"
              class="show_protocol"
            >《{{$t(`message.login.agreementName`)}}》
            </nuxt-link>
          </div>
          <!-- 第三方登录 -->
          <!-- <div class="bottom">
            <span class="sign_type">{{$t(`page.users.login.with`)}}</span>
            <div class="sign_type_list">
              <img src="@/assets/images/twitter.png" @click="twitterGetToken()"/>
              <img src="@/assets/images/facebook.png" @click="fbLogin()" />
              <img src="@/assets/images/goggle.png" v-google-signin-button="clientId"/>
            </div>
          </div> -->
        </div>
        <!--忘记邮箱密码-->
        <div class="wrapper" v-show="emailPassword && current === 4">
          <div class="title">{{$t(`page.users.login.forget`)}}</div>
          <div class="info">{{$t(`page.users.login.resetDesc`)}} </div>
          <div class="item phone acea-row row-middle">
            <span class="iconfont icon-youxiang"></span>
            <input type="text" :placeholder="$t(`page.users.login.placeEmail`)" v-model="email">
          </div>
          <el-button type="primary" :loading="loading" @click="next" class="signIn bg-color mt60">{{$t(`page.users.login.next`)}}</el-button>
          <div class="fastLogin" @click="current = 2">
            <span class="">{{$t(`page.users.login.remember`)}}</span>
            <span class="font-color">{{$t(`page.users.login.sign`)}}</span>
          </div>
        </div>
        <!--修改邮箱密码-->
        <div class="wrapper" v-show="current === 5">
          <div class="title">{{$t(`page.users.login.emailVer`)}}</div>
          <div class="info">{{$t(`page.users.login.verDesc`)}}： <span class="font-color">{{email}}</span></div>
          <div class="item verificat acea-row row-between row-middle">
            <div class="acea-row row-middle">
              <span class="iconfont icon-yanzhengma"></span>
              <input type="text" :placeholder="$t(`page.users.register.placeCode`)" v-model="emailCaptcha">
            </div>
            <button class="code font-color" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="forgetEmailCode('login')">
              {{ text }}
            </button>
          </div>
          <div class="item pwd acea-row row-middle">
            <span class="iconfont icon-mima"></span>
            <input type="password" :placeholder="$t(`page.users.login.placePasd`)" v-model="newPassword">
          </div>
          <div class="item pwd acea-row row-middle">
            <span class="iconfont icon-mima"></span>
            <input type="password" :placeholder="$t(`page.users.login.Pasdagain`)" v-model="passwordAgain">
          </div>
          <el-button type="primary" @click="editPwd" class="signIn bg-color mt60">{{$t(`page.users.login.submit`)}}</el-button>
        </div>
        <!--注册-->
        <div class="wrapper" v-show="current === 6">
          <!-- <div class="tabs">
            <span v-for="(item,index) in tabList" :key="index" :class="{ 'active': active == index}" @click="tab(index)">{{item}}</span>
          </div> -->
          <div v-if="active===0" class="item acea-row row-middle">
            <span class="iconfont icon-youxiang"></span>
            <input type="text" :placeholder="$t(`page.users.login.placeEmail`)" v-model="email">
          </div>
          <div v-else class="item acea-row row-middle">
            <span class="iconfont icon-shouji"></span>
            <div class="tel-container">
              <country-code-selector :countryCode.sync="countryCode">
              </country-code-selector>
            </div>
            <input type="text" :placeholder="$t(`page.users.register.placePhone`)" v-model="phone">
          </div>
          <div class="item verificat acea-row row-between row-middle">
            <div class="acea-row row-middle">
              <span class="iconfont icon-yanzhengma"></span>
              <input type="text" :placeholder="$t(`page.users.register.placeCode`)" v-model="captcha">
            </div>
            <button class="code font-color" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="registerCode">
              {{ text }}
            </button>
          </div>
          <div class="item pwd acea-row row-middle mb15">
            <span class="iconfont icon-mima"></span>
            <input type="password" :placeholder="$t(`page.users.login.placePasd`)" v-model="password">
          </div>
          <div class="checkbox-wrapper item_protocol mt15">
            <label class="well-check">
              <input
                type="checkbox"
                name=""
                value=""
                :checked="isAgree"
                @click="isAgree = !isAgree"
              />
              <i class="icon"></i>
              <span style="margin-left: 30px">{{$t(`message.login.agree`)}}</span>
            </label>
            <nuxt-link
              :to="{path:`/middlewares/privacy_agreement`}"
              target="_blank"
              class="show_protocol"
            >《{{$t(`message.login.agreementName`)}}》
            </nuxt-link>
          </div>
          <el-button type="primary" :loading="loading" @click="register" class="signIn bg-color mt60">{{$t(`page.users.register.submit`)}}</el-button>
          <div class="fastLogin">{{$t(`page.users.register.have`)}}<span class="font-color" @click="goLogin">{{$t(`page.users.register.sign`)}}</span></div>
        </div>
        <!--游客登录-->
        <div class="wrapper" v-show="current === 7" style="margin-top: 64px">
          <div class="title">{{$t(`page.users.login.tourists`)}}</div>
          <div class="item acea-row row-middle">
            <span class="iconfont icon-youxiang"></span>
            <input type="text" :placeholder="$t(`page.users.register.placeEmail`)" v-model="email">
          </div>
          <div class="item acea-row row-middle">
            <span class="iconfont icon-shouji"></span>
            <div class="tel-container">
              <country-code-selector :countryCode.sync="countryCode">
              </country-code-selector>
            </div>
            <input type="text" :placeholder="$t(`page.users.register.placePhone`)" v-model="phone">
          </div>
          <el-button type="primary" :loading="loading" @click="touristsRegister" class="signIn bg-color mt60">{{$t(`page.users.login.continue`)}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//AMBA-注释
import sendVerifyCode from "@/mixins/SendVerifyCode";
import {Debounce} from '@/utils/validate.js'
import CountryCodeSelector from "~/components/countryCodeSelector.vue";
import GoogleSignInButton from '@/utils/googleSign.js'
import axios from 'axios'
//import countryCodeSelector from 'vue-country-code-selector'
//import countryList from "./countryList.json";
export default {
  name: "loginStatus",
  components: {CountryCodeSelector},
  mixins: [sendVerifyCode],
  directives: {
    GoogleSignInButton
  },
  data() {
    return {
      loginPic: '',
      countryCode: 86,
      tabList:['Email','Phone'],
      current: 2,
      phone: "",
      password: "",
      confirm_pwd: "",
      captcha: "",
      keyCode: "",
      qrCode: '',
      isShow: true,
      disabled: false,
      codeCheck: null,
      isAgree: false,
      isShowCode: false,
      codeVal: "",
      codeUrl: "",
      codeKey: "",
      emailPassword: false,
      email: '',
      active:0,
      loading: false,
      emailCaptcha: '',
      newPassword: '',
      passwordAgain: '',
      loginInfo: {},
      clientId:"218153851192-fjr08h78npj7jrjtm26rh1nj5acoi4j8.apps.googleusercontent.com"
    }
  },
  watch: {
    current(n) {
      if (n === 3) {
       // this.loginCode();
      } else if (n === 4) {
        this.account = '';
        this.password = '';
        this.confirm_pwd = '';
        this.captcha = '';
      } else {
        this.clearCodeCheck();
      }
    }
  },
  head() {
    return {}
  },
  beforeMount(){
    this.getLoginPic();
    this.getLoginInfo();
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown);
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false);
    this.clearCodeCheck();
  },
  methods: {
    getLoginPic() {
      this.$axios.get('/api/pc/login/getLoginPic').then(res => {
        this.loginPic = res.data.loginLeftImage
      })
    },
    /**
     *获取个人中心menus
     * */
    getMenus() {
      this.$axios.get('/api/front/user/menu/user').then(res => {
        this.loginInfo = res.data;
        if(res.data.facebookOpen && !!res.data.facebookAppId){
          facebookWebLogin.init(res.data.facebookAppId, status => {
            if (status) {
              console.log('The configuration of the Facebook authorized login environment was successful.  ');
            }
          });
        }
      })
    },
    /**
     * 匿名账号登录
     * */
    touristsRegister:Debounce(function () {
      if (!this.email) return this.$message.error(this.$t(`message.login.emailEmpty`));
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i.test(this.email))  return this.$message.error(this.$t(`message.login.correctEmail`));
      let userInfo = {
        "countryCode": this.countryCode,
        "email": this.email,
        "phone": this.phone
      };
      this.$auth.loginWith('local3', {data: userInfo}).then(() => {
        this.isShow = false;
        this.closeLogin();
      })
    }),
    /**
     *获取第三方登录的信息和是否开启
     * */
    getLoginInfo() {
      this.$axios.get('/api/front/login/method/info').then(res => {
        this.loginInfo = res.data;
        if(res.data.facebookOpen && !!res.data.facebookAppId){
          facebookWebLogin.init(res.data.facebookAppId, status => {
            if (status) {
              console.log('The configuration of the Facebook authorized login environment was successful.  ');
            }
          });
        }
      })
    },
    twitterGetToken(){
      this.$axios.get('/api/front/login/twitter/request/token?end=pc').then(res=>{
        this.$cookies.set('twitterToken', res.data)
        window.location.href = res.data.authorizationURL;
      });
    },
    // 谷歌登录
    OnGoogleAuthSuccess(idToken) {

      // loginGoogle(idToken).then(res=>{
      //   this.$store.commit("LOGIN", {
      //     'token': res.data.token
      //   });
      //   // that.getUserInfo(res.data);
      // }).catch(e => {
      //   console.log("google login failed")
      // });
    },
    OnGoogleAuthFail(error) {
      console.log(error)
    },
    goLogin() {
      this.active === 0 ? this.current = 2 : this.current = 1
    },
    // 登录
    submit(){
      if (this.current === 1) {
        this.loginH5();
      } else if (this.current === 2) {
        this.loginEmail();
      } else if (this.current === 3) {
        this.loginMobile();
      }
    },
    tab(index){
      this.active = index;
    },
    next() {
      if (!this.email) return this.$message.error(this.$t(`message.login.emailEmpty`));
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i.test(this.email)) return this.$message.error(this.$t(`message.login.correctEmail`));
      this.current = 5;
    },
    keyDown(e) {
      if (e.keyCode === 13) {
        if (this.current === 1) {
          this.loginH5();
        } else if (this.current === 2) {
          this.loginEmail();
        } else if (this.current === 3) {
          this.loginMobile();
        }
      }
    },
    /**
     *
     * 邮箱账号登录
     */
    async loginEmail(){
      let that = this;
      if (!that.email) return that.$message.error(this.$t(`message.login.emailEmpty`));
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i.test(that.email))  return that.$message.error(this.$t(`message.login.correctEmail`));
      if (!that.password) return that.$message.error(this.$t(`message.login.emptyPassword`));
      if (!that.isAgree) return that.$message.error(that.$t(`message.login.agreement`));
      let userInfo = {
        email: that.email,
        password: that.password
      };
      await that.$auth.loginWith('local2', {data: userInfo}).then(() => {
        that.isShow = false;
        this.closeLogin();
      })
    },
    clearCodeCheck() {
      this.codeCheck && clearInterval(this.codeCheck);
      this.codeCheck = null;
    },
    /**
     *
     * 手机账号登录
     */
    async loginH5() {
      let that = this;
      if (!that.phone) return that.$message.error(that.$t(`message.login.emptyPhone`));
      if (!that.password) return that.$message.error(that.$t(`message.login.emptyPassword`));
      if (!that.isAgree) return that.$message.error(that.$t(`message.login.agreement`));
      let userInfo = {
        countryCode: '+' + that.countryCode,
        password: that.password,
        phone: that.phone
      };
      await that.$auth.loginWith('local', {data: userInfo}).then(() => {
        that.isShow = false;
        this.closeLogin();
      })
    },
    /**
     *
     * 手机验证码登录
     */
    async loginMobile() {
      let that = this;
      if (!that.phone) return that.$message.error(that.$t(`message.login.emptyPhone`));
      if (!that.captcha) return that.$message.error(that.$t(`message.login.emptyCaptche`));
      if (!/^[\w\d]+$/i.test(that.captcha)) return that.$message.error(that.$t(`message.login.correctCaptche`));
      if (!that.isAgree) return that.$message.error(that.$t(`message.login.agreement`));
      let userInfo = {
        phone: that.phone,
        captcha: that.captcha,
        countryCode: '+' + that.countryCode
      };
      await that.$auth.loginWith('local1', {data: userInfo}).then(() => {
        that.isShow = false;
        this.closeLogin();
      })
    },
    registerCode(){
      this.active === 0 ? this.emailCode() : this.code()
    },
    /**
     *
     * 注册
     */
    async register() {
      let that = this;
      if (!that.captcha) return that.$message.error(that.$t(`message.login.emptyCaptche`));
      if (!/^[\w\d]+$/i.test(that.captcha)) return that.$message.error(that.$t(`message.login.correctCaptche`));
      if (!that.password) return that.$message.error(that.$t(`message.login.emptyPassword`));
      if (!that.isAgree) return that.$message.error(that.$t(`message.login.agreement`));
      if(this.active === 0){
        if (!that.email) return that.$message.error(this.$t(`message.login.emailEmpty`));
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i.test(that.email))  return that.$message.error(this.$t(`message.login.correctEmail`));
        that.loading = true
        let userInfo = {
          email: that.email,
          captcha: that.captcha,
          password: that.password
        };
        await that.$auth.loginWith('local4', {data: userInfo}).then(res => {
          that.$message.success(that.$t(`message.login.registerSU`));
          that.isShow = false;
          location.reload()
          that.closeLogin();
          that.loading = false;
        }).catch(err => {
          that.loading = false;
        });
      }else{
        if (!that.phone) return that.$message.error(that.$t(`message.login.emptyPhone`));
        this.loading = true
        let userInfo = {
          countryCode: '+' + that.countryCode,
          captcha: that.captcha,
          phone: that.phone,
          password: that.password
        };
        await that.$auth.loginWith('local5', {data: userInfo}).then(res => {
          that.$message.success(that.$t(`message.login.registerSU`));
          that.isShow = false;
          that.closeLogin();
          that.loading = false;
        }).catch(err => {
          that.loading = false;
        });
      }

    },
    /**
     *
     * 忘记密码
     */
    async editPwd() {
      let that = this;
      if (!that.emailCaptcha) return that.$message.error(that.$t(`message.login.emptyCaptche`));
      if (!that.newPassword) return that.$message.error(that.$t(`message.login.emptyPassword`));
      if (!that.passwordAgain) return that.$message.error(that.$t(`message.login.againPassword`));
      if (that.newPassword != that.passwordAgain) return that.$message.error(that.$t(`message.login.diffPassword`));
      await this.$axios.post("/api/front/login/email/reset/password", {
        email: that.email,
        captcha: that.emailCaptcha,
        newPassword: that.newPassword,
        passwordAgain: that.passwordAgain
      }).then(res => {
        that.$message.success(res.message);
        that.current = 2;
      })
    },
    /**
     *
     * 邮箱验证码
     */
    emailCode: Debounce(function () {
      let that = this;
      if (!that.email) return that.$message.error(this.$t(`message.login.emailEmpty`));
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i.test(that.email))  return that.$message.error(this.$t(`message.login.correctEmail`));
      axios({
        method: 'post',
        url: process.env.BASE_URL + '/api/front/login/email/captcha',
        data: that.email,
        headers: { 'Content-Type': 'application/json; charset=UTF-8'},
      }).then(res => {
        if(res.data.code === 200){
          that.$message.success(res.data.message);
          that.sendCode();
        }else{
          that.$message.error(res.data.message);
        }
      })
    }),
    /**
     *
     * 手机号验证码
     */
    code: Debounce(function () {
       let that = this;
      if (!that.phone) return that.$message.error(that.$t(`message.login.emptyPhone`));
       let templateParam ={
         phone: that.phone,
         countryCode: '+' + that.countryCode
       }
       var formData = new FormData();
       for (let key in templateParam) {formData.append(key, templateParam[key])}
       this.$axios.post('/api/front/login/sendCode', formData).then(res => {
         that.$message.success(res.message);
         that.sendCode();
       })
     }),
    /**
     *
     * 邮箱忘记密码验证码
     */
    forgetEmailCode: Debounce(function () {
      let that = this;
      if (!that.email) return that.$message.error(this.$t(`message.login.emailEmpty`));
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i.test(that.email))  return that.$message.error(this.$t(`message.login.correctEmail`));
      axios({
        method: 'post',
        url: process.env.BASE_URL + '/api/front/login/email/forget/password',
        data: that.email,
        headers: { 'Content-Type': 'application/json; charset=UTF-8'},
      }).then(res => {
        if(res.data.code === 200){
          that.$message.success(res.data.message);
          that.sendCode();
        }else{
          that.$message.error(res.data.message);
        }
      })
    }),
    closeLogin() {
      this.$store.commit("isLogin", false);
      // this.$axios.get('/api/front/user/info').then(res => {
      //  console.log(res)
      // })
    }
  }
}
</script>

<style scoped lang="scss">
  .tourists{
    font-size: 14px;
    color: #666666;
    text-align: center;
    cursor: pointer;
  }
  .login-box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 50px 0;
    width: 840px;
  }
  .loginPic{
    width: 335px;
    height: 540px;
    .el-image, el-image{
      width: 100%;
      height: 100%;
    }
  }
  .mt60{
    margin: 50px auto 0 auto;
  }
  .tabs {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333;
    line-height: 25px;
    span:nth-child(1){
      margin-right: 83px;
    }
    span{
      cursor: pointer;
    }
    .active{
      color: #E93323;
      position: relative;
      ::after{
        content: '';
        position: absolute;
        width: 40px;
        height: 3px;
        background-color: #E93323;
        bottom: -20rpx;
        left: 0;
        right: 0;
        margin:auto ;
      }
    }
  }
.login-count {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.wrapper-count {
  position: relative;
  background-color: #fff;
  padding-top: 50px;
  .closeBtn {
    color: #bbb;
    position: absolute;
    top: 20px;
    right: 20px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
  }
}

.wrapper {
  position: relative;
  width: 505px;
  background-color: #fff;
  text-align: center;
  margin: 0 auto;

  .font_red {
    color: #E93323
  }

  .title {
    font-size: 18px;
    color: #333333;
    position: relative;
    font-weight: bold;

    .item_title {
      cursor: pointer;

      &:first-child {
        margin-right: 70px;
      }
    }

    .iconfont {
      position: absolute;
      top: -71px;
      right: 0;
      font-size: 60px;
      cursor: pointer;
    }
  }

  .info{
    color: #222222;
    font-size: 16px;
    width: 85%;
    text-align: center;
    margin: 20px auto 0;
  }

  .item {
    width: 427px;
    height: 72px;
    line-height: 71px;
    border-bottom: 1px solid #DBDBDB;
    margin: 0 auto;

    &.phone {
      .number {
        width: 65px;
        height: 100%;
        color: #666666;
        border-right: 1px solid #DBDBDB;
      }
      .iconfont {
        font-size: 20px;
      }

      input {
        width: 291px;
      }
    }

    &.pwd {
     //margin-bottom: 15px;

      input {
        width: 291px;
      }
      .iconfont {
        font-size: 20px;
      }
    }

    &.verificat {
      input {
        width: 246px;
      }

      .code {
        line-height: 24px;
        border-radius: 12px;
        border: 1px solid #E93323;
        padding: 0 10px;
        background-color: #fff;
        font-size: 14px;

        img {
          width: 100%;
          height: 100%;
        }

        &.on {
          color: #CCC !important;
        }
      }
    }

    input {
      padding-left: 15px;
      height: 100%;
      border: 0;
      outline: none;
      font-size: 16px;
    }
  }

  .fastLogin {
    margin-top: 20px;
    cursor: pointer;
    color: #666666;
    font-size: 14px;
  }
  .title + .iconfont {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 46px;
    color: #282828;
  }

  &.wxLogin {
    position: relative;
    padding-top: 98px;

    .inner {
      position: absolute;
      top: 34px;
      left: 30px;
      font-size: 20px;
      color: #282828;
    }

    .icon-zhanghaodenglu1 {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 46px;
      color: #282828;
    }
  }

  .wxCode {
    position: relative;
    width: 213px;
    height: 213px;
    padding: 10px;
    margin: 0 auto;

    img {
      display: block;
      width: 100%;
    }

    .iconfont {
      font-size: 22px;
      color: #cbcbcb;
    }

    .iconfont:nth-child(1) {
      position: absolute;
      top: 0;
      left: 0;
    }

    .iconfont:nth-child(2) {
      position: absolute;
      top: 0;
      right: 0;
      transform: rotate(90deg);
    }

    .iconfont:nth-child(3) {
      position: absolute;
      right: 0;
      bottom: 0;
      transform: rotate(180deg);
    }

    .iconfont:nth-child(4) {
      position: absolute;
      bottom: 0;
      left: 0;
      transform: rotate(270deg);
    }
  }

  .tip {
    margin-top: 20px;
    font-size: 16px;
    color: #666;
  }

  .iconfont{
    font-size: 20px;
  }

}

.item_protocol {
  margin: 0 auto 0;
  width: 427px;
  text-align: left;
  font-size: 15px;

  .icon {
    width: 14px;
    height: 14px;
  }

  .show_protocol {
    color: #E93323;
    cursor: pointer;
  }

  .forget_password {
    float: right;
    color: #999999;
    cursor: pointer;

    .icon-wangjimima {
      display: inline-block;
      width: 12px;
      height: 12px;
      line-height: 12px;
      margin-right: 5px;
      position: relative;
      top: 1px;
      text-align: center;
      border: 1px solid #999999;
      border-radius: 100%;
    }
  }
}

.signIn {
  width: 427px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  display: block;

}
.mt15{
  margin: 15px auto 0 auto !important;
}
.creat_account{
  border: 1px solid #DDDDDD;
  color: #333333 !important;
}
.bottom {
  text-align: center;
  margin-top: 30px;
  .sign_type {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #B4B4B4;
    position: relative;
    &::before{
      content: '';
      position: absolute;
      top: 10px;
      left: -50px;
      width: 40px;
      height: 1px;
      background: #ccc;
      opacity: .5;
    }
    &::after{
      content: '';
      position: absolute;
      top: 10px;
      right: -50px;
      width: 40px;
      height: 1px;
      background: #ccc;
      opacity: .5;
    }
  }

  .sign_type_list {
    width: 168px;
    margin: auto;
    display: flex;
    justify-content: space-around;
    padding-top: 20px;

    img {
      width: 36px;
      height: 36px;
    }
  }

}
</style>
