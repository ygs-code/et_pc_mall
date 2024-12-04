<template>
  <div ref="tsRoot">
    <client-only>
      <divHeader ref="tsHeader"></divHeader>
    </client-only>
    <divLogin ref="tsLogin" v-if="$store.state.login"></divLogin>
    <nuxt ref="tsNuxt" />
    <divFooter></divFooter>
  </div>
</template>
<script>
//AMBA-注释
import divHeader from '~/components/headers.vue'
import divFooter from '~/components/footers.vue'
import divLogin from '~/components/login.vue'
export default {
  components: {
    divHeader,
    divFooter,
    divLogin
  },
  mounted() {
    this.getTokenIsExist()
  },
  methods: {
    getTokenIsExist() {
      this.$axios.post(`/api/front/login/token/is/exist`).then(res => {
        if (!res.data) {
          let local = this.$cookies.get('auth.strategy');
          this.$cookies.remove(`auth._token.${local}`);
          this.$store.commit("isLogin", false);
        }
      }).catch(() => {
        let local = this.$cookies.get('auth.strategy');
        this.$cookies.remove(`auth._token.${local}`);
        this.$store.commit("isLogin", false);
      });
    }
  }
}
</script>
