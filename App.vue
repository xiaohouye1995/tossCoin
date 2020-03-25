<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./static/css/iconfont.css";
	.red {
		color: #DC143C;
	}
	page {
		font-family: PingFang SC, 'Helvetica Neue', Arial, sans-serif;
		background-color: #f7f8fa;
		color: #353535;
	}
</style>
