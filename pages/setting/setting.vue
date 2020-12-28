<template>
	<view class="container">
		<view class="panel">
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<text class="iconfont icon-nim" style="color: #fdbd6c;"></text>
				</view>
				<view class="panel-cell-bd" @tap="toCoinSkin()">
					<text>选择硬币</text>
					<text class="iconfont icon-right1"></text>
				</view>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<text class="iconfont icon-audio" style="color: #fd746c;"></text>
				</view>
				<view class="panel-cell-bd" @tap="toCoinAudio()">
					<text>选择音效</text>
					<text class="iconfont icon-right1"></text>
				</view>
			</view>
			<!-- #endif -->
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<text class="iconfont icon-gemfile" style="color: #6cacfd;"></text>
				</view>
				<view class="panel-cell-bd" @tap="toCoinBg()">
					<text>选择背景</text>
					<text class="iconfont icon-right1"></text>
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<text class="iconfont icon-java"></text>
				</view>
				<view class="panel-cell-bd">
					<button open-type='contact' class="btn-feedback">我要吐槽</button>
					<text class="iconfont icon-right1"></text>
				</view>
			</view>
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<text class="iconfont icon-tongqian" style="color: #F49E15;"></text>
				</view>
				<view class="panel-cell-bd" @tap="toMiniProgram('民国')">
					<text>古代银钱换算器</text>
					<text class="iconfont icon-right1"></text>
				</view>
			</view>
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<image class="icon-img" src="https://tosscoin-1256354221.file.myqcloud.com/img/dragon.jpg" mode=""></image>
				</view>
				<view class="panel-cell-bd" @tap="toMiniProgram('贪吃龙')">
					<text>疯狂贪吃龙</text>
					<text class="iconfont icon-right1"></text>
				</view>
			</view>
			<!-- #endif -->
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<text class="iconfont icon-cc-delete" style="color: #e64340;"></text>
				</view>
				<view class="panel-cell-bd" @tap="clearRecord()">
					<text>清空记录</text>
					<text class="iconfont icon-right1"></text>
				</view>
			</view>
		</view>
		<!-- #ifdef MP-TOUTIAO -->
		<ad unit-id="b7bgjafh9gmblcg8b8" bindload="adloadhandler" binderror="aderrorhandler" bindclose="adclosehandler"></ad>
		<!-- #endif -->
	</view>
</template>

<script>
	let interstitialAd = null
	export default {
		data() {
			return {}
		},
		onLoad() {
			// 在页面onLoad回调事件中创建插屏广告实例
			// #ifdef MP-WEIXIN
			if (wx.createInterstitialAd) {
				interstitialAd = wx.createInterstitialAd({
					adUnitId: 'adunit-3d758662f2d260e2'
				})
				interstitialAd.onLoad(() => {})
				interstitialAd.onError((err) => {})
				interstitialAd.onClose(() => {})
			}
			// #endif
		},
		// #ifdef MP-WEIXIN
		onTabItemTap() {
			// 在适合的场景显示插屏广告
			if (interstitialAd) {
				interstitialAd.show().catch((err) => {
					console.error(err)
				})
			}
		},
		// #endif
		methods: {
			// 前往硬币皮肤设置
			toCoinSkin() {
				uni.navigateTo({
					url: '/pages/setting/coinskin'
				});
			},
			// 前往硬币音效设置
			toCoinAudio() {
				uni.navigateTo({
					url: '/pages/setting/coinaudio'
				});
			},
			// 前往背景皮肤设置
			toCoinBg() {
				uni.navigateTo({
					url: '/pages/setting/bgCover'
				});
			},
			toMiniProgram(val) {
				let appId = ''
				let text = ''
				let name = ''
				switch (val) {
					case '民国':
					  appId = 'wx5f8f090664d3b630';
					  text = '民国银元';
					  name = 'minguo1911';
					  break;
					case '贪吃龙':
					  appId = 'wx64765b37d8815453';
					  text = '西方龙';
					  name = 'dragon';
					  break;
				 }
				uni.navigateToMiniProgram({
					appId: appId,
					path: 'pages/index/index',
					extraData: {
						'data1': 'test'
					},
					success(res) {
						// 打开成功
						let unlockList = uni.getStorageSync('unlockList') || [];
						if (unlockList.findIndex(item => item === name) === -1) {
							uni.showModal({
								title: '恭喜您！',
								content: `${text}彩蛋硬币获取成功，请前往硬币中心查看`,
								showCancel: false,
								confirmColor: '#fd746c',
								confirmText: '知道了',
								success: function(res) {
									if (res.confirm) {
										unlockList.push(name);
										uni.setStorageSync('unlockList', unlockList);
									}
								}
							});
						}
					}
				})
			},
			// 清除记录
			clearRecord() {
				uni.showModal({
					title: '',
					content: '清空我的统计记录，重新开始',
					confirmText: '清空',
					cancelText: '不清空',
					confirmColor: '#fd746c',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							// uni.clearStorage();
							uni.setStorageSync('recordTotalCount', 0);
							uni.setStorageSync('recordFacadeCount', 0);
							uni.setStorageSync('recordReverseCount', 0);
							uni.showToast({
								title: '已清空',
								duration: 2000
							});
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
	.btn-feedback {
		margin: 0;
		padding: 0;
		background: none;
		width: 100%;
		text-align: left;
		border: none;
		color: #353535;
		font-size: 14pt;
	}

	.btn-feedback:after {
		border: none;
	}

	.icon-right1 {
		font-size: 17pt;
	}
	.icon-img {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		vertical-align: text-top;
	}
</style>
