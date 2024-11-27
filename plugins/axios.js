// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import { Message } from "element-ui";

export default function ({ redirect, $axios, app }) {
  let that = this;
  // 数据访问前缀
  if (process.server) {
    // 获取服务端的token
    // var token = getCookie.getcookiesInServer(req).token;
  }
  if (process.client) {
    // 获取客户端token
    // var token = getCookie.getcookiesInClient('token');
  }
  // 请求拦截器
  $axios.interceptors.request.use(
    (config) => {
      let local = app.$cookies.get("auth.strategy");
      let token = app.$cookies.get(`auth._token.${local}`);
      if (token) {
        config.headers.common["authori-zation"] = token.slice(7);
      }
      config.headers.common["Form-type"] = "pc";
      return config;
    },
    (error) => {
      // do something with request error
      return Promise.reject(error);
    }
  );

  // response拦截器，数据返回后，可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(
    (response) => {
      let code = response.data.code;
      switch (code) {
        case 200:
          //   app.$cookies.set("fromPath",location.pathname+location.search);
          return response.data;
        case 400:
          Message.error(response.data.message || "参数校验失败");
          return Promise.reject();
        case 403:
          Message.error(response.data.message || "没有相关权限");
          return Promise.reject();
        case 404:
          Message.error(response.data.message || "没有找到相关数据");
          return Promise.reject();
        case 500:
          Message.error(response.data.message || "系统异常");
          return Promise.reject();
        case 401:
        case 410000:
        case 410001:
        case 410002:
          app.$cookies.set("fromPath", location.pathname + location.search);
          let local = app.$cookies.get("auth.strategy");
          app.$cookies.remove(`auth._token.${local}`);
          localStorage.clear();
          if ($nuxt.$route.path !== "/") {
            app.store.commit("isLogin", true);
            Message.error(response.data.message);
          }
          return Promise.reject();
        default:
          Message.error(response.data.message || "系统错误");
          return Promise.reject();
      }
    },
    (error) => {
      if (process.client) {
      }
      // if(error.response.status == 500){
      //   // http状态500，服务器内部错误，重定向到500页面
      //   redirect("/500.htm")
      // }
      // if(error.response.status == 404){
      //   // http状态500，请求API找不到，重定向到404页面
      //   redirect("/404.html")
      // }
      return Promise.reject(error); // 返回接口返回的错误信息
    }
  );
}
