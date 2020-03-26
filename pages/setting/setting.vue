<template>
	<view class="container">
		<view class="panel">
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<text class="iconfont icon-nim" style="color: #FFD700;"></text>
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
</style>
