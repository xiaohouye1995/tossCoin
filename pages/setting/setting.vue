<template>
	<view class="container">
		<view class="panel">
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<text class="iconfont icon-nim" style="color: #fdbd6c;"></text>
				</view>
				<view class="panel-cell-bd" @tap="toCoinSkin()">
					<text>选择硬币</text>
					<text class="iconfont icon-cc-chevron-right"></text>
				</view>
			</view>
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<text class="iconfont icon-audio" style="color: #fd746c;"></text>
				</view>
				<view class="panel-cell-bd" @tap="toCoinAudio()">
					<text>选择音效</text>
					<text class="iconfont icon-cc-chevron-right"></text>
				</view>
			</view>
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<text class="iconfont icon-gemfile" style="color: #6cacfd;"></text>
				</view>
				<view class="panel-cell-bd" @tap="toCoinBg()">
					<text>选择背景</text>
					<text class="iconfont icon-cc-chevron-right"></text>
				</view>
			</view>
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<text class="iconfont icon-java"></text>
				</view>
				<view class="panel-cell-bd">
					<button open-type='feedback' class="btn-feedback">我要吐槽</button>
					<text class="iconfont icon-cc-chevron-right"></text>
				</view>
			</view>
		</view>
		<view class="panel">
			<view class="panel-cell">
				<view class="panel-cell--center" @tap="clearRecord()">
					<text class="panel-cell-text">清空记录</text>
					<text class="iconfont icon-cc-delete red"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
			// 前往硬币皮肤设置
			toCoinSkin () {
				uni.navigateTo({
					url: '/pages/setting/coinskin'
				});
			},
			// 前往硬币音效设置
			toCoinAudio () {
				uni.navigateTo({
					url: '/pages/setting/coinaudio'
				});
			},
			// 前往背景皮肤设置
			toCoinBg () {
				uni.navigateTo({
					url: '/pages/setting/bgCover'
				});
			},
			// 清除记录
			clearRecord () {
				uni.showModal({
				    title: '',
				    content: '是否立即清空记录',
					confirmColor: '#fd746c',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							uni.clearStorage();
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
	}
	.btn-feedback:after {  
	    border: none;	
	}
</style>
