"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const maskState = common_vendor.ref(true);
    const infoPopup = common_vendor.ref(null);
    const scorePopup = common_vendor.ref(null);
    const userScore = common_vendor.ref(0);
    const list = common_vendor.ref([]);
    const picList = common_vendor.index.getStorageSync("picList") || [];
    list.value = picList.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    const currentId = common_vendor.ref(null);
    const currentIndex = common_vendor.ref(null);
    const readList = common_vendor.ref([]);
    const picInfo = common_vendor.ref([]);
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const clickInfo = () => {
      infoPopup.value.open("bottom");
    };
    const closeInfo = () => {
      infoPopup.value.close();
    };
    const clickScore = () => {
      scorePopup.value.open();
    };
    const closeScoreInfo = () => {
      scorePopup.value.close();
      userScore.value = 0;
    };
    const submitScore = async () => {
      let {
        classid,
        _id: wallId
      } = picInfo.value;
      let result = await api_apis.apiSetupScore({
        classid,
        wallId,
        userScore: userScore.value
      });
      if (result.errCode === 0) {
        common_vendor.index.showToast({
          title: "评分成功！",
          icon: "none"
        });
        closeScoreInfo();
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        success: (res) => {
        },
        fail: (err) => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    };
    common_vendor.onLoad(async (e) => {
      currentId.value = e.id;
      if (e.type === "share") {
        let res = await api_apis.apiDetailWall({
          id: currentId.value
        });
        list.value = res.data.map((item) => {
          return {
            ...item,
            picurl: item.smallPicurl.replace("_small.webp", ".jpg")
          };
        });
      }
      currentIndex.value = list.value.findIndex((item) => {
        return item._id === currentId.value;
      });
      picInfo.value = list.value[currentIndex.value];
      readListFunc();
    });
    const swiperChange = (e) => {
      currentIndex.value = e.detail.current;
      picInfo.value = list.value[currentIndex.value];
      readListFunc();
    };
    const readListFunc = () => {
      readList.value.push(
        currentIndex.value == 0 ? list.value.length - 1 : currentIndex.value - 1,
        currentIndex.value,
        currentIndex.value == list.value.length - 1 ? 0 : currentIndex.value + 1
      );
      readList.value = [...new Set(readList.value)];
    };
    const downLoad = async () => {
      try {
        common_vendor.index.showLoading({
          title: "下载中...",
          mask: true
        });
        let {
          classid,
          _id: wallId
        } = picInfo.value;
        let res = await api_apis.apiDownloadWall({
          classid,
          wallId
        });
        if (res.errCode != 0)
          throw res;
        common_vendor.index.getImageInfo({
          src: picInfo.value.picurl,
          success: (res2) => {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res2.path,
              success: (res3) => {
                common_vendor.index.showToast({
                  title: "保存成功,请到相册查看",
                  icon: "none"
                });
              },
              fail: (err) => {
                if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                  common_vendor.index.showToast({
                    title: "下载失败,请重新下载",
                    icon: "none"
                  });
                  return;
                }
                common_vendor.index.__f__("log", "at pages/preview/preview.vue:286", err);
                common_vendor.index.showModal({
                  title: "提示",
                  content: "需要授权保存相册",
                  success: (res3) => {
                    if (res3.confirm) {
                      common_vendor.index.openSetting({
                        success: (setting) => {
                          if (setting.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showToast({
                              title: "获取授权成功",
                              icon: "none"
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "获取授权失败",
                              icon: "none"
                            });
                          }
                        }
                      });
                    }
                  }
                });
              },
              complete: () => {
                common_vendor.index.hideLoading();
              }
            });
          }
        });
      } catch (e) {
        common_vendor.index.hideLoading();
      }
    };
    common_vendor.onShareAppMessage(() => {
      return {
        title: "adiu",
        path: `/pages/preview/preview?id=${currentId.value}&type=share`
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "adiu",
        query: `id=${currentId.value}&type=share`
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: picInfo.value
      }, picInfo.value ? {
        b: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: readList.value.includes(index)
          }, readList.value.includes(index) ? {
            b: common_vendor.o(maskChange, item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        c: common_vendor.o(swiperChange),
        d: currentIndex.value,
        e: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        f: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        g: common_vendor.o(goBack),
        h: common_vendor.t(currentIndex.value + 1),
        i: common_vendor.t(list.value.length),
        j: common_vendor.p({
          date: Date.now(),
          format: "hh:mm"
        }),
        k: common_vendor.p({
          date: Date.now(),
          format: "MM月dd日"
        }),
        l: common_vendor.p({
          type: "info",
          size: "28"
        }),
        m: common_vendor.o(clickInfo),
        n: common_vendor.p({
          type: "star",
          size: "28"
        }),
        o: common_vendor.t(picInfo.value.score),
        p: common_vendor.o(clickScore),
        q: common_vendor.p({
          type: "download",
          size: "23"
        }),
        r: common_vendor.o(downLoad),
        s: maskState.value,
        t: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        v: common_vendor.o(closeInfo),
        w: common_vendor.t(picInfo.value._id),
        x: common_vendor.t(picInfo.value.nickname),
        y: common_vendor.p({
          readonly: true,
          touchable: true,
          value: picInfo.value.score,
          size: "16"
        }),
        z: common_vendor.t(picInfo.value.score),
        A: common_vendor.t(picInfo.value.description),
        B: common_vendor.f(picInfo.value.tabs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        C: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        D: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        E: common_vendor.o(closeScoreInfo),
        F: common_vendor.o(($event) => userScore.value = $event),
        G: common_vendor.p({
          allowHalf: true,
          modelValue: userScore.value
        }),
        H: common_vendor.t(userScore.value),
        I: common_vendor.o(submitScore),
        J: !userScore.value,
        K: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        L: common_vendor.p({
          ["is-mask-click"]: false
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/preview/preview.js.map
