"use strict";
const common_vendor = require("../common/vendor.js");
const formatTimeDiff = (Timestamp) => {
  const diff = Date.now() - Timestamp;
  if (diff < 6e4) {
    return "1分钟内";
  } else if (diff < 36e5) {
    return Math.floor(diff / 6e4) + "分钟";
  } else if (diff < 864e5) {
    return Math.floor(diff / 36e5) + "小时";
  } else if (diff < 2592e6) {
    return Math.floor(diff / 864e5) + "天";
  } else if (diff < 7776e6) {
    return Math.floor(diff / 2592e6) + "月";
  } else {
    return null;
  }
};
const goHome = () => {
  common_vendor.index.showModal({
    title: "提示",
    content: "页面有误，将跳转回首页",
    showCancel: false,
    success: (res) => {
      if (res.confirm) {
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      }
    }
  });
};
exports.formatTimeDiff = formatTimeDiff;
exports.goHome = goHome;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/common.js.map
