<template>
	<view class="container">
		<view class="panel">
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<text class="iconfont icon-nim"></text>
				</view>
				<view class="panel-cell-bd">
					<text>选择硬币</text>
					<text class="iconfont icon-cc-chevron-right"></text>
				</view>
			</view>
			<view class="panel-cell">
				<view class="panel-cell-hd">
					<text class="iconfont icon-audio"></text>
				</view>
				<view class="panel-cell-bd">
					<text>选择音效</text>
					<text class="iconfont icon-cc-chevron-right"></text>
				</view>
			</view>
		</view>
		<view class="panel">
			<view class="panel-cell">
				<view class="panel-cell--center">
					<text>清空记录</text>
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
			this.getCoinImg()
		},
		methods: {
			// 获取硬币图片
			getCoinImg () {
				let name = '2020shu'
				this.coinImgFront = name
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
		color: #333333;
	}
	.iconfont {
		font-size: 24px;
		margin: 0 12px;
	}
	.panel {
		background: #fff;
		margin-bottom: 10px;
	}
	.panel-cell {
		display: flex;
		align-items: center;
		width: 100%;
		height: 120rpx;
	}
	.panel-cell-hd {
		// margin: 0 12px;
	}
	.panel-cell-bd {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f8f8f8;
	}
	.panel-cell--center {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
