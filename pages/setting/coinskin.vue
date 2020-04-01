<template>
	<view class="container">
		<view class="panel">
			<view class="panel-title">
				<text>十二生肖系列</text>
			</view>
			<view class="cell">
				<view class="coin-box" :class="{selectActive: coinIndex === index}" v-for="(item, index) in coins" :key="index" @tap="selectCoin(item,index)">
					<image class="coin-img" :src="item.src" mode="aspectFit"></image>
					<text>{{item.name}}</text>
					<text class="coin-spec" v-if="item.id === coinName">使用中</text>
				</view>
			</view>
			<view class="footer" v-if="coinIndex !== -1">
				<button class="footer-btn" type="primary" style="background: #fd746c;" @tap="setCoin()">立即使用</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coins: [],
				coinName: '',
				coinIndex: -1
			}
		},
		onLoad() {
			this.getCoinList()
			this.getUseCoin()
		},
		methods: {
			// 获取硬币列表
			getCoinList() {
				let list = [{
						name: '2020鼠',
						src: '2020shu'
					},
					{
						name: '2019猪',
						src: '2019zhu'
					},
					{
						name: '2018狗',
						src: '2018gou'
					},
					{
						name: '2017鸡',
						src: '2017ji'
					},
					{
						name: '2016猴',
						src: '2016hou'
					},
					{
						name: '2015羊',
						src: '2015yang'
					}
				]
				this.coins = []
				for (let item of list) {
					let data = {
						name: item.name,
						id: item.src,
						src: `http://q74m0xojb.bkt.clouddn.com/img/${item.src}_back.png`
					}
					this.coins.push(data)
				}
			},
			// 获取当前使用硬币
			getUseCoin() {
				this.coinName = uni.getStorageSync('coinName') || '2020shu'
			},
			// 选中硬币
			selectCoin(item, index) {
				this.coinIndex = index
				this.coinid = item.id
			},
			// 设置硬币皮肤
			setCoin() {
				uni.setStorageSync('coinName', this.coinid);
				uni.showToast({
					title: '设置成功',
					duration: 2000
				});
				this.getUseCoin()
			}
		}
	}
</script>

<style lang="scss">

	.selectActive {
		border: 1px solid $uni-color-primary;
	}

	.footer {
		position: fixed;
		bottom: 0;
		padding-top: 20rpx;
		padding-bottom: 60rpx;
		background: #fff;
	}

	.cell {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin-bottom: 10px;
	}

	.coin-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 220rpx;
		height: 240rpx;
		margin-bottom: 20rpx;
		background: #fff;
		border-radius: 6px;
	}

	.coin-img {
		width: 120rpx;
		height: 120rpx;
		// width: 80rpx;
		// height: 80rpx;
		margin-bottom: 12rpx;
	}

	.coin-spec {
		color: #ccc;
		font-size: 13pt;
	}
</style>
