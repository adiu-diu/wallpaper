<template>
	<view class="preview" v-if="picInfo">
		<swiper circular @change="swiperChange" :current="currentIndex">
			<swiper-item v-for="(item,index) in list" :key="item._id">
				<!-- 这里的v-if是用于处理局部加载资源,若是v-if不加以限制会直接加载所有的图像资源,造成流量消耗 -->
				<!-- readList.includes(index)通过判断当前的索引来判断资源是否加载 -->
				<image v-if="readList.includes(index)" @click="maskChange" :src="item.picurl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-show="maskState">
			<view class="goBack" :style="{top:getStatusBarHeight()+'px'}" @click="goBack">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="count">{{currentIndex+1}}&nbsp;&nbsp;/&nbsp;&nbsp;{{list.length}}</view>
			<view class="time">
				<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="Date.now()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click="clickScore">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">{{picInfo.score}}分</view>
				</view>
				<view class="box" @click="downLoad">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>

		<!-- 点击信息之后弹出的信息窗口 -->
		<uni-popup ref="infoPopup">
			<view class="infoPopup">
				<view class="popHeader">
					<!-- 标题 -->
					<view class="title">壁纸信息</view>
					<view class="close" @click="closeInfo">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<!-- 内容 -->
				<scroll-view scroll-y>
					<view class="content">
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text selectable class="value">{{picInfo._id}}</text>
						</view>
						<view class="row">
							<view class="label">分类：</view>
							<text class="value class">adiu</text>
						</view>
						<view class="row">
							<view class="label">发布者：</view>
							<text class="value">{{picInfo.nickname}}</text>
						</view>
						<view class="row">
							<text class="label">分数：</text>
							<view class="value rateBox">
								<uni-rate readonly touchable :value="picInfo.score" size="16" />
								<text class="score">{{picInfo.score}}分</text>
							</view>
						</view>
						<view class="row">
							<text class="label">摘要：</text>
							<view class="value abstract">
								{{picInfo.description}}
							</view>
						</view>
						<view class="row">
							<text class="label">标签：</text>
							<view class="value tabs">
								<view class="tab" v-for="item in picInfo.tabs">
									{{item}}
								</view>
							</view>
						</view>
						<view class="copyright">
							adiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiuadiu
						</view>
						<view class="safe-area-inset-bottom"></view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<!-- 点击评分之后的弹窗 -->
		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<!-- 标题 -->
					<view class="title">壁纸评分</view>
					<view class="close" @click="closeScoreInfo">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate v-model="userScore" :allowHalf="true" />
					<text class="text">{{userScore}}分</text>
				</view>
				<view class="footer">
					<button @click="submitScore" :disabled="!userScore" type="default" size="mini" plain>确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad,onShareAppMessage,onShareTimeline
	} from '@dcloudio/uni-app'
	import {
		getStatusBarHeight
	} from "@/utils/system.js"
	import {
		apiSetupScore,
		apiDownloadWall,
		apiDetailWall
	} from '@/api/apis.js'
	// 遮罩层状态
	const maskState = ref(true)
	// 获取信息popup组件实例
	const infoPopup = ref(null)
	// 获取评分popup组件实例
	const scorePopup = ref(null)
	// 当前的用户评分
	const userScore = ref(0)
	// 存储当前具体的图像列表
	const list = ref([])
	// 获取当前存储的列表信息
	const picList = uni.getStorageSync('picList') || []
	// 将数据映射到list中,并对picurl进行处理
	list.value = picList.map(item => {
		return {
			...item,
			picurl: item.smallPicurl.replace('_small.webp', '.jpg')
		}
	})
	// 获取当前页面的id
	const currentId = ref(null)
	// 获取当前页面的index
	const currentIndex = ref(null)
	// 存储当前已加载的图像列表
	const readList = ref([])
	// 存储当前图像的信息
	const picInfo = ref([])
	// 遮罩层的点击回调
	const maskChange = () => {
		maskState.value = !maskState.value
	}
	// 打开信息弹窗的回调
	const clickInfo = () => {
		infoPopup.value.open('bottom');
	}
	// 关闭信息弹窗的回调
	const closeInfo = () => {
		infoPopup.value.close();
	}
	// 打开评分弹窗的回调
	const clickScore = () => {
		scorePopup.value.open()
	}
	// 关闭评分弹窗的回调
	const closeScoreInfo = () => {
		scorePopup.value.close();
		userScore.value = 0
	}
	// 确认评分的回调
	const submitScore = async () => {
		// apiSetupScore
		let {
			classid,
			_id: wallId
		} = picInfo.value
		let result = await apiSetupScore({
			classid,
			wallId,
			userScore: userScore.value
		})
		if (result.errCode === 0) {
			uni.showToast({
				title: '评分成功！',
				icon: "none"
			})
			closeScoreInfo()
		}
	}
	// 回退按钮的回调
	const goBack = () => {
		uni.navigateBack({
			success:res=>{},
			fail:err=>{
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		})
	}
	// 获取传递的参数
	onLoad(async(e) => {
		currentId.value = e.id
		// 若是通过分享点击进入的此页面
		if(e.type === 'share'){
			let res = await apiDetailWall({
				id:currentId.value
			})
			list.value = res.data.map(item=>{
				return {
					...item,
					picurl:item.smallPicurl.replace('_small.webp', '.jpg')
				}
			})
		}
		currentIndex.value = list.value.findIndex(item => {
			return item._id === currentId.value
		})
		picInfo.value = list.value[currentIndex.value]
		readListFunc()
	})
	// 轮播图滑动的回调
	const swiperChange = (e) => {
		currentIndex.value = e.detail.current
		picInfo.value = list.value[currentIndex.value]
		readListFunc()
	}
	// 局部加载图片的回调
	const readListFunc = () => {
		readList.value.push(
			currentIndex.value == 0 ? list.value.length - 1 : currentIndex.value - 1,
			currentIndex.value,
			currentIndex.value == list.value.length - 1 ? 0 : currentIndex.value + 1
		)
		readList.value = [...new Set(readList.value)]
	}
	// 下载图片的回调
	const downLoad = async () => {
		// #ifdef H5
		uni.showModal({
			title: '请长按进行保存',
			showCancel: false
		})
		// #endif
		// #ifndef H5
		try {
			uni.showLoading({
				title:'下载中...',
				mask:true
			})
			let {
				classid,
				_id: wallId
			} = picInfo.value
			let res = await apiDownloadWall({
				classid,
				wallId
			})
			if (res.errCode != 0) throw res;
			uni.getImageInfo({
				src: picInfo.value.picurl,
				success: res => {
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success: res => {
							uni.showToast({
								title: '保存成功,请到相册查看',
								icon: 'none'
							})
						},
						fail: err => {
							if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
								uni.showToast({
									title: '下载失败,请重新下载',
									icon: 'none'
								})
								return;
							}
							console.log(err);
							uni.showModal({
								title: '提示',
								content: '需要授权保存相册',
								success: res => {
									if (res.confirm) {
										uni.openSetting({
											success: setting => {
												if (setting
													.authSetting[
														'scope.writePhotosAlbum'
														]) {
													uni.showToast({
														title: '获取授权成功',
														icon: 'none'
													})
												} else {
													uni.showToast({
														title: '获取授权失败',
														icon: 'none'
													})
												}
											}
										})
									}
								}
							})
						},
						complete: () => {
							uni.hideLoading()
						}
					})
				}

			})
		} catch (e) {
			uni.hideLoading()
		}
		// #endif
	}
	// 分享给好友
	onShareAppMessage(()=>{
		return {
			title:"adiu",
			path:`/pages/preview/preview?id=${currentId.value}&type=share`
		}
	})
	// 分享到朋友圈
	onShareTimeline(()=>{
		return {
			title:"adiu",
			query:`id=${currentId.value}&type=share`
		}
	})	
</script>

<style lang="scss" scoped>
	.preview {
		width: 100%;
		height: 100vh;
		position: relative;

		swiper {
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.mask {
			.goBack {
				position: absolute;
				width: 38px;
				height: 38px;
				background: rgba(0, 0, 0, 0.5);
				left: 30rpx;
				margin-left: 0;
				border-radius: 100px;
				top: 0;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.count {
				position: absolute;
				// 下面三行是否元素水平居中
				left: 0;
				right: 0;
				margin: auto;
				width: fit-content; // 宽度由内容决定
				color: #fff;
				top: 10vh;
				background: rgba(0, 0, 0, 0.3);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				backdrop-filter: blur(10rpx);
			}

			.time {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				color: #fff;
				width: fit-content;
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				font-weight: 100;
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
			}

			.date {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				color: #fff;
				width: fit-content;
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
			}

			.footer {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				bottom: 10vh;
				background: rgba(255, 255, 255, 0.8);
				width: 65vw;
				height: 120rpx;
				border-radius: 120rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(20rpx);

				.box {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding: 2rpx 12rpx;

					.text {
						font-size: 26rpx;
						color: #777;

					}
				}
			}
		}

		.popHeader {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			.title {
				font-size: 26rpx;
				color: #676767;
			}

			.close {
				position: absolute;
				right: 6rpx;
				padding: 6rpx;
			}
		}

		.infoPopup {
			background: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;

			// overflow: hidden;
			scroll-view {
				max-height: 60vh;

				.content {
					.row {
						display: flex;
						padding: 16rpx 0;
						font-size: 32rpx;
						line-height: 1.7em;

						.label {
							color: #a7a7a7;
							text-align: right;
							font-size: 30rpx;
							width: 140rpx;
						}

						.value {
							flex: 1;
							width: 0;
							// overflow: hidden; /* 内容超出时隐藏 */
							// white-space: nowrap; /* 内容不换行 */
							// text-overflow: ellipsis; /* 超出部分显示省略号 */
						}

						.rateBox {
							display: flex;
							align-items: center;

							.score {
								font-size: 26rpx;
								color: #676767;
								padding-left: 10rpx;
							}
						}

						.abstract {
							word-wrap: break-word;
							max-width: 100%;
						}

						.tabs {
							display: flex;
							flex-wrap: wrap;
							align-items: center;
							padding-top: 4rpx;

							.tab {
								border: 1px solid $brand-theme-color;
								color: $brand-theme-color;
								font-size: 22rpx;
								padding: 10rpx 30rpx;
								border-radius: 40rpx;
								line-height: 1em;
								margin: 0 10rpx 10rpx 0;
							}
						}

						.class {
							color: $brand-theme-color;
						}
					}

					.copyright {
						word-wrap: break-word;
						max-width: 100%;
						font-size: 28rpx;
						padding: 20rpx;
						background: #f6f6f6;
						color: #666;
						border-radius: 10rpx;
						margin: 20rpx 0;
						line-height: 1.6em;
					}
				}
			}
		}

		.scorePopup {
			background: #fff;
			padding: 30rpx;
			border-radius: 30rpx;
			width: 70vw;

			.content {
				padding: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.text {
					padding-left: 10rpx;
					color: #FFCA3E;
					width: 80rpx;
					text-align: right;
					line-height: 1em;
				}
			}

			.footer {
				padding: 10rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>