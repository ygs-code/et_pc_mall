<template>
  <div v-loading="loading"
       :element-loading-text="$t(`message.login.loginLoading`)"
       element-loading-target="document.body"
       class="callback-twitter">
  </div>
</template>

<script>
  // AMAB - ZS
  export default {
    name: "callback_twitter",
    auth: false,
    data() {
      return {
        loading: true
      }
    },
    beforeMount() {
    },
    mounted() {
      if (this.$route.query.oauth_verifier) this.twitterLogin();
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
        this.$nuxt.$loading.finish();
      });
    },
    methods: {
      twitterLogin() {
        let tToken = this.$cookies.get('twitterToken');
        let userInfo = {
          oauthToken: tToken.token,
          oauthTokenSecret: tToken.tokenSecret,
          oauthVerifier: this.$route.query.oauth_verifier
        };
        this.$auth.loginWith('local6', {data: userInfo}).then(res => {
          this.$router.push({path: "/"});
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .callback-twitter {
    width: 100%;
    min-height: 500px;
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
</style>
