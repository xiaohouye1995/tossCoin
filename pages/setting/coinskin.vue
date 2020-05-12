<template>
	<view class="container">
		<view class="panel" v-for="item in coins" :key="item.guid">
			<view class="panel-title">
				<text>{{item.name}}</text>
			</view>
			<view class="cell">
				<view class="coin-box" :class="{selectActive: coinIndex === item2.id,grayfilter:!item2.status}" v-for="item2 in item.list"
				 :key="item2.id" @tap="selectCoin(item2)">
					<image class="coin-img" :src="item2.src" mode="aspectFit" lazy-load></image>
					<text>{{item2.name}}</text>
					<text class="coin-spec" v-if="item2.value === coinName">使用中</text>
					<view class="coin-lock" v-if="!item2.status">
						<text class="iconfont icon-suoding"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer" v-if="coinIndex !== -1">
			<button v-if="lockStatus" class="footer-btn" type="primary" style="background: #fd746c;" @tap="setCoin()">立即使用</button>
			<button v-if="!lockStatus" class="footer-btn" type="primary" style="background: #fd746c;" @tap="unlockCoin()">解锁并使用</button>
		</view>
		<!-- 彩蛋输入框 -->
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog type="info" mode="input" placeholder="输入彩蛋码" @close="closeDialog" @confirm="confirmDialog"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import coinJson from '../../static/json/coin.json'
	let rewardedVideoAd = null;
	export default {
		components: {uniPopup, uniPopupDialog},
		data() {
			return {
				coins: [],
				coinName: '',
				coinIndex: -1,
				lockStatus: false
			}
		},
		onLoad() {
			this.getCoinList()
			this.getUseCoin()
		},
		onReady() {
			if (wx.createRewardedVideoAd) {
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
				if (this.coinIndex === 520) {
					this.$refs.popup.open()
					return
				}
				uni.showModal({
				    title: '',
				    content: '观看广告后即可解锁 \n 江湖走马，且行且恰饭',
					confirmText: '支持一下',
					cancelText: '不为所动',
					confirmColor: '#fd746c',
				    success: function (res) {
				        if (res.confirm) {
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
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			// 硬币解锁成功
			unlockCoinSucceeded () {
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
			},
			closeDialog (done) {
				done()
			},
			confirmDialog (done,value) {
				if (value === 'cd52078x8') {
					this.unlockCoinSucceeded()
					done()
				} else {
					uni.showToast({
						title: '彩蛋码错误',
						icon: 'none',
						duration: 2000
					});
				}
			}
		},
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
