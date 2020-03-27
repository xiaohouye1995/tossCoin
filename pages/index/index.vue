<template>
	<view v-if="bgCoverImg" class="content" :style="{'background-image': `url(http://q74m0xojb.bkt.clouddn.com/img/${bgCoverImg}.jpg)`}">
		<view class="coin" :class="{'coin-spin':isStatusText === '薛定谔的硬币','coin-facade': isStatusText === '正面','coin-reverse': isStatusText === '反面'}">
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
			<view class="coin-record-text">抛掷总次数：{{record.totalCount}}</view>
			<view class="coin-record-text">正面次数：{{record.facadeCount}}, 占比：{{record.facadeProportion}}</view>
			<view class="coin-record-text">反面次数：{{record.reverseCount}}, 占比：{{record.reverseProportion}}</view>
		</view>
		<view class="footer">
			<button class="footer-btn" type="primary" style="background: #fd746c;" @tap="tossCoin()">抛硬币</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coinImgFront: '',
				coinImgBack: '',
				isStatusText: '薛定谔的硬币',
				bgCoverImg: '',
				record: {}
			}
		},
		onLoad() {
			uni.showModal({
				title: '',
				content: '抛硬币，并不是因为硬币能帮你决定什么，而是因为在硬币抛出的那一刻，答案便会出现在你心里。',
				showCancel: false,
				confirmText: '开始',
				confirmColor: '#fd746c',
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		onShow() {
			this.getBgImg();
			this.getCoinImg();
			this.getCoinRecord();
			this.getAudio();
			this.isStatusText = '薛定谔的硬币';
		},
		methods: {
			// 获取背景图
			getBgImg () {
				this.bgCoverImg = uni.getStorageSync('bgCoverImg') || 'bg_4';
			},
			// 获取硬币图片
			getCoinImg() {
				let name = uni.getStorageSync('coinName') || '2020shu'
				this.coinImgFront = `http://q74m0xojb.bkt.clouddn.com/img/${name}_front.png`
				this.coinImgBack = `http://q74m0xojb.bkt.clouddn.com/img/${name}_back.png`
				// this.coinImgFront = `/static/img/${name}_front.png`
				// this.coinImgBack = `/static/img/${name}_back.png`
			},
			// 获取硬币旋转音频
			getAudio() {
				let name = uni.getStorageSync('coinAuidoID') || 'filpCoin1';
				// this.audioSrc = `http://q74m0xojb.bkt.clouddn.com/mp3/${name}.wav`;
				// this.audioSrc = `/static/audio/${name}.wav`;
				this.audioSrc = `/static/audio/${name}.mp3`;
			},
			// 获取硬币记录
			getCoinRecord() {
				let totalCount = uni.getStorageSync('recordTotalCount') || 0;
				let facadeCount = uni.getStorageSync('recordFacadeCount') || 0;
				let reverseCount = uni.getStorageSync('recordReverseCount') || 0;
				let facadeProportion = totalCount <= 0 ? "0%" : (Math.round(facadeCount / totalCount * 10000) / 100.00) + "%";
				let reverseProportion = totalCount <= 0 ? "0%" : (Math.round(reverseCount / totalCount * 10000) / 100.00) + "%";
				// 彩蛋1号
				if (totalCount === 520) {
					let textList = [
						'闲时与你立黄昏，灶前笑问粥可温',
						'江湖走马，风也好，雨也罢',
						'情不知所起一往而深',
						'江湖风波险恶，多多保重',
						'早知如此绊人心，何如当初莫相识',
						'最好的都是即将发生的'
					]
					uni.showModal({
						title: '',
						content: '闲时与你立黄昏，灶前笑问粥可温',
						showCancel: false,
						confirmText: '喜欢你',
						confirmColor: '#fd746c',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '/pages/easteregg/easteregg'
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}

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
			},
			// 加载音频
			loadAudio() {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = this.audioSrc;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
					this.filpCoin();
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
					this.filpCoin();
				});
			},
			// 翻转硬币
			filpCoin() {
				this.isStatusText = '量子';
				this.timer = setTimeout(() => {
					let flipResult = Math.random();
					this.record.totalCount += 1
					uni.setStorageSync('recordTotalCount', this.record.totalCount);
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
			// 清除定时器
			clearTimer() {
				clearTimeout(this.timer);
				this.timer = null;
			}
		},
		onUnload: function() {
			this.timer && this.clearTimer();
		},
	}
</script>

<style lang="scss">
	page {
		// background-color: #E8D0BB;
		// background-image: url('http://q74m0xojb.bkt.clouddn.com/img/bg_4.jpg');
		height: 100%;
	}
	.content {
		width: 100%;
		height: 100%;
		padding-top: 100rpx;
		box-sizing: border-box;
		background-color: #E8D0BB;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	// .model-ad {
	// 	font-size: 14pt;
	// 	border-radius: 6px;
	// 	background: linear-gradient(to left top, #FFB95E, #F35C70);
	// 	color: #fff;
	// 	padding: 40rpx 60rpx;
	// 	z-index: 99999;
	// }

	// .model-del {
	// 	margin: 30rpx auto;
	// 	width: 60rpx;
	// 	height: 60rpx;
	// 	text-align: center;
	// 	// margin-top: 30rpx;
	// 	border: 1px solid #FFECEC;
	// 	border-radius: 50%;
	// }

	$coin-diameter: 400rpx; // 直径
	$coin-thickness: 16px; // 厚度
	$turn-time: 1s; // 转动时间

	/* 3d旋转 */
	.coin {
		position: relative;
		width: $coin-diameter;
		height: $coin-diameter;
		margin: 0 auto;
		transform-style: preserve-3d;
	}

	.coin-spin {
		animation: flipSpin 6s linear infinite;
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
			animation: shine linear 3s infinite;
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
		font-size: 18pt;
		margin-top: 100rpx;
		margin-bottom: 40rpx;
	}

	.coin-record {
		text-align: center;
		color: #FFFFFF;
		margin-bottom: 60rpx;
	}

	.coin-record-text {
		margin-bottom: 10rpx;
	}


	@keyframes flipSpin {
		0% {
			transform: perspective(1000px) rotateY(0deg);
		}

		100% {
			transform: perspective(1000px) rotateY(360deg);
		}
	}

	@keyframes flipFacade {
		from {
			transform: perspective(1000px) rotateY(0);
		}

		to {
			transform: perspective(1000px) rotateY(1800deg);
		}
	}

	@keyframes flipReverse {
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
