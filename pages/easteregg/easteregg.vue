<template>
	<view class="container">
		<view class="talk">
			<text class="talk-text">
				愿贪吃不胖 \n
				愿长生不老 \n
				愿美梦不空 \n
				愿深情不负 \n
				愿你此生纵情豁达
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			let totalCount = uni.getStorageSync('recordTotalCount') + 1;
			let facadeCount = uni.getStorageSync('recordFacadeCount') + 1;
			uni.setStorageSync('recordTotalCount', totalCount);
			uni.setStorageSync('recordFacadeCount', facadeCount);
			console.log(111)
			this.getEastereggCode()
		},
		methods: {
			// 获取彩蛋码
			getEastereggCode() {
				console.log(222)
				uni.showModal({
				    title: '彩蛋码',
				    content: 'cd52078x8，前往硬币中心下拉刷新，输入彩蛋码即可获得彩蛋硬币',
					showCancel: false,
					confirmColor: '#fd746c',
					confirmText: '复制',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							uni.setClipboardData({
								data: 'cd52078x8',
								success: function() {
									uni.showToast({
										title: '复制成功',
										duration: 2000
									});
								}
							});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100vh;
		background-image: url('https://tosscoin-1256354221.file.myqcloud.com/img/bg_3.jpg');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	.talk {
		text-align: center;
		color: #fff;
		font-size: 17pt;
		padding-top: 140rpx;
	}

	.talk-text {
		line-height: 1.3;
	}
</style>
