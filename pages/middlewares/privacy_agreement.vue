<template>
  <div class="settled-wrapper wrapper_1200">
    <div class="title wrapper_1200">
      <nuxt-link class="home" to="/">{{$t(`userDrawer.data[0].name`)}} ></nuxt-link>
      {{title}}
    </div>
    <div class="settled-main">
      <div class="user-com-title">
        {{title}}
      </div>
      <div class="protocolMain">
        <div class="content">
          <div class="content-main" v-html="agreement"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//AMBA-注释
export default {
  name: "privacyAgreement",
  auth: "guest",
  data() {
    return {
      agreement: '',
      title: this.$t(`message.login.agreementName`)
    };
  },
  head() {
    return {
      title: this.$t(`message.login.agreementName`)
    }
  },
  beforeMount() {
    this.getAgreement();
  },
  mounted() {
    this.$store.commit("isLogin", false);
  },
  methods: {
    //获取入驻协议内容
    getAgreement() {
      let that = this;
      that.$axios.get("/api/front/login/method/info").then(res => {
        that.agreement = res.data.agreement
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.settled-wrapper {
  .title{
    height: 60px;
    line-height: 60px;
  }
  .settled-main{
    padding: 50px 110px;
    background: #fff;
  }
  .user-com-title {
    font-size: 26px;
    color: #333333;
    text-align: center;
    border: none;
  }
  .content-main{
    color: #333333;
    font-size: 14px;
  }
}
.footer{
  text-align: center;
}
</style>
