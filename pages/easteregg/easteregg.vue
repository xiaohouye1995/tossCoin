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
			let facadeCount = uni.getStorageSync('recordFacadeCount') + 1;
			uni.setStorageSync('recordFacadeCount', facadeCount);
			this.getEastereggCode()
		},
		methods: {
			// 获取彩蛋码
			getEastereggCode() {
				uni.showModal({
				    title: '恭喜您！',
				    content: '520彩蛋硬币获取成功，请前往硬币中心查看',
					showCancel: false,
					confirmColor: '#fd746c',
					confirmText: '知道了',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							let unlockList = uni.getStorageSync('unlockList') || [];
							if (unlockList.findIndex(item => item === 'love') === -1) {
								unlockList.push('love');
								uni.setStorageSync('unlockList', unlockList);
							}
							
							// uni.setClipboardData({
							// 	data: 'cd52078x8',
							// 	success: function() {
							// 		uni.showToast({
							// 			title: '复制成功',
							// 			duration: 2000
							// 		});
							// 	}
							// });
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
