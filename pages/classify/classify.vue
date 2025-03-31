<template>
	<view class="classLayout pageBg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
		</view>
	</view>
</template>

<script setup>
import { apiClassifyList } from '@/api/apis.js'
import { ref,onMounted } from 'vue'
import { onShareAppMessage,onShareTimeline } from '@dcloudio/uni-app'
// 分类的列表数据
const classifyList = ref([])
// 获取分类的列表数据
const getClassifyList = async(data) =>{
	let result = await apiClassifyList(data)
	classifyList.value = result.data
}
// 在组件挂载后发送请求
onMounted(()=>{
	getClassifyList({pageSize:15})
})
// 分享给好友
onShareAppMessage(()=>{
	return {
		title:"adiu",
		path:"/pages/classify/classify"
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
.classify{
	padding: 30rpx;
	display: grid;
	gap: 15rpx;
	grid-template-columns: repeat(3,1fr);
}       
</style>
