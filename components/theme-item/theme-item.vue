<template>
	<view class="theme-item">
		<!-- 每一项的分类 -->
		<navigator :url="`/pages/classlist/classlist?id=${item._id}&name=${item.name}`" class="box" v-if="!isMore">
			<image class="pic" :src="item.picurl" mode="aspectFill"></image>
			<view class="mask">{{item.name}}</view>
			<view class="tab">{{formatTimeDiff(item.updateTime) ? formatTimeDiff(item.updateTime) + '前更新' : ""}}</view>
		</navigator>
		
		<!-- 更多 -->
		<navigator open-type="reLaunch" url="/pages/classify/classify" class="box more" v-else>
			<image class="pic" src="../../common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="30" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>



<script setup>
import { formatTimeDiff } from '@/utils/common.js'
defineProps({
	// 接收props来判断当前应该展示的是哪一种类型项
	isMore:{
		type:Boolean,
		default:false
	},
	// 获取当前组件应该展示的内容
	item:{
		type:Object,
		default(){
			return {
				name:'默认名称',
				picurl:'../../common/images/classify1.jpg',
				updateTime:Date.now()
			}
		}
	}
})
</script>

<style lang="scss" scoped>
.theme-item{
	.box{
		height: 340rpx;
		border-radius: 10rpx;   
		overflow: hidden;  // 这里设置overflow的原因是给box添加圆角会给图片覆盖
		position: relative;
		.pic{
			width: 100%;
			height: 100%;
		}
		.mask{
			height: 70rpx;
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			// 下面三行设置磨砂玻璃效果的背景
			background: rgba(0,0,0,0.2);
			color: #fff;
			backdrop-filter: blur(20rpx);  
			font-size: 28rpx;
			font-weight: 600;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.tab{
			position: absolute;
			top: 0;
			left: 0;
			background: rgba(250,129,90,0.7);
			backdrop-filter: blur(20rpx); 
			color:#fff;
			font-size: 22rpx;
			padding: 6rpx 14rpx;
			border-radius: 0 0 20rpx 0;
		}
	}
	// 既有box类也有more类
	.box.more{
		.mask{
			width: 100%;
			height: 100%;
			flex-direction: column;
			.text{
				font-size: 28rpx;
			}
		}
	}
}
</style>