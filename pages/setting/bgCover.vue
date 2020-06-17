<template>
	<view class="container">
		<view class="title" :style="{ 'padding-top': bar_Height + 'px' }">
			<view class='goBack' @tap="goBack()">
				<text class="iconfont icon-left"></text>
			</view>
		</view>
		<card-swiper :swiperList="bgCoverlist" imageKey="img" textKey="name" @swiperChange="selectbgCover"></card-swiper>
		<view class="footer">
			<button v-if="bgCovername !== bgCoverId" class="footer-btn" @tap="setbgCover()">立即使用</button>
			<button v-if="bgCovername === bgCoverId" class="footer-btn">使用中</button>
		</view>
	</view>
</template>

<script>
	import cardSwiper from "@/components/helang-cardSwiper/helang-cardSwiper"
	export default {
		components: {
			cardSwiper
		},
		data() {
			return {
				bgCoverlist: [],
				bgCovername: '',
				bgCoverId: '',
				bar_Height: uni.getSystemInfoSync().statusBarHeight
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
						img: 'bg_4'
					},
					{
						name: '日系田园',
						img: 'bg_5'
					},
					{
						name: '璀璨星空',
						img: 'bg_12'
					},
					{
						name: '浪漫樱花',
						img: 'bg_14'
					},
					{
						name: '漫步云海',
						img: 'bg_15'
					}
				]
				this.bgCoverlist = []
				for (let item of list) {
					let data = {
						name: item.name,
						id: item.img,
						img: `https://tosscoin-1256354221.file.myqcloud.com/img/${item.img}.jpg`
					}
					this.bgCoverlist.push(data)
				}
			},
			// 获取当前使用背景
			getUsebgCover() {
				this.bgCovername = uni.getStorageSync('bgCoverImg') || 'bg_4'
			},
			// 选中硬币
			selectbgCover(item) {
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
			},
			goBack () {
				uni.navigateBack({
				    delta: 1
				});
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
		border-radius: 0 0 6px 6px;
	}

	.coin-spec {
		color: #ccc;
		font-size: 13pt;
	}

	.title{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 44px;
		z-index: 10;
		display: flex;
		align-items: center;
	}
	.goBack {
		margin-left: 10rpx;
	}
</style>
