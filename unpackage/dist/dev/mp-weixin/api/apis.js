"use strict";
const utils_request = require("../utils/request.js");
const apiGetBanner = () => {
  return utils_request.request({
    url: "/homeBanner"
  });
};
const apiGetRandomWall = () => {
  return utils_request.request({
    url: "/randomWall"
  });
};
const apiGetNewsList = (data = {}) => {
  return utils_request.request({
    url: "/wallNewsList",
    data
  });
};
const apiClassifyList = (data = {}) => {
  return utils_request.request({
    url: "/classify",
    data
  });
};
const apiGetWallList = (data = {}) => {
  return utils_request.request({
    url: "/wallList",
    data
  });
};
const apiDownloadWall = (data = {}) => {
  return utils_request.request({
    url: "/downloadWall",
    data
  });
};
const apiSetupScore = (data = {}) => {
  return utils_request.request({
    url: "/setupScore",
    data
  });
};
const apiDetailWall = (data = {}) => {
  return utils_request.request({
    url: "/detailWall",
    data
  });
};
const apiUserInfo = (data = {}) => {
  return utils_request.request({
    url: "/userInfo",
    data
  });
};
const apiUserWallList = (data = {}) => {
  return utils_request.request({
    url: "/userWallList",
    data
  });
};
const apiWallNewsDetail = (data = {}) => {
  return utils_request.request({
    url: "/wallNewsDetail",
    data
  });
};
const apiSearchWall = (data = {}) => {
  return utils_request.request({
    url: "/searchWall",
    data
  });
};
exports.apiClassifyList = apiClassifyList;
exports.apiDetailWall = apiDetailWall;
exports.apiDownloadWall = apiDownloadWall;
exports.apiGetBanner = apiGetBanner;
exports.apiGetNewsList = apiGetNewsList;
exports.apiGetRandomWall = apiGetRandomWall;
exports.apiGetWallList = apiGetWallList;
exports.apiSearchWall = apiSearchWall;
exports.apiSetupScore = apiSetupScore;
exports.apiUserInfo = apiUserInfo;
exports.apiUserWallList = apiUserWallList;
exports.apiWallNewsDetail = apiWallNewsDetail;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/apis.js.map
