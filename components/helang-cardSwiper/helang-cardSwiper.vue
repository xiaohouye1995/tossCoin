<template>
	<view>
		<view class="top-swiper">
			<view class="bg">
				<view class="placeholder"></view>
				<view class="image">
					<image :src="swiperList[listIndex][imageKey]" mode="aspectFill"></image>
				</view>
			</view>
			<view class="box">
				<view style="height: 120px;"></view>
				<swiper class="swiper" :previous-margin="swiperMargin" :next-margin='swiperMargin' :circular="true" @change="swiperChange">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image class='le-img' :src='item[imageKey]' :class="{'le-active':index == listIndex}"></image>
					</swiper-item>
				</swiper>
				<view class="name">
					{{swiperList[listIndex][textKey]}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			swiperList: { // 滑块视图容器数据 
				type: Array,
				default: function() {
					return []
				}
			},
			imageKey: { //  图片映射的键
				type: String,
				default: 'img'
			},
			textKey: { //  文字映射的键
				type: String,
				default: 'name'
			}
		},
		data() {
			return {
				listIndex: 0,
				swiperMargin: "150rpx"
			}
		},
		components: {

		},
		mounted() {

		},
		methods: {
			//swiper滑动事件
			swiperChange: function(e) {
				this.listIndex = e.detail.current;
				this.$emit('swiperChange', this.swiperList[e.detail.current]);
			}
		}
	}
</script>

<style lang="scss">
	.top-swiper {
		margin-bottom: 30rpx;
		.bg {
			padding-top: var(--status-bar-height);
			box-sizing: content-box;
			width: 100%;
			position: relative;

			.placeholder {
				box-sizing: content-box;
				padding-top: 700rpx;
				height: 44px;
			}

			.image {
				box-sizing: content-box;
				position: absolute;
				z-index: 1;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				overflow: hidden;

				&::after {
					content: '';
					position: absolute;
					width: 100%;
					height: 100%;
					z-index: 1;
					bottom: 0;
					left: 0;
					height: 65%;
					background-image: linear-gradient(to bottom, transparent, #FFF);
				}

				>image {
					position: absolute;
					box-sizing: content-box;
					padding: 60px;
					top: 0;
					left: 0;
					width: 100%;
					height: 80%;
					top: -60px;
					left: -60px;
					filter: blur(50px);
				}
			}
		}

		.box {
			padding-top: var(--status-bar-height);
			box-sizing: content-box;
			position: absolute;
			z-index: 5;
			top: 0;
			left: 0;
			width: 100%;
			height: auto;
		}

		.swiper {
			height: 700rpx;
			margin: 0 20rpx;

			.le-img {
				width: 100%;
				height: 100%;
				display: block;
				transform: scale(0.9);
				transition: transform 0.3s ease-in-out 0s;
				border-radius: 4px;

				&.le-active {
					transform: scale(1);
				}
			}

		}
		
		.name {
			font-size: 16pt;
			text-align: center;
			margin-top: 20rpx;
		}
	}
</style>
