import { request } from "@/utils/request.js"


// 获取首页轮播图数据
export const apiGetBanner = () =>{
	return request({
		url:'/homeBanner',
	})
}

// 获取首页每日推荐随机壁纸
export const apiGetRandomWall = () =>{
	return request({
		url:'/randomWall',
	})
}

// 获取首页公告列表信息
export const apiGetNewsList = (data={}) =>{
	return request({
		url:'/wallNewsList',
		data
	})
}

// 获取首页推荐列表
export const apiClassifyList = (data={}) =>{
	return request({
		url:'/classify',
		data
	})
}

// 获取分类列表页面中的图像信息
export const apiGetWallList = (data={}) =>{
	return request({
		url:'/wallList',
		data
	})
}

// 获取下载的结果
export const apiDownloadWall = (data={}) =>{
	return request({
		url:'/downloadWall',
		data
	})
}

// 对壁纸进行评分
export const apiSetupScore = (data={}) =>{
	return request({
		url:'/setupScore',
		data
	})
}

// 获取分享时的单张壁纸
export const apiDetailWall = (data={}) =>{
	return request({
		url:'/detailWall',
		data
	})
}

// 获取个人信息
export const apiUserInfo = (data={}) =>{
	return request({
		url:'/userInfo',
		data
	})
}

// 获取下载及评分列表
export const apiUserWallList = (data={}) =>{
	return request({
		url:'/userWallList',
		data
	})
}

// 获取notice详情
export const apiWallNewsDetail = (data={}) =>{
	return request({
		url:'/wallNewsDetail',
		data
	})
}


// 获取搜索结果
export const apiSearchWall = (data={}) =>{
	return request({
		url:'/searchWall',
		data
	})
}