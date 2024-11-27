// const VUE_APP_API_URL = "http://api.glofinerittech.com/"; //spa 模式无需配置 15.207.106.154

const VUE_APP_API_URL = "http://front.glofinerittech.com/"
const MODE = "universal"; //服务器渲染模式 (需要独立部署) 打包命令 npm run build
//const MODE = "spa"; //单页面形式渲染模式 (打包后将 dist目录覆盖到 public/pc 目录下) 打包命令: npm run generate

//(上方配置,不做独立部署无需修改)
module.exports = {
  env: {
    BASE_URL: VUE_APP_API_URL,
  },
  mode: MODE,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "CrmebJavaWebMerPC",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        hid: "description",
        name: "description",
        content:
          "CRMEB开源商城系统，围绕新零售、品牌连锁、商家入驻等多种商业模式，自主研发B2C商城系统、B2B2C多商户商城系统、连锁多门店商城系统、跨境电商系统等；应用于直播电商、社交新零售、商家入驻等多种应用场景，系统支持多语言、多端登录，代码开源、独立部署、永久免费升级。咨询：400-8888-794",
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "CRMEB官网,新零售社交电商,小程序商城,公众号商城,免费商城系统源码,商城系统开发,开源商城系统,微商城源码,多店商城系统,直播商城系统,多商户商城,B2B2C,私域电商,分销商城,高性能商城系统,陀螺匠企业助手",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "http-equiv",
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "https://js.stripe.com/v3/" }],
  },
  loading: { color: "#e93323" },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: "@/assets/iconfont/iconfont.css", ssr: false },
    "@/assets/css/index.scss",
    { src: "element-ui/lib/theme-chalk/index.css", ssr: false },
    { src: "swiper/dist/css/swiper.css" },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/axios",
    "@/plugins/i18n.js",
    { src: "@/plugins/vue-swiper.js", ssr: false },
    { src: "@/plugins/element-ui", ssr: true },
    { src: "@/plugins/utils.js", ssr: true },
    { src: "@/plugins/vue-clipboard.js", ssr: true },
    { src: "@/plugins/filter.js", ssr: true },
    { src: "@/plugins/component.js", ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "cookie-universal-nuxt",
    "nuxt-sass-resources-loader",
    // 'stripe'
  ],
  router: {
    middleware: ["auth"],
  },
  //local 手机密码登录，
  //local1 手机号验证码登录,
  //local2 邮箱登录
  //local6 twitter登录
  auth: {
    strategies: {
      local: {
        _scheme: "local",
        endpoints: {
          login: {
            url: "/api/front/login/mobile/password",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/api/front/login/logout",
            method: "get",
          },
          user: {
            url: "/api/front/user/info",
            method: "get",
            propertyName: false,
          },
        },
      },
      local1: {
        _scheme: "local",
        token: {
          property: "token",
          name: "X-Access-Token",
          type: false,
        },

        endpoints: {
          login: {
            url: "/api/front/login/mobile/captcha",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/api/front/login/logout",
            method: "get",
          },
          user: {
            url: "/api/front/user/info",
            method: "get",
            propertyName: false,
          },
        },
      },
      local2: {
        _scheme: "local",
        endpoints: {
          login: {
            url: "/api/front/login/email",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/api/front/login/logout",
            method: "get",
          },
          user: {
            url: "/api/front/user/info",
            method: "get",
            propertyName: false,
          },
        },
      },
      local3: {
        _scheme: "local",
        endpoints: {
          login: {
            url: "/api/front/login/register/visitor",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/api/front/login/logout",
            method: "get",
          },
          user: {
            url: "/api/front/user/info",
            method: "get",
            propertyName: false,
          },
        },
      },
      local4: {
        _scheme: "local",
        endpoints: {
          login: {
            url: "/api/front/login/register/email",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/api/front/login/logout",
            method: "get",
          },
          user: {
            url: "/api/front/user/info",
            method: "get",
            propertyName: false,
          },
        },
      },
      local5: {
        _scheme: "local",
        endpoints: {
          login: {
            url: "/api/front/login/register/mobile",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/api/front/login/logout",
            method: "get",
          },
          user: {
            url: "/api/front/user/info",
            method: "get",
            propertyName: false,
          },
        },
      },
      local6: {
        _scheme: "local",
        endpoints: {
          login: {
            url: "/api/front/login/twitter",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/api/front/login/logout",
            method: "get",
          },
          user: {
            url: "/api/front/user/info",
            method: "get",
            propertyName: false,
          },
        },
      },
    },
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/",
      home: false,
    },
    cookie: {
      options: {
        maxAge: 60 * 60 * 24 * 7,
      },
    },
    localStorage: false,
  },

  axios: {
    baseURL: VUE_APP_API_URL,
    proxyHeaders: false,
    credentials: false,
    debug: `${process.env.NODE_ENV}` !== "production",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: "/pc/",
    publicPathFolder: MODE === "spa" ? "/" : "",
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(wav)(\?.*)?$/,
        loader: "file-loader",
      });
    },
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
          },
        ],
      ],
    },
  },
  vendor: ["element-ui", "vue-i18n"],

  server: {
    port: 8000,
    host: "0.0.0.0", // default: localhost
  },
};
