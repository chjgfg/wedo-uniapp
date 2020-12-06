<script>
	export default {
		/* onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		} */
		onUnload() {
			uni.removeStorage({
				key:"WD_TOKEN",
				success(res) {
					console.log(res)
				},
				fail(err) {
					console.log(err)
				}
			})
		}
	};
</script>

<style>
	@import url("./components/colorui/main.css");
	@import url("./components/colorui/icon.css");

	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */
</style>
