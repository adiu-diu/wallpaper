"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "theme-item",
  props: {
    // 接收props来判断当前应该展示的是哪一种类型项
    isMore: {
      type: Boolean,
      default: false
    },
    // 获取当前组件应该展示的内容
    item: {
      type: Object,
      default() {
        return {
          name: "默认名称",
          picurl: "../../common/images/classify1.jpg",
          updateTime: Date.now()
        };
      }
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !__props.isMore
      }, !__props.isMore ? {
        b: __props.item.picurl,
        c: common_vendor.t(__props.item.name),
        d: common_vendor.t(common_vendor.unref(utils_common.formatTimeDiff)(__props.item.updateTime) ? common_vendor.unref(utils_common.formatTimeDiff)(__props.item.updateTime) + "前更新" : ""),
        e: `/pages/classlist/classlist?id=${__props.item._id}&name=${__props.item.name}`
      } : {
        f: common_assets._imports_0$1,
        g: common_vendor.p({
          type: "more-filled",
          size: "30",
          color: "#fff"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f4eafbca"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/theme-item/theme-item.js.map
