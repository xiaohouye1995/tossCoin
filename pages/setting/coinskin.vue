<template>
	<view class="container">
		<view class="panel" v-for="item in coins" :key="item.guid">
			<view class="panel-title">
				<text>{{item.name}}</text>
			</view>
			<view class="cell">
				<view class="coin-box" :class="{selectActive: coinIndex === item2.id,grayfilter:!item2.status}" v-for="item2 in item.list"
				 :key="item2.id" @tap="selectCoin(item2)">
					<easy-loadimage class="coin-img" mode="widthFix" :scroll-top="scrollTop" :image-src="item2.src"></easy-loadimage>
					<text>{{item2.name}}</text>
					<text class="coin-spec" v-if="item2.value === coinName">使用中</text>
					<view class="coin-lock" v-if="!item2.status">
						<text class="iconfont icon-suoding"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer" v-if="coinIndex !== -1">
			<button v-if="lockStatus" class="footer-btn" @tap="setCoin()">立即使用</button>
			<button v-if="!lockStatus" class="footer-btn" @tap="unlockCoin()">解锁并使用</button>
		</view>
	</view>
</template>

<script>
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	import coinJson from '../../static/json/coin.json'
	// #ifdef MP-WEIXIN
	let rewardedVideoAd = null;
	// #endif
	// #ifdef MP-TOUTIAO
	let videoAd = null;
	// #endif
	export default {
		components: {
			easyLoadimage
		},
		data() {
			return {
				coins: [],
				coinName: '',
				coinIndex: -1,
				lockStatus: false,
				scrollTop: 0,
				isAD: false
			}
		},
		onPageScroll({
			scrollTop
		}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = scrollTop;
		},
		onLoad() {
			this.getCoinList()
			this.getUseCoin()
		},
		onReady() {
			// #ifdef MP-TOUTIAO
			let ttInfo = tt.getSystemInfoSync();
			this.isAD = ttInfo.appName === 'Douyin';
			// #endif
			// #ifdef MP-WEIXIN
			this.isAD = wx.createRewardedVideoAd;
			// #endif
			console.log('isAD', this.isAD)
			if (this.isAD) {
				// #ifdef MP-WEIXIN
				rewardedVideoAd = wx.createRewardedVideoAd({
					adUnitId: 'adunit-b2c2a41e06c50390'
				})
				rewardedVideoAd.onLoad(() => {
					console.log('onLoad event emit')
				})
				rewardedVideoAd.onError((err) => {
					console.log('onError event emit', err)
				})
				rewardedVideoAd.onClose(res => {
					// 用户点击了【关闭广告】按钮
					if (res && res.isEnded) {
						// 正常播放结束，可以下发游戏奖励
						this.unlockCoinSucceeded()
					} else {
						// 播放中途退出，不下发游戏奖励
						uni.showToast({
							title: '抱歉，还没看完视频',
							icon: 'none',
							duration: 2000
						});
					}
				})
				// #endif
				// #ifdef MP-TOUTIAO
				videoAd = tt.createRewardedVideoAd({
					adUnitId: 'dhomos5hc271e67i07'
				})
				videoAd.onClose((res) => {
					if (res.isEnded) {
						// 给予奖励
						this.unlockCoinSucceeded()
					} else {
						// 播放中途退出，不下发游戏奖励
						uni.showToast({
							title: '抱歉，还没看完视频',
							icon: 'none',
							duration: 2000
						});
					}
				});
				// #endif
			}
		},
		methods: {
			// 获取硬币列表
			getCoinList() {
				this.coins = coinJson.data
				let unlockList = uni.getStorageSync('unlockList') || [];
				for (let item of this.coins) {
					for (let item2 of item.list) {
						for (let item3 of unlockList) {
							if (item2.value === item3) {
								item2.status = true
							}
						}
					}
				}
			},
			// 获取当前使用硬币
			getUseCoin() {
				this.coinName = uni.getStorageSync('coinName') || '2020shu'
			},
			// 选中硬币
			selectCoin(value) {
				this.coinIndex = value.id
				this.coinid = value.value
				this.lockStatus = value.status
			},
			// 设置硬币皮肤
			setCoin() {
				uni.setStorageSync('coinName', this.coinid);
				this.getUseCoin();
			},
			// 解锁硬币皮肤
			unlockCoin() {
				if (this.coinIndex === 520 || this.coinIndex === 530) {
					uni.showToast({
						title: '抱歉，您尚未发现此彩蛋。',
						icon: 'none',
						duration: 2000
					});
					return
				}
				let self = this;
				uni.showModal({
					title: '',
					content: '观看广告后即可解锁 \n 江湖走马，且行且恰饭',
					confirmText: '支持一下',
					cancelText: '不为所动',
					confirmColor: '#fd746c',
					success: function(res) {
						if (res.confirm) {
							if (self.isAD) {
								// #ifdef MP-WEIXIN
								rewardedVideoAd.show()
									.catch(() => {
										rewardedVideoAd.load()
											.then(() => rewardedVideoAd.show())
											.catch(err => {
												console.log('激励视频 广告显示失败')
												uni.showToast({
													title: '恰饭失败，请稍后再试',
													icon: 'none',
													duration: 2000
												});
											})
									})
								// #endif
								// #ifdef MP-TOUTIAO
								videoAd
									.show()
									.then(() => {
										console.log("广告显示成功");
									})
									.catch((err) => {
										console.log("广告组件出现问题", err);
										// 可以手动加载一次
										videoAd.load().then(() => {
											console.log("手动加载成功");
											// 加载成功后需要再显示广告
											return videoAd.show();
										});
									});
								// #endif
							} else {
								self.unlockCoinSucceeded();
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 硬币解锁成功
			unlockCoinSucceeded() {
				let unlockList = uni.getStorageSync('unlockList') || [];
				unlockList.push(this.coinid)
				uni.setStorageSync('unlockList', unlockList);
				uni.showToast({
					title: '恭喜解锁成功',
					icon: 'none',
					duration: 2000
				});
				uni.setStorageSync('coinName', this.coinid);
				this.getCoinList();
				this.getUseCoin();
				this.coinIndex = -1
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 10rpx;
		padding-bottom: 80px;
	}

	.coin-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 220rpx;
		height: 260rpx;
		margin-bottom: 20rpx;
		border-radius: 6px;
		box-shadow: 0 4px 9px 0 rgba(109, 107, 107, 0.5);
		position: relative;
	}

	.grayfilter {
		filter: grayscale(100%);
	}

	.coin-lock {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: rgba($color: #000000, $alpha: .6);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icon-suoding {
		color: #fff;
		font-size: 20px;
	}

	.selectActive {
		border-radius: 10px;
		box-shadow: #fd746c 0 10px 20px 0, inset #fd746c 0 0 0 2px, inset rgba(255, 255, 255, 0.5) 0 0 0 3px;
	}

	.coin-img {
		width: 120rpx;
		height: 120rpx;
	}

	.coin-spec {
		color: #ccc;
		font-size: 13pt;
	}
</style>
