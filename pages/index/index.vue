<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar></custom-nav-bar>
		<!-- 横向轮播图 -->
		<view class="banner">
			<swiper indicator-dots="true" indicator-color="rgba(255,255,255,0.5)" 
			indicator-active-color="#fff"  circular interval="2000">
				<swiper-item v-for="item in bannerList" :key="item._id">
					<navigator :url="`/pages/classlist/classlist?${item.url}`" class="like" v-if="item.target == 'self'">
						<image :src="item.picurl" mode="aspectFit"></image>
					</navigator>
					<navigator url="/pages/index/index" class="like" v-else>
						<image :src="item.picurl" mode="aspectFit"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 纵向公告轮播 -->
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20" color="#28b389"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay circular interval="1500" duration="300">
					<swiper-item v-for="item in newsList" :key="item._id">
						<navigator :url="`/pages/notice/detail?id=${item._id}`">{{item.title}}</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
		<!-- 每日推荐 -->
		<view class="select">
			<!-- 标题部分 -->
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18" color="#28b389"></uni-icons>
						<uni-dateformat class="text" :date="Date.now()" format="dd日"></uni-dateformat>
					</view>
				</template>
			</common-title>
			<!-- 内容区域 -->
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in randomList" :key="item._id" @click="goPreview(item._id)">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 专题精选 -->
		<view class="theme">
			<!-- 标题部分 -->
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator class="more" url="/pages/classify/classify" open-type="reLaunch">More+</navigator>
				</template>
			</common-title>
			<!-- 内容区域 -->
			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<!-- 通过props来传递当前的项是不是 更多 这一项 -->
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
import { apiGetBanner,apiGetRandomWall,apiGetNewsList,apiClassifyList } from '@/api/apis.js'
import { ref,onMounted } from 'vue'
import { onShareAppMessage,onShareTimeline } from '@dcloudio/uni-app'
// 存储页面轮播图的数据
const bannerList = ref([])
// 存储随机壁纸的数据
const randomList = ref([])
// 存储纵向轮播的数据
const newsList = ref([])
// 推荐分类的数据
const classifyList = ref([])
// 每日推荐区域图片跳转
const goPreview = (id) =>{
	uni.setStorageSync('picList',randomList.value)
	uni.navigateTo({
		url:`/pages/preview/preview?id=${id}`
	})
}

// 获取页面轮播图的数据
const getBanner = async() =>{
	let result = await apiGetBanner()
	bannerList.value = result.data
	console.log("bannerList",bannerList.value);
}
// 获取随机壁纸的数据
const getRandomWall = async() =>{
	let result = await apiGetRandomWall()
	randomList.value = result.data
}
// 获取纵向轮播图的数据
const getNewsList = async(data) =>{
	let result = await apiGetNewsList(data)
	newsList.value = result.data
	console.log("newsList.value",newsList.value);
}
// 获取推荐分类的列表数据
const getClassifyList = async(data) =>{
	let result = await apiClassifyList(data)
	classifyList.value = result.data
	console.log(classifyList.value);
}
// 在组件挂载后发送请求
onMounted(()=>{
	getBanner()
	getRandomWall()
	getNewsList({select:true})
	getClassifyList({select:true})
})

// 分享给好友
onShareAppMessage(()=>{
	return {
		title:"adiu",
		path:"/pages/index/index"
	}
})
// 分享到朋友圈
onShareTimeline(()=>{
	return {
		title:"adiu"
	}
})
</script>

<style lang="scss" scoped>
.homeLayout{
	.banner{
		width:750rpx;
		padding: 30rpx 0;
		swiper{
			width: 750rpx;
			height: 340rpx;
			swiper-item{
				padding: 0 30rpx;
				/* #ifdef H5 */
				padding-left: 40rpx;
				/* #endif */
				.like{
					width: 100%;
					height: 100%;
					image{
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
					}
				}
				
			}
		}
	}
	.notice{
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #f9f9f9;
		margin: 0 auto;   // 上下水平居中
		border-radius: 80rpx;
		display: flex;
		.left{
			width: 140rpx;
			// 下面三行用于控制上下水平居中
			display: flex;
			align-items: center;
			justify-content: center;
			.text{
				color: $brand-theme-color;
				font-weight: 600;
				font-size: 28rpx;
			}
		}
		.center{
			flex:1;
			swiper{
				height: 80rpx;
				font-size: 30rpx;
				color:#666;
				swiper-item{
					// 这三行用于控制文本溢出使用...来替代
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis
				}
			}
		}
		.right{
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.select{
		.date{
			display: flex;
			justify-content: center;
			align-items: center;
			color: $brand-theme-color;
			.text{
				margin-left: 5rpx;
			}
		}
		padding-top: 50rpx;
		.content{
			width:720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;
			scroll-view{
				white-space: nowrap;
				.box{
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.box:last-child{
					margin-right: 30rpx;
				}
				
			}
		}
	}
	.theme{
		margin-top: 50rpx;
		padding-bottom: 50rpx;
		.more{
			font-size: 32rpx;
			color: #888;
		}
		.content{
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;  // 开启网格布局
			gap:15rpx;    // 设置每个之间的间距
			grid-template-columns: repeat(3,1fr);   // 设置每行分配3个,并且每个占比都是1fr   若是要设置不同的占比:grid-template-columns:1fr 2fr 1fr
		}
	}
}
</style>
