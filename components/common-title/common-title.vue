<template>
	<view class="common-title">
		<view class="name">
			<!-- 设置具名插槽入口 -->
			<slot name="name"></slot>
		</view>
		<view class="custom">
			<!-- 设置具名插槽入口 -->
			<slot name="custom"></slot>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.common-title{
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 30rpx;
	.name{
		font-size: 40rpx;
	}
}
</style>