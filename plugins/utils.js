//AMBA-注释
import Vue from "vue";
var comsys = {
  install(Vue) {
    Vue.prototype.comsys = {
      getScrollTop: function () {
        let scrollTop = 0,
          bodyScrollTop = 0,
          documentScrollTop = 0;
        if (document.body) {
          bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop =
          bodyScrollTop - documentScrollTop > 0
            ? bodyScrollTop
            : documentScrollTop;
        return scrollTop;
      },
      //浏览器视口的高度
      getScrollHeight: function () {
        let scrollHeight = 0,
          bodyScrollHeight = 0,
          documentScrollHeight = 0;
        if (document.body) {
          bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
          documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight =
          bodyScrollHeight - documentScrollHeight > 0
            ? bodyScrollHeight
            : documentScrollHeight;
        return scrollHeight;
      },
      //浏览器视口的高度
      getWindowHeight: function () {
        let windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
          windowHeight = document.documentElement.clientHeight;
        } else {
          windowHeight = document.body.clientHeight;
        }
        return windowHeight;
      },
      //除法函数，用来得到精确的除法结果
      //说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
      //返回值：arg1除以arg2的精确结果
      Div: function (arg1, arg2) {
        arg1 = parseFloat(arg1);
        arg2 = parseFloat(arg2);
        var t1 = 0,
          t2 = 0,
          r1,
          r2;
        try {
          t1 = arg1.toString().split(".")[1].length;
        } catch (e) {}
        try {
          t2 = arg2.toString().split(".")[1].length;
        } catch (e) {}
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return this.Mul(r1 / r2, Math.pow(10, t2 - t1));
      },
      //加法函数，用来得到精确的加法结果
      //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
      //返回值：arg1加上arg2的精确结果
      Add: function (arg1, arg2) {
        arg2 = parseFloat(arg2);
        var r1, r2, m;
        try {
          r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
          r1 = 0;
        }
        try {
          r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
          r2 = 0;
        }
        m = Math.pow(100, Math.max(r1, r2));
        return (this.Mul(arg1, m) + this.Mul(arg2, m)) / m;
      },
      //减法函数，用来得到精确的减法结果
      //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
      //返回值：arg1减去arg2的精确结果
      Sub: function (arg1, arg2) {
        arg1 = parseFloat(arg1);
        arg2 = parseFloat(arg2);
        var r1, r2, m, n;
        try {
          r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
          r1 = 0;
        }
        try {
          r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
          r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        //动态控制精度长度
        n = r1 >= r2 ? r1 : r2;
        return ((this.Mul(arg1, m) - this.Mul(arg2, m)) / m).toFixed(n);
      },
      //乘法函数，用来得到精确的乘法结果
      //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
      //返回值：arg1乘以arg2的精确结果
      Mul: function (arg1, arg2) {
        arg1 = parseFloat(arg1);
        arg2 = parseFloat(arg2);
        var m = 0,
          s1 = arg1.toString(),
          s2 = arg2.toString();
        try {
          m += s1.split(".")[1].length;
        } catch (e) {}
        try {
          m += s2.split(".")[1].length;
        } catch (e) {}
        return (
          (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
          Math.pow(10, m)
        );
      },
      //客服
      chatConfig: function (chatConfig) {
        switch (chatConfig.serviceType) {
          case "H5":
          case "h5":
            location.href = chatConfig.serviceLink;
            break;
          case "message":
            window.open(chatConfig.serviceMessage);
            break;
          case "phone":
          case "hotline":
            window.location.href = "tel://" + chatConfig.servicePhone;
            break;
          case "email":
            parent.location.href = "mailto:" + chatConfig.serviceEmail;
            break;
        }
      },
    };
  },
};
Vue.use(comsys);

const global = {
  //获取币种配置
  shopPayCurrency:
    typeof localStorage !== "undefined" &&
    localStorage.getItem("homeDataPc") &&
    JSON.parse(localStorage.getItem("homeDataPc")).shopPayCurrency
      ? JSON.parse(
          JSON.parse(localStorage.getItem("homeDataPc")).shopPayCurrency
        ).symbol
      : "₹",
};

Vue.prototype.GLOBAL = global;
