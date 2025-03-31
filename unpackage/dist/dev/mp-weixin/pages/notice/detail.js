"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const detail = common_vendor.ref({});
    const currentId = common_vendor.ref();
    const getWallNewsDetail = () => {
      api_apis.apiWallNewsDetail({
        id: currentId.value
      }).then((res) => {
        detail.value = res.data;
        common_vendor.index.__f__("log", "at pages/notice/detail.vue:37", detail.value);
      });
    };
    common_vendor.onLoad((e) => {
      let { id } = e;
      currentId.value = id;
    });
    common_vendor.onMounted(() => {
      getWallNewsDetail();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: detail.value.select
      }, detail.value.select ? {
        b: common_vendor.p({
          text: "置顶",
          type: "error",
          inverted: true
        })
      } : {}, {
        c: common_vendor.t(detail.value.title),
        d: common_vendor.t(detail.value.author),
        e: common_vendor.p({
          date: detail.value.publish_date,
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        f: detail.value.content,
        g: common_vendor.t(detail.value.view_count)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f737f11"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/notice/detail.js.map
