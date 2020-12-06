<template>
	<view class="answer">
		<view class="title">
			{{item.question}}
		</view>
		<view class="context">
			{{item.answer}}
		</view>
		<view class="footer">
			<text>问题没解决?</text><text>   </text><text @tap="goToFab" class="color">去反馈</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {}
			}
		},
		methods: {
			goToFab() {
				uni.navigateTo({
					url: "./fab",
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
		},
		onLoad(option) {
			var aItem = JSON.parse(decodeURIComponent((option.item)))
			this.item = aItem
			console.log(aItem)
		}
	}
</script>

<style>
	.answer {
		width: 94%;
		margin-left: 3%;
	}

	.title {
		margin-top: 3%;
		font-size: 36rpx;
		font-weight: 700;
	}

	.context {
		margin-top: 3%;
		font-size: 30rpx;
	}
	
	.footer{
		margin-top: 3%;
		width: 100%;
		text-align: center;
		font-size: 26rpx;
		color: #AAAAAA;
	}
	
	.footer>.color{
		color: #FF0000;
	}
</style>
