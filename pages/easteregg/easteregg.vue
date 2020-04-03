<template>
	<view class="container">
		<view class="talk">
			<text class="talk-text">
				愿贪吃不胖 \n
				愿长生不老 \n
				愿美梦不空 \n
				愿深情不负 \n
				愿你此生纵情豁达
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			let totalCount = uni.getStorageSync('recordTotalCount') + 1;
			let facadeCount = uni.getStorageSync('recordFacadeCount') + 1;
			uni.setStorageSync('recordTotalCount', totalCount);
			uni.setStorageSync('recordFacadeCount', facadeCount);
		},
		methods: {}
	}
</script>

<style lang="scss">
	.container {
		// background-image: url('http://q74m0xojb.bkt.clouddn.com/img/bg_3.jpg');
		background-image: url('https://tosscoin-1256354221.cos.ap-shanghai.myqcloud.com/img/bg_3.jpg');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}
	.talk {
		text-align: center;
		color: #fff;
		font-size: 17pt;
		padding-top: 140rpx;
	}
	.talk-text {
		line-height: 1.3;
	}
</style>
