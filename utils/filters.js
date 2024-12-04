//AMBA-注释
import i18n from "../plugins/i18n.js"; // 国际化
import { state } from "@/store/index.js";

// 公共过滤器
export function filterEmpty(val) {
  let _result = "-";
  if (!val) {
    return _result;
  }
  _result = val;
  return _result;
}

/**
 * 商户类别
 */
export function selfTypeFilter(status) {
  const statusMap = {
    true: "自营",
    false: "非自营",
  };
  return statusMap[status];
}

/**
 * 日期去掉时间
 */
export function dateFormat(value) {
  if (!value) {
    return "";
  }
  return value.split(" ")[0];
}

/**
 * 商铺类型
 */
export function merchantTypeFilter(status) {
  if (!status) {
    return "";
  }
  let arrayList = state().merchantType;
  let array = arrayList.filter((item) => status === item.id);
  if (array.length) {
    return array[0].name;
  } else {
    return "";
  }
}
