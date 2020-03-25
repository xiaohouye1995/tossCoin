<template>
	<view class="content">
		<view class="coin" :class="{'coin-facade': isStatusText === '正面','coin-reverse': isStatusText === '反面'}">
			<view class="coin-front">
				<image class="coin-img" :src="coinImgFront"></image>
			</view>
			<view class="coin-middle" v-for="index in 16" :key="index" :style="'transform: translateZ(' + index + 'px)'">
				<image class="coin-img" :src="coinImgBack"></image>
			</view>
			<view class="coin-back">
				<image class="coin-img" :src="coinImgBack"></image>
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
				coinImgFront: '',
				coinImgBack: '',
				isStatusText: '',
				record: {}
			}
		},
		onLoad() {
			this.getCoinImg()
			this.getCoinRecord()
			this.getAudio()
		},
		methods: {
			// 获取硬币图片
			getCoinImg () {
				let name = '2018gou'
				this.coinImgFront = `http://q74m0xojb.bkt.clouddn.com/img/${name}_front.png`
				this.coinImgBack = `http://q74m0xojb.bkt.clouddn.com/img/${name}_back.png`
				// this.coinImgFront = `/static/img/${name}_front.png`
				// this.coinImgBack = `/static/img/${name}_back.png`
			},
			// 获取硬币旋转音频
			getAudio () {
				let name = 'filpCoin1';
				this.audioSrc = `http://q74m0xojb.bkt.clouddn.com/mp3/${name}.wav`;
				// this.audioSrc = `/static/audio/${name}.wav`;
			},
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
				this.loadAudio()
				this.record.totalCount += 1
				uni.setStorageSync('recordTotalCount', this.record.totalCount);
				this.isStatusText = '';
				let flipResult = Math.random();
				setTimeout(() => {
					if (flipResult <= 0.5) {
						this.isStatusText = '正面';
						this.record.facadeCount += 1;
						uni.setStorageSync('recordFacadeCount', this.record.facadeCount);
						console.log('这是', this.isStatusText);
					} else {
						this.isStatusText = '反面';
						this.record.reverseCount += 1;
						uni.setStorageSync('recordReverseCount', this.record.reverseCount);
						console.log('这是', this.isStatusText);
					}
					this.getCoinRecord();
				}, 0);
			},
			// 加载音频
			loadAudio () {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = this.audioSrc;
				innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
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

	$coin-diameter: 400rpx; // 直径
	$coin-thickness: 16px; // 厚度
	$turn-time: 1s; // 转动时间

	/* 3d旋转 */
	.coin {
		position: relative;
		width: $coin-diameter;
		height: $coin-diameter;
		margin: 100rpx auto;
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
		transform: translateZ(0);
		.coin-img {
			transform: rotateY(180deg);
		}
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
	
	.coin-result {
		font-size: 20px;
		margin-bottom: 40rpx;
	}
	
	.coin-record {
		text-align: center;
		color: #FFFFFF;
		font-size: 18px;
		margin-bottom: 60rpx;
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
</style>
