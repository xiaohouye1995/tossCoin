<template>
	<view class="container">
		<view class="panel-title">
			<text>旋转音效</text>
		</view>
		<view class="panel-cell" v-for="(item, index) in audios" :key="index">
			<view class="panel-cell-hd">
				<text class="iconfont icon-cc-yes" style="color: #fd746c;" v-if="coinAudio === item.id"></text>
			</view>
			<view class="panel-cell-bd" @tap="selectAudio(item,index)">
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				audios: [],
				coinAudio: ''
			}
		},
		onLoad() {
			this.getList()
			this.getUseAudio()
		},
		methods: {
			// 获取音效列表
			getList() {
				let list = [
					{
						name: '无',
						src: 'wu'
					},
					{
						name: '经典1',
						src: 'filpCoin1'
					},
					{
						name: '经典2',
						src: 'filpCoin2'
					}
				]
				this.audios = []
				for (let item of list) {
					let data = {
						name: item.name,
						id: item.src,
						src: `http://q74m0xojb.bkt.clouddn.com/mp3/${item.src}.wav`
					}
					this.audios.push(data)
				}
			},
			// 获取当前使用音效
			getUseAudio () {
				this.coinAudio = uni.getStorageSync('coinAuidoID') || 'wu'
			},
			// 选中硬币音效
			selectAudio(item, index) {
				uni.setStorageSync('coinAuidoID', item.id);
				uni.showToast({
				    title: '设置成功',
				    duration: 2000
				});
				this.getUseAudio()
				if (item.id) {
					this.loadAudio(item.src)
				}	
			},
			// 加载音频
			loadAudio(src) {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = src;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
			}
		}
	}
</script>

<style lang="scss">
		
	.bgcolor {
		background: #fd746c;
		color: #fff;
	}
	
	.iconfont {
		font-size: 24px;
	}
	
	.panel-title {
		width: 100%;
		padding: 20rpx;
		font-size: 18px;
	}

	.panel-cell {
		display: flex;
		align-items: center;
		width: 100%;
		height: 80rpx;
		background: #fff;
	}
	.panel-cell-hd {
		width: 10%;
		padding: 0 12rpx;
		text-align: center;
	}
	.panel-cell-bd {
		width: 90%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 12px;
		border-bottom: 1px solid #f7f8fa;
	}
</style>