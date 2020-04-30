<template>
	<view class="container">
		<view class="panel">
			<view class="panel-title">
				<text>默认皮肤</text>
			</view>
			<view class="cell">
				<view class="coin-box" :class="{selectActive: bgCoverIndex === index}" v-for="(item, index) in bgCoverlist" :key="index" @tap="selectbgCover(item,index)">
					<image class="bg-img" :src="item.src" mode="aspectFill"></image>
					<view class="bg-text">
						<view>{{item.name}}</view>
						<view class="coin-spec" v-if="item.id === bgCovername">使用中</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer" v-if="bgCoverIndex !== -1">
			<button class="footer-btn" type="primary" style="background: #fd746c;" @tap="setbgCover()">立即使用</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgCoverlist: [],
				bgCovername: '',
				bgCoverIndex: -1
			}
		},
		onLoad() {
			this.getbgCoverList()
			this.getUsebgCover()
		},
		methods: {
			// 获取硬币列表
			getbgCoverList() {
				let list = [{
						name: '烟雨江南',
						src: 'bg_4'
					},
					{
						name: '日系田园',
						src: 'bg_5'
					},
					{
						name: '璀璨星空',
						src: 'bg_12'
					},
					{
						name: '浪漫樱花',
						src: 'bg_14'
					},
					{
						name: '漫步云海',
						src: 'bg_15'
					}
				]
				this.bgCoverlist = []
				for (let item of list) {
					let data = {
						name: item.name,
						id: item.src,
						src: `https://tosscoin-1256354221.file.myqcloud.com/img/${item.src}.jpg`
					}
					this.bgCoverlist.push(data)
				}
			},
			// 获取当前使用背景
			getUsebgCover() {
				this.bgCovername = uni.getStorageSync('bgCoverImg') || 'bg_4'
			},
			// 选中硬币
			selectbgCover(item, index) {
				this.bgCoverIndex = index
				this.bgCoverId = item.id
			},
			// 设置硬币皮肤
			setbgCover() {
				uni.setStorageSync('bgCoverImg', this.bgCoverId);
				uni.showToast({
					title: '设置成功',
					duration: 2000
				});
				this.getUsebgCover()
			}
		}
	}
</script>

<style lang="scss">
	
	$size: 220rpx;
	
	.container {
		padding-bottom: 80px;
	}
	
	.coin-box {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: $size;
		margin-bottom: 30px;
		border-radius: 6px;
		box-shadow: 0 4px 9px 0 rgba(109, 107, 107, 0.5);
	}
	
	.selectActive {
		box-shadow: 0 0 8px #fd746c;
	}
	
	.bg-img {
		width: 100%;
		height: $size * 1.1;
		border-radius: 6px 6px 0 0;
		margin-bottom: 12rpx;
	}
	
	.bg-text {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 60px;
		text-align: center;
		background: #fff;
		border-radius:  0 0 6px 6px;
	}

	.coin-spec {
		color: #ccc;
		font-size: 13pt;
	}
</style>
