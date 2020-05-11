<template>
	<view class="container">
		<view class="panel-top" v-if="showTop">
			<input class="panel-top-input" type="text" value="" placeholder="输入彩蛋码" confirm-type="done" @confirm="checkCode" />
		</view>
		<view class="panel" v-if="easteregg">
			<view class="panel-title">
				<text>彩蛋系列</text>
			</view>
			<view class="cell">
				<view class="coin-box" :class="{selectActive: coinIndex === 520}" @tap="selectCoin(caidan)">
					<image class="coin-img" :src="caidan.src" mode="aspectFit"></image>
					<text>{{caidan.name}}</text>
					<text class="coin-spec" v-if="caidan.value === coinName">使用中</text>
				</view>
			</view>
		</view>
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
	</view>
</template>

<script>
	import coinJson from '../../static/json/coin.json'
	let rewardedVideoAd = null;
	export default {
		data() {
			return {
				coins: [],
				// xingzuoList: [],
				caidan: {},
				coinName: '',
				coinIndex: -1,
				easteregg: false,
				showTop: false,
				lockStatus: false
			}
		},
		onLoad() {
			this.getCoinList()
			this.getUseCoin()
			this.getEasteregg()
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
				this.caidan = {
					"id": 520,
					"name": "520",
					"value": "love",
					"src": "https://tosscoin-1256354221.file.myqcloud.com/img/love_back.png"
				}
				let unlockList = uni.getStorageSync('unlockList') || [];
				for (let item of this.coins[1].list) {
					for (let item2 of unlockList) {
						if (item.value === item2) {
							item.status = true
						}
					}
				}
			},
			// 获取当前使用硬币
			getUseCoin() {
				this.coinName = uni.getStorageSync('coinName') || '2020shu'
			},
			// 获取彩蛋
			getEasteregg() {
				this.easteregg = uni.getStorageSync('easteregg') || false;
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
				uni.showModal({
				    title: '',
				    content: '观看广告后即可解锁',
					confirmText: '支持一下',
					cancelText: '再想想',
					confirmColor: '#fd746c',
				    success: function (res) {
				        if (res.confirm) {
				            rewardedVideoAd.show()
				            .catch(() => {
				                rewardedVideoAd.load()
				                .then(() => rewardedVideoAd.show())
				                .catch(err => {
				                  console.log('激励视频 广告显示失败')
				                })
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			// 输入彩蛋码
			checkCode(e) {
				let code = e.detail.value
				if (code === 'cd52078x8') {
					uni.showToast({
						title: '恭喜获得520彩蛋硬币',
						icon: 'none',
						duration: 2000
					});
					uni.setStorageSync('easteregg', true);
					this.getEasteregg()
				} else {
					uni.showToast({
						title: '彩蛋码错误',
						icon: 'none',
						duration: 2000
					});
				}
				this.showTop = false;
			},
			// 停止下拉刷新
			onPullDownRefresh() {
				this.showTime = setTimeout(() => {
					uni.stopPullDownRefresh();
					this.showTop = true;
				}, 500);
			},
			// 清除定时器
			clearShowTime() {
				clearTimeout(this.showTime);
				this.showTime = null;
				console.log('showTime', this.showTime)
			},
		},
		onHide: function() {
			this.showTime && this.clearShowTime();
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 10rpx;
		padding-bottom: 80px;
	}

	.panel-top {
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.panel-top-input {
		padding: 10px 20px;
		border: 1px solid #ccc;
		border-radius: 12px;
		font-size: 11pt;
		width: 80%;
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
