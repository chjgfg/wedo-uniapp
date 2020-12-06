<template>
	<view class="about">
		<view class="heard">
			<view class="head">
				<image src="../../../static/favicon.png" class="images" mode=""></image>
				<view class="images-view">
					w1.0.0
				</view>
			</view>
		</view>

		<view class="body">
			<view class="body-ch">
				<view class="body-c">
					<view class="body-ch1" @tap="getUpdate">
						<view class="body-ch1-ch1">检查更新</view>
						<view class="width">
							<image class="body-ch1-ch2 cuIcon-right"></image>
						</view>
					</view>
				</view>
				<view class="body-c">
					<view class="body-ch2" @tap="share">
						<view class="body-ch2-ch1">分享给好友</view>
						<view class="width">
							<image class="body-ch2-ch2 cuIcon-right"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			getUpdate() {
				uni.showToast({
					title: `已更新至最新版本`,
					icon: "none"
				});
			},
			share() {
				uni.showToast({
					title: `客官,该功能还没做好呢。`,
					icon: "none"
				});
			}
		},

	}
</script>

<style>
	.about {
		padding-top: 20%;
	}

	.heard,
	.body-ch {
		width: 100%;
	}

	.head {
		width: 94%;
		margin-left: 3%;
		margin: auto;
	}

	.images {
		width: 350rpx;
		transform: translate(50%, 0%);
		height: 200rpx;
	}

	.images-view {
		text-align: center;
		color: #282828;
	}

	.body {
		margin-top: 10%;
		background-color: #fff;
	}

	.body-c {
		width: 94%;
		margin-left: 3%;
	}

	.body-ch1,
	.body-ch2 {
		display: flex;
		flex-direction: row;
		line-height: 80rpx;
		border-bottom: 1rpx solid #F1F1F1;

	}

	.body-ch1-ch1,
	.body-ch1-ch2,
	.body-ch2-ch1,
	.body-ch2-ch2 {
		width: 50%;
		/* vertical-align: middle; */
	}

	.width {
		text-align: right;
		width: 50%;
	}

	.body-ch1-ch2,
	.body-ch2-ch2 {
		width: 50rpx;
		height: 50rpx;
	}
</style>
