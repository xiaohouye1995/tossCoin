<template>
	<view @tap.prevent.stop="voidFc">
		<block v-if="type==='custom'">
			<view class="mask" :class="contentshow?'show transition3s':'transition3sdelay'" @tap.prevent.stop="hide"
			 @touchmove.prevent.stop="hide"></view>
			<view class="contentView" :class="contentshow?'show transition3sdelay':'transition3s'" @tap.prevent.stop="voidFc"
			 @touchmove.prevent.stop="voidFc">
				<view class="content" :class="contentshow?'show transition3sdelay':'transition3s'">
					<slot></slot>
				</view>
			</view>
		</block>
		<block v-else-if="type==='swiper'">
			<view class="mask" :class="swiperReady && contentshow?'show transition3s':'transition3sdelay'" @tap.prevent.stop="hide"
			 @touchmove.prevent.stop="hide"></view>
			<view class="contentView" :class="swiperReady && contentshow?'show transition3sdelay':'transition3s'"
			 @tap.prevent.stop="voidFc" @touchmove.prevent.stop="voidFc">
				<swiper 
				:indicator-dots="dataSet.indicator_dots||false" 
				:autoplay="ready&&dataSet.autoplay" 
				:interval="dataSet.interval||3000"
				 :duration="dataSet.duration||1000" 
				 :indicator-color="dataSet.indicator_color||'rgba(0, 0, 0, .3)'"
				 :indicator-active-color="dataSet.indicator_active_color||'#000000'" 
				 :circular="dataSet.circular||false"
				 :previous-margin="dataSet.previous_margin||'0px'" 
				 :next-margin="dataSet.next_margin||'0px'" class="content" 
				 :style="(dataSet.swiperStyle||'') + 'height:' + (dataSet.swiperHeight?dataSet.swiperHeight*sys.screenHeight:swiperHeight) + 'px;width:' + (swiperWidth*sys.screenWidth) + 'px;'"
				 :class="contentshow&&swiperReady?'show transition3sdelay':'transition3s'" 
				 @change="twoDimensionSwiperChange">
					<swiper-item v-for="(item, index) in imageArray" :key="index" :class="dataSet.swiper_item_center?'flex_row_c_c':''">
						<image :src="item" mode="widthFix" class="width100" @tap.prevent.stop="tapImg(index)" :style="dataSet.imageStyle||''"></image>
					</swiper-item>
				</swiper>
			</view>
		</block>
		<block v-else-if="type==='twoDimensionSwiper'">
			<view class="mask" :class="swiperReady && contentshow?'show transition3s':'transition3sdelay'" @tap.prevent.stop="hide"
			 @touchmove.prevent.stop="hide"></view>
			<view class="contentView" :class="swiperReady && contentshow?'show transition3sdelay':'transition3s'"
			 @tap.prevent.stop="voidFc" @touchmove.prevent.stop="voidFc">
				<swiper v-if="swiperShow" 
				:indicator-dots="dataSet.indicator_dots||false" :autoplay="ready&&dataSet.autoplay"
				 :interval="dataSet.interval||3000" :duration="dataSet.duration||1000" 
				 :indicator-color="dataSet.indicator_color||'rgba(0, 0, 0, .3)'"
				 :indicator-active-color="dataSet.indicator_active_color||'#000000'" 
				 :previous-margin="dataSet.previous_margin||'0px'"
				 :next-margin="dataSet.next_margin||'0px'" 
				 class="content" 
				 :style="(dataSet.swiperStyle||'') + 'height:' + (dataSet.swiperHeight?dataSet.swiperHeight*sys.screenHeight:swiperHeight)+ 'px;width:' + (swiperWidth*sys.screenWidth) + 'px;'"
				 :class="contentshow&&swiperReady?'show transition3sdelay':'transition3s'" 
				 @change="twoDimensionSwiperChange">
					<swiper-item v-for="(item, index) in imageArray[current]" :key="index" :class="dataSet.swiper_item_center?'flex_row_c_c':''">
						<image :src="item" mode="widthFix" class="width100" @tap.prevent.stop="tapImg(index)" :style="dataSet.imageStyle||''"></image>
					</swiper-item>
				</swiper>
			</view>
		</block>
		<block v-else-if="type==='image'||!type">
			<view class="mask" :class="loadedArr[current] && contentshow?'show transition3s':'transition3sdelay'"
			 @tap.prevent.stop="hide" @touchmove.prevent.stop="hide"></view>
			<view class="contentView" :class="loadedArr[current] && contentshow?'show transition3sdelay':'transition3s'"
			 @tap.prevent.stop="voidFc" @touchmove.prevent.stop="voidFc">
				<image :src="errPlaceholder||(imageArray?imageArray[current]:'')" mode="widthFix" class="content" :class="contentshow?'show transition3sdelay':'transition3s'"
				 :style="dataSet.imageStyle||''" @load="imageLoad(current)" @error="imageErr(current)" @tap.prevent.stop="tapImg"></image>
			</view>
		</block>
		<view class="closeTip" v-if="closeTipShow">
			{{closeContent}}
		</view>
	</view>
</template>

<script>
	const sys = uni.getSystemInfoSync();

	function check(bl, type, cb, parent, tryNotShow) {
		// console.log('进入check方法');
		switch (parent.type) {
			case 'custom' || 'swiper':
				if (cb && typeof(cb) == 'function') cb();
				showOrHideTabBar(bl, type, parent);
				break;
			default:
				if (tryNotShow) {
					// console.log('tryNotShow')
					if (parent.current >= (parent.imageArray.length - 1)) {
						// console.log('Show and current = 0')
						if (cb && typeof(cb) == 'function') cb();
						showOrHideTabBar(bl, type, parent);
						setTimeout(() => {
							parent.current = 0;
						}, 700)
						if (parent.type === 'twoDimensionSwiper') {
							parent.swiperShow = false;
							setTimeout(() => {
								parent.swiperShow = true;
							}, 300);
						}
					} else {
						// console.log('NotShow and go on')
						parent.contentshow = false;
						parent.swiperShow = false;
						setTimeout(() => {
							parent.swiperShow = true;
						}, 300);
						setTimeout(() => {
							parent.current = parent.current + 1;
							parent.contentshow = true;
						}, 600)
					}
				} else {
					// console.log('!tryNotShow')
					if (cb && typeof(cb) == 'function') cb();
					showOrHideTabBar(bl, type, parent);
				}
				break;
		}
	}

	function showOrHideTabBar(bl, type, parent) {
		// console.log('bl:' + bl + ',type:' + type + ',onThePage:' + parent.onThePage);
		if (bl) {
			parent.wellDo = type;
			if (parent.onThePage) {
				switch (type) {
					case 'hide':
						hideTB();
						break;
					case 'show':
						showTB();
						break;
				}
				parent.wellDoStatus = true;
			} else {
				parent.wellDoStatus = false;
			}
		}
	}

	function hideTB() {
		uni.hideTabBar({
			animation: true
		})
	}

	function showTB() {
		uni.showTabBar({
			animation: true
		})
	}

	function getImageInfo(url, cb, fcb) {
		uni.getImageInfo({
			src: url,
			success(res) {
				if (cb && typeof(cb) == 'function') cb(res);
			},
			fail(err) {
				if (fcb && typeof(fcb) == 'function') fcb(err);
			}
		})
	}
	export default {
		props: {
			type: {
				type: String,
				default: ''
			},
			imageArray: {
				type: Array,
				default () {
					return []
				}
			},
			hideTabBar: {
				type: Boolean,
				default: false
			},
			errLoop: {
				type: Boolean,
				default: true
			},
			dataSet: {
				type: Object,
				default () {
					return {};
				}
			},
			everyTimeCountSwiperHeight: {
				type: Boolean,
				default: false
			},
			closeTipShow: {
				type: Boolean,
				default: true
			},
			closeContent: {
				type: String,
				default: '点击空白区域关闭'
			}
		},
		watch: {
			current(n, o) {
				if (this.type == 'twoDimensionSwiper') {
					if (this.imageArray[n] && this.imageArray[n][0]) {
						const imgPath = this.imageArray[n][0];
						getImageInfo(imgPath, res => {
							this.swiperHeight = (res.height / res.width) * (this.swiperWidth * sys.screenWidth);
						})
					}
				}
			},
			imageArray(n, o) {
				if (n) this.loadedArr = [];
				this.init();
			}
		},
		onHide() {
			this.onThePage = false;
			if (this.wellDo === 'hide' && this.wellDoStatus) {
				showTB();
			}
		},
		onShow() {
			this.onThePage = true;
			if (this.ready && !this.wellDoStatus) {
				switch (this.wellDo) {
					case 'hide':
						hideTB();
						break;
					case 'show':
						showTB();
						break;
				}
				this.wellDoStatus = true;
			}
		},
		data() {
			let swiperWidth = this.dataSet.swiperWidth||.6;
			return {
				contentshow: false,
				current: 0,
				loadedArr: [],
				ready: false,
				onThePage: true,
				wellDo: '',
				wellDoStatus: true,
				errPlaceholder: '',

				sys,
				swiperHeight: 0,
				swiperWidth,
				swiperReady: false,
				swiperShow: true
			};
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				if (this.imageArray === undefined || !this.imageArray || this.imageArray.length === 0) return;
				let imgPath;
				switch (this.type) {
					case 'swiper':
						imgPath = this.imageArray[0];
						getImageInfo(imgPath, res => {
							this.swiperHeight = (res.height / res.width) * (this.swiperWidth * sys.screenWidth);
							check(this.hideTabBarAndcustomOrcontentLoaded(), 'hide', () => {
								this.swiperReady = true;
							}, this);
						})
						break;
					case 'twoDimensionSwiper':
						imgPath = this.imageArray[0][0];
						getImageInfo(imgPath, res => {
							this.swiperHeight = (res.height / res.width) * (this.swiperWidth * sys.screenWidth);
							check(this.hideTabBarAndcustomOrcontentLoaded(), 'hide', () => {
								this.swiperReady = true;
							}, this);
						})
						break;
					default:
						break;
				}
			},
			show() {
				console.log('准备显示maskAndContent，若为image类型，则会在图片加载完成后进行显示');
				if (!this.ready)
					this.ready = true;
				check(this.hideTabBarAndcustomOrcontentLoaded(), 'hide', () => {
					this.contentshow = true;
				}, this);
			},
			hide() {
				check(this.hideTabBarAndcustomOrcontentLoaded(), 'show', () => {
					this.contentshow = false;
				}, this, true);
			},
			imageLoad(current) {
				console.log('maskAndContent第' + current + '张图片加载完成:' + this.imageArray[current]);
				if (!this.loadedArr[current]) {
					this.$set(this.loadedArr, current, true);
					if (this.ready)
						check(this.hideTabBarAndcustomOrcontentLoaded(current), 'hide', () => {
							this.contentLoaded = true;
						}, this);
				}
			},
			imageErr(current) {
				console.log('maskAndContent第' + current + '张图片加载失败:' + this.imageArray[current]);
				if (this.errLoop && !this.errPlaceholder && this.imageArray !== undefined) {
					console.log('errLoop');
					const img = this.imageArray[current];
					this.errPlaceholder = 'errPlaceholder';
					setTimeout(() => {
						this.errPlaceholder = '';
					}, 1000);
				}
			},
			tapImg(index) {
				this.$emit('tapImage', {
					current: this.current,
					index
				});
			},
			hideTabBarAndcustomOrcontentLoaded(current) {
				let bl;
				const ht = this.hideTabBar;
				switch (this.type) {
					case 'custom':
						bl = ht;
						break;
					case 'swiper':
						bl = ht;
						break;
					case 'twoDimensionSwiper':
						bl = ht;
						break;
					default:
						let thecurrent;
						if (current !== undefined)
							thecurrent = current;
						else
							thecurrent = this.current;
						bl = this.loadedArr[thecurrent] && ht;
						break;
				}
				return bl;
			},
			twoDimensionSwiperChange({
				detail: {
					current
				}
			}) {
				if (this.everyTimeCountSwiperHeight) {
					let imgPath;
					switch (this.type) {
						case 'swiper':
							imgPath = this.imageArray[current];
							getImageInfo(imgPath, res => {
								this.swiperHeight = (res.height / res.width) * (this.swiperWidth * sys.screenWidth);
								check(this.hideTabBarAndcustomOrcontentLoaded(), 'hide', () => {
									this.swiperReady = true;
								}, this);
							})
							break;
						case 'twoDimensionSwiper':
							imgPath = this.imageArray[this.current][current];
							getImageInfo(imgPath, res => {
								this.swiperHeight = (res.height / res.width) * (this.swiperWidth * sys.screenWidth);
								check(this.hideTabBarAndcustomOrcontentLoaded(), 'hide', () => {
									this.swiperReady = true;
								}, this);
							})
							break;
					}
				}
			},
			voidFc() {}
		}
	}
</script>

<style scoped>
	.width100 {
		width: 100%;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.mask {
		position: fixed;
		top: 50%;
		left: 50%;
		height: 150vh;
		width: 150vw;
		background-color: rgba(0, 0, 0, .6);
		z-index: 998;
		opacity: 0;
		pointer-events: none;
		transform: translate(-50%, -50%);
	}

	.mask.show {
		opacity: 1;
		pointer-events: auto;
	}

	.transition3s {
		transition: all .6s ease-in-out;
	}

	.transition3sdelay {
		transition: all .6s ease-in-out .45s;
	}

	.contentView {
		position: fixed;
		top: -100%;
		left: 0;
		height: 200vh;
		width: 100vw;
		transform: rotateX(60deg);
		z-index: 999;
		pointer-events: none;
		perspective: 2500upx;
	}

	.contentView.show {
		transform: rotateX(0deg);
	}

	.content {
		position: absolute;
		top: 75%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 60vw;
		opacity: 0;
		pointer-events: none;
		backface-visibility: hidden;
		border-radius: 4px;
		max-height: 95vh;
	}

	.content.show {
		opacity: 1;
		pointer-events: auto;
	}

	image {
		will-change: transform;
	}
	
	.closeTip{
		position: fixed;
		left: 50%;
		bottom: 5%;
		transform: translateX(-50%);
		font-size: 30upx;
		color: white;
		z-index: 1000;
		animation: opacitying 2s infinite ease-in-out;
	}
	@keyframes opacitying{
		from{
			opacity: 0;
		}
		to{
			opacity: 1;
		}
	}
</style>
