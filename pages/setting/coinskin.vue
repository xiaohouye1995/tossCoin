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
				<view class="coin-box" :class="{selectActive: coinIndex === 520}" @tap="selectCoin('love',520)">
					<image class="coin-img" src="https://tosscoin-1256354221.cos.ap-shanghai.myqcloud.com/img/love_back.png" mode="aspectFit"></image>
					<text>520</text>
					<text class="coin-spec" v-if="coinName === 'love'">使用中</text>
				</view>
			</view>
		</view>
		<view class="panel">
			<view class="panel-title">
				<text>十二生肖系列</text>
			</view>
			<view class="cell">
				<view class="coin-box" :class="{selectActive: coinIndex === index}" v-for="(item, index) in coins" :key="index"
				 @tap="selectCoin(item.id,index)">
					<image class="coin-img" :src="item.src" mode="aspectFit"></image>
					<text>{{item.name}}</text>
					<text class="coin-spec" v-if="item.id === coinName">使用中</text>
				</view>
			</view>
		</view>
		<view class="footer" v-if="coinIndex !== -1">
			<button class="footer-btn" type="primary" style="background: #fd746c;" @tap="setCoin()">立即使用</button>
		</view>
	</view>
</template>

<script>
	import coinJson from '../../static/json/coin.json'
	export default {
		data() {
			return {
				coins: [],
				coinName: '',
				coinIndex: -1,
				easteregg: false,
				showTop: false
			}
		},
		onLoad() {
			this.getCoinList()
			this.getUseCoin()
			this.getEasteregg()
		},
		methods: {
			// 获取硬币列表
			getCoinList() {
				let list = coinJson.data
				this.coins = []
				for (let item of list) {
					let data = {
						name: item.name,
						id: item.src,
						src: `https://tosscoin-1256354221.cos.ap-shanghai.myqcloud.com/img/${item.src}_back.png`
					}
					this.coins.push(data)
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
			selectCoin(id, index) {
				this.coinIndex = index
				this.coinid = id
			},
			// 设置硬币皮肤
			setCoin() {
				uni.setStorageSync('coinName', this.coinid);
				this.getUseCoin();
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
				this.showTime =  setTimeout(() => {
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
	}

	.selectActive {
		box-shadow: 0 0 8px #fd746c;
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
