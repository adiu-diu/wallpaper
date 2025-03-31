<template>
	<view class="classlist">
		<!-- 加载组件:在初始页面加载且有数据可请求到时显示 -->
		<view class="loadingLayout" v-if="!wallList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="`/pages/preview/preview?id=${item._id}`" class="item" v-for="item in wallList" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<!-- 加载组件:初始页面加载时不显示 -->
		<view class="loadingLayout" v-if="wallList.length">
			<uni-load-more :status="noData ? 'noMore':'loading'"></uni-load-more>
		</view>
		<!-- 小程序底部安全区域(home键) -->
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {apiGetWallList,apiUserWallList} from '@/api/apis.js'
import { onLoad,onUnload,onShareAppMessage,onShareTimeline,onReachBottom} from '@dcloudio/uni-app'
import {goHome} from '@/utils/common.js'
// 存储当前图片列表数据
const wallList = ref([])
// 定义当前是否需要跳过这次请求发送
const noData = ref(false)
// 获取图片列表的参数信息
const queryParams = ref({
	pageNum:1,   // 记录当前获取到哪一页的数据
	pageSize:12
})
const pageName = ref()
// 获取当前图片列表数据
const getWallList = async(data) =>{
	let result
	// 若是通过 我的下载 或者 我的评分 点击进入的此页面
	if(queryParams.value.type) result = await apiUserWallList(data)
	else result = await apiGetWallList(data)
	// 将新获取到的数据和先前的数据做一个整合
	wallList.value = [...wallList.value,...result.data]
	if(result.data.length !== queryParams.value.pageSize){
		noData.value = true
	}
	uni.setStorageSync('picList',wallList.value)
}
// 使用onLoad生命周期钩子来获取页面传递的参数
onLoad((e)=>{
	let {id=null,name=null,type=null} = e;
	// 通过 我的下载 或者 我的评分 点击进入的此页面   整合参数向apiUserWallList发送请求
	if(type) queryParams.value.type = type;
	console.log(id,type);
	// 通过分享进入的此页面，则没有id也没有type类型
	if(!id && !type) goHome()
	pageName.value = name
	queryParams.value.classid = id
	uni.setNavigationBarTitle({
		title:name
	})
})
// 触底回调
onReachBottom(()=>{
	if(noData.value) return;
	queryParams.value.pageNum++;
	getWallList(queryParams.value)
})
// 在组件挂载后发送请求
onMounted(()=>{
	getWallList(queryParams.value)
})

// 分享给好友
onShareAppMessage(()=>{
	return {
		title:`adiu-${pageName.value}`,
		path:`/pages/classlist/classlist?id=${queryParams.value.classid}&name=${pageName.value}`
	}
})
// 分享到朋友圈
onShareTimeline(()=>{
	return {
		title:"adiu",
		query:`id=${queryParams.value.classid}&name=${pageName.value}`
	}
})
// 离开页面时删除本地存储中的列表
onUnload(()=>{
	uni.removeStorageSync('picList')
})
</script>

<style lang="scss" scoped>
@import url('@/common/style/common-style.scss');
.classlist{
	.content{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		padding: 5rpx;
		.item{
			height: 440rpx;
			image{
				width:100%;
				height: 100%;
				display: block;
			}
		}
	}
}       
</style>
