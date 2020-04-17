<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef MP-ALIPAY
			uni.setBackgroundColor({
			    backgroundColor: '#fff',
			});
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./static/css/iconfont.css";
	@import "./static/css/main.css";
</style>
