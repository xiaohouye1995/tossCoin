<template>
	<view v-if="bgCoverImg" class="content" :style="{'background-image': `url(https://tosscoin-1256354221.cos.ap-shanghai.myqcloud.com/img/${bgCoverImg}.jpg)`}">
		<view class="coin" :class="{'coin-spin':isStatusText === '薛定谔的硬币','coin-facade': isStatusText === '正面','coin-reverse': isStatusText === '反面'}">
			<view class="coin-front">
				<image class="coin-img" :src="coinImgFront"></image>
			</view>
			<view class="coin-middle" v-for="index in 16" :key="index" :style="'transform: translateZ(' + index + 'px)'">
				<image class="coin-img coin-img-filp" :src="coinImgBack"></image>
			</view>
			<view class="coin-back">
				<image class="coin-img coin-img-filp" :src="coinImgBack"></image>
			</view>
			<view class="coin-shadow"></view>
		</view>
		<view class="coin-record">
			<view class="coin-result">{{record.result}}</view>
			<view class="coin-record-text">抛掷总次数：{{record.totalCount}}</view>
			<view class="coin-record-text">正面次数：{{record.facadeCount}}, 占比：{{record.facadeProportion}}</view>
			<view class="coin-record-text">反面次数：{{record.reverseCount}}, 占比：{{record.reverseProportion}}</view>
		</view>
		<button class="footer-btn" type="primary" style="background: #fd746c;" @tap="tossCoin()">抛硬币</button>
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
			uni.showShareMenu({
			  withShareTicket: true
			})
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
			// #ifndef MP-ALIPAY
			this.getAudio();
			// #endif
			this.record.result = '薛定谔的硬币';
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
				this.coinImgFront = `https://tosscoin-1256354221.cos.ap-shanghai.myqcloud.com/img/${name}_front.png`
				this.coinImgBack = `https://tosscoin-1256354221.cos.ap-shanghai.myqcloud.com/img/${name}_back.png`
				// let name = "love2"
				// this.coinImgFront = `/static/img/${name}_front.png`
				// this.coinImgBack = `/static/img/${name}_back.png`
			},
			// 获取硬币旋转音频
			getAudio() {
				let name = uni.getStorageSync('coinAuidoID') || 'filpCoin1';
				this.audioSrc = name === 'wu' ? null :`/static/audio/${name}.mp3`;
			},
			// 获取硬币记录
			getCoinRecord() {
				let result = this.isStatusText;
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
					result: result,
					totalCount: totalCount,
					facadeCount: facadeCount,
					reverseCount: reverseCount,
					facadeProportion: facadeProportion,
					reverseProportion: reverseProportion
				}
			},
			// 抛硬币
			tossCoin() {
				// #ifdef MP-WEIXIN
				if (this.audioSrc) {
					this.loadAudio()
				} else {
					this.filpCoin();
				}
				// #endif
				// #ifdef MP-ALIPAY
				this.filpCoin();
				// #endif 
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
				this.record.result = '量子力学中...';
				this.isStatusText = '量子';
				this.timerCoinFilp = setTimeout(() => {
					let flipResult = Math.random();
					let totalCount = this.record.totalCount + 1
					uni.setStorageSync('recordTotalCount', totalCount);
					if (flipResult <= 0.5) {
						this.isStatusText = '正面';
						let count = this.record.facadeCount + 1
						uni.setStorageSync('recordFacadeCount', count);
						console.log('这是', this.isStatusText);
					} else {
						this.isStatusText = '反面';
						let count = this.record.reverseCount + 1
						uni.setStorageSync('recordReverseCount', count);
						console.log('这是', this.isStatusText);
					}
					this.timerCoinRecord = setTimeout(() => {
						this.getCoinRecord();
					}, 1000);
				}, 0);
			},
			// 清除定时器 
			clearTimerCoinFilp() {
				clearTimeout(this.timerCoinFilp);
				this.timerCoinFilp = null;
				console.log('timerCoinFilp', this.timerCoinFilp)
			},
			clearTimerCoinRecord() {
				clearTimeout(this.timerCoinRecord);
				this.timerCoinRecord = null;
				console.log('timerCoinRecord', this.timerCoinRecord)
			}
		},
		onHide: function() {
			this.timerCoinFilp && this.clearTimerCoinFilp();
			this.timerCoinRecord && this.clearTimerCoinRecord();
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		background-color: #f8f8f8;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	// $coin-diameter: 400rpx; // 直径
	$coin-diameter: 200px; //直径
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
		transform: translateZ(17px);
	}

	.coin-back {
		transform: translateZ(0);
	}
	.coin-img-filp {
		transform: rotateY(180deg);
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
		margin-top: 80rpx;
		margin-bottom: 20rpx;
		color: #e64340;
	}

	.coin-record {
		text-align: center;
		color: #FFFFFF;
		margin-bottom: 60rpx;
		font-size: 14pt;
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
