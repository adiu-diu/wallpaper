"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classlist",
  setup(__props) {
    const wallList = common_vendor.ref([]);
    const noData = common_vendor.ref(false);
    const queryParams = common_vendor.ref({
      pageNum: 1,
      // 记录当前获取到哪一页的数据
      pageSize: 12
    });
    const pageName = common_vendor.ref();
    const getWallList = async (data) => {
      let result;
      if (queryParams.value.type)
        result = await api_apis.apiUserWallList(data);
      else
        result = await api_apis.apiGetWallList(data);
      wallList.value = [...wallList.value, ...result.data];
      if (result.data.length !== queryParams.value.pageSize) {
        noData.value = true;
      }
      common_vendor.index.setStorageSync("picList", wallList.value);
    };
    common_vendor.onLoad((e) => {
      let { id = null, name = null, type = null } = e;
      if (type)
        queryParams.value.type = type;
      common_vendor.index.__f__("log", "at pages/classlist/classlist.vue:54", id, type);
      if (!id && !type)
        utils_common.goHome();
      pageName.value = name;
      queryParams.value.classid = id;
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
    });
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      queryParams.value.pageNum++;
      getWallList(queryParams.value);
    });
    common_vendor.onMounted(() => {
      getWallList(queryParams.value);
    });
    common_vendor.onShareAppMessage(() => {
      return {
        title: `adiu-${pageName.value}`,
        path: `/pages/classlist/classlist?id=${queryParams.value.classid}&name=${pageName.value}`
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "adiu",
        query: `id=${queryParams.value.classid}&name=${pageName.value}`
      };
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("picList");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !wallList.value.length && !noData.value
      }, !wallList.value.length && !noData.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(wallList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: `/pages/preview/preview?id=${item._id}`,
            c: item._id
          };
        }),
        d: wallList.value.length
      }, wallList.value.length ? {
        e: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd381383"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/classlist/classlist.js.map
