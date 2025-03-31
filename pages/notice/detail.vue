<template>
	<view class="noticeLayout">
		<view class="title">
			<view class="tag" v-if="detail.select">
				<uni-tag text="置顶" type="error" inverted></uni-tag>
			</view>
			<view class="font">{{detail.title}}</view>
		</view>
		<view class="info">
			<view class="item">{{detail.author}}</view>
			<view class="item">
				<uni-dateformat :date="detail.publish_date" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>
		<view class="content">
			<rich-text :nodes="detail.content"></rich-text>
		</view>
		<view class="count">
			阅读 {{detail.view_count}}
		</view>
	</view>
</template>

<script setup>
import { apiWallNewsDetail } from '@/api/apis.js'
import { onMounted, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// 存储详情信息
const detail = ref({})
// 存储当前的id
const currentId = ref()
const getWallNewsDetail = () =>{
	apiWallNewsDetail({
		id:currentId.value
	}).then(res=>{
		detail.value = res.data
		console.log(detail.value);
	})
}
onLoad((e)=>{
	let { id } = e
	currentId.value = id
})
onMounted(()=>{
	getWallNewsDetail()
})
</script>

<style lang="scss" scoped>
.noticeLayout{
	padding: 30rpx;
	.title{
		font-size: 40rpx;
		color: #111;
		line-height: 1.6em;
		padding-bottom: 30rpx;
		display: flex;
		.tag{
			transform: scale(0.8);
			transform-origin: left center;
			flex-shrink: 0;
		}
		.font{
			padding-left: 6rpx;
		}
	}
	.info{
		display: flex;
		align-items: center;
		color: #999;
		font-size: 28rpx;
		.item{
			padding-right: 20rpx;
		}
	}
	.content{
		padding: 50rpx 0;
	}
	.count{
		color: #999;
		font-size: 28rpx;
	}
}
</style>
