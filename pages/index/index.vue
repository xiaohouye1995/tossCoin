<template>
	<view class="content">
		<view class="coin" :class="{'coin-facade': isStatusText === '正面','coin-reverse': isStatusText === '反面'}">
			<view class="coin-back">
				<image class="coin-img" :src="coinimg2"></image>
			</view>
			<view class="coin-middle" v-for="index in 16" :key="index" :style="'transform: translateZ(' + index + 'px)'">
				<image class="coin-img" :src="coinimg2"></image>
			</view>
			<view class="coin-front">
				<image class="coin-img" :src="coinimg"></image>
			</view>
			<view class="coin-shadow"></view>
		</view>
		<view class="coin-record">
			<view class="coin-result red">{{isStatusText}}</view>
			<view>抛掷总次数：<text>{{record.totalCount}}</text></view>
			<view>正面次数： <text>{{record.facadeCount}}</text>, 占比：<text>{{record.facadeProportion}}</text></view>
			<view>反面次数：<text>{{record.reverseCount}}</text>, 占比：<text>{{record.reverseProportion}}</text></view>
		</view>
		<view class="footer">
			<button class="btn" type="primary" @tap="tossCoin()">抛硬币</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '来抛硬币',
				coinimg: '/static/coin2_front.png',
				coinimg2: '/static/coin2_back.png',
				isStatusText: '',
				record: {}
			}
		},
		onLoad() {
			this.getCoinRecord()	
		},
		methods: {
			// 获取硬币记录
			getCoinRecord () {
				let totalCount =  uni.getStorageSync('recordTotalCount') || 0;
				let facadeCount = uni.getStorageSync('recordFacadeCount') || 0;
				let reverseCount = uni.getStorageSync('recordReverseCount') || 0;
				let facadeProportion = totalCount <= 0 ? "0%" : (Math.round(facadeCount / totalCount * 10000) / 100.00)+"%";
				let reverseProportion = totalCount <= 0 ? "0%" : (Math.round(reverseCount / totalCount * 10000) / 100.00)+"%";
				this.record = {
					totalCount: totalCount,
					facadeCount: facadeCount,
					reverseCount: reverseCount,
					facadeProportion: facadeProportion,
					reverseProportion: reverseProportion
				}
			},
			// 抛硬币
			tossCoin() {
				this.record.totalCount += 1
				uni.setStorageSync('recordTotalCount', this.record.totalCount);
				let flipResult = Math.random();
				this.isStatusText = '';
				let self = this
				setTimeout(function() {
					if (flipResult <= 0.5) {
						self.isStatusText = '正面';
						self.record.facadeCount += 1;
						uni.setStorageSync('recordFacadeCount', self.record.facadeCount);
						console.log('这是', self.isStatusText);
					} else {
						self.isStatusText = '反面';
						self.record.reverseCount += 1;
						uni.setStorageSync('recordReverseCount', self.record.reverseCount);
						console.log('这是', self.isStatusText);
					}
					self.getCoinRecord()
				}, 100);
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #E8D0BB;
	}
	.red{
		color: #DC143C;
	}
	.green {
		color: #1E90FF;
	}

	.footer {
		text-align: center;

		.btn {
			width: 50%;
			background: #fd746c;
			border-color: #fd746c;
		}
	}

	$coin-diameter: 200px; // 直径
	$coin-thickness: 16px; // 厚度
	$turn-time: 6s; // 转动时间

	/* 3d旋转 */
	.coin {
		position: relative;
		width: $coin-diameter;
		height: $coin-diameter;
		margin: 50px auto;
		transform-style: preserve-3d;
	}

	.coin-facade {
		animation: flipFacade $turn-time ease-out forwards;
	}

	.coin-reverse {
		animation: flipReverse $turn-time ease-out forwards;
	}

	.coin-front,
	.coin-back {
		position: absolute;
		width: $coin-diameter;
		height: $coin-diameter;
		border-radius: 50%;
		overflow: hidden;
		mask-image: radial-gradient(white, black); // 解决因 animation 导致 border-radius 失效的问题
		&:after {
			content: "";
			position: absolute;
			left: -$coin-diameter/2;
			bottom: 100%;
			display: block;
			height: $coin-diameter/1.5;
			width: $coin-diameter*2;
			background: #fff;
			opacity: 0.3;
			animation: shine linear $turn-time/2 infinite;
		}
	}

	.coin-front {
		transform: translateZ(16px);
	}

	.coin-back {
		transform: translateZ(0) rotateY(180deg);
	}

	.coin-middle {
		width: $coin-diameter;
		height: $coin-diameter;
		transform: translateZ(1px);
		position: absolute;
	}

	.coin-img {
		width: $coin-diameter;
		height: $coin-diameter;
	}

	.coin-shadow {
		position: absolute;
		width: $coin-diameter;
		height: $coin-thickness;
		border-radius: 50%;
		background: #000;
		box-shadow: 0 0 $coin-thickness*5 $coin-thickness*5 #000;
		opacity: 0.125;
		transform: rotateX(90deg) translateZ(-$coin-diameter*1.1) scale(.5);
	}

	@-webkit-keyframes flipFacade {
		from {
			transform: perspective(1000px) rotateY(0);
		}

		to {
			transform: perspective(1000px) rotateY(1800deg);
		}
	}

	@-webkit-keyframes flipReverse {
		from {
			transform: perspective(1000px) rotateY(0);
		}

		to {
			transform: perspective(1000px) rotateY(1980deg);
		}
	}

	@keyframes shine {

		0%,
		15% {
			transform: translateY($coin-diameter*2) rotate(-40deg);
		}

		50% {
			transform: translateY(-$coin-diameter) rotate(-40deg);
		}
	}

	.coin-record {
		text-align: center;
		color: #FFFFFF;
		font-size: 18px;
		margin-bottom: 30px;
	}
	.coin-result {
		font-size: 20px;
		margin-bottom: 20px;
	}
</style>
