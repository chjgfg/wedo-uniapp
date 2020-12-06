<template>
	<view class="setting">
		<view class="heard">
			<view class="heard-ch1">

				<view class="cache">
					<view class="cache-ch1">清除缓存</view>
					<view class="cache-ch2">
						<view class="cache-ch2-ch1">{{big}}MB</view>
					</view>
				</view>

				<view class="download">
					<view class="download-ch1">WiFi环境下自动下载</view>
					<view class="download-ch2">
						<view class="">
							<image :src="num1 === 0 ? '../../../static/up-down/up-down1.png' : '../../../static/up-down/up-down2.png' " mode=""
							 @tap="change"></image>
						</view>
					</view>
				</view>

				<view class="network" @tap="getNetwork">
					<view class="network-ch1">
						网络诊断
					</view>
					<view class="network-ch2">
						<view class="">
							<image src="" mode="" class="cuIcon-right"></image>
						</view>
					</view>
				</view>

				<view class="common" @tap="getCommon">
					<view class="common-ch1">
						隐私政策
					</view>
					<view class="common-ch2">
						<view class="">
							<image class="cuIcon-right" mode=""></image>
						</view>
					</view>
				</view>
			</view>

			<view class="heard-ch2" @tap="getAbout">
				<view class="about">
					<view class="about-ch1">
						关于唯读
					</view>
					<view class="about-ch2">
						<view class="">
							<image class="cuIcon-right" mode=""></image>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num1: 0,
				big: 0
			}
		},
		methods: {
			change() {
				if (this.num1 == 0) {
					this.num1 = 1
				} else {
					this.num1 = 0
				}
			},
			getNetwork() {
				uni.onNetworkStatusChange(function(res) {
					console.log('网络状态')
					console.log(res)
					var nt = res.networkType;
					if (nt == 'unknown' || nt == 'none') {
						uni.showToast({
							title: '网络异常',
							icon: "none"
						});
					} else {
						uni.showToast({
							title: `当前使用:${nt}网络`,
							icon: "none"
						});
					}
				});
				uni.getNetworkType({
					success: function(res) {
						console.log(res.networkType);
						uni.showToast({
							title: `当前使用:${res.networkType}网络`,
							icon: "none"
						});
					}
				});
			},
			getCommon() {
				uni.navigateTo({
					url:"./private",
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			getAbout(){
				uni.navigateTo({
					url:"./about",
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			}
		},
		onLoad() {
			var ss = String(Math.random() * 1000)
			var aa = ss.substring(0, 6)
			this.big = aa
			console.log()
		}

	}
</script>

<style>
	.setting {
		background-color: #AAAAAA;
	}

	.heard {
		background-color: #f1f1f1;
		/*  */
		padding-top: 2%;
	}

	.heard-ch1,
	.heard-ch2 {
		width: 94%;
		margin-left: 3%;
		background-color: #fffff;
	}

	.cache-ch2-ch1 {
		width: 95%;
		text-align: right;
	}

	.cache,
	.download,
	.network,
	.common,
	.about {
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1rpx solid #DFDFDF;
	}

	.cache>*,
	.download>*,
	.network>*,
	.common>*,
	.about>* {
		vertical-align: middle;
		display: inline-flex;
		width: 50%;
	}

	.download>view:nth-child(2)>view,
	.network>view:nth-child(2)>view,
	.common>view:nth-child(2)>view,
	.about>view:nth-child(2)>view {
		width: 95%;
		text-align: right;
	}

	.download>view>view>image:nth-child(1),
	.network>view>view>image:nth-child(1),
	.common>view>view>image:nth-child(1),
	.about>view>view>image:nth-child(1) {
		width: 80rpx;
		height: 50rpx;
	}

	.download>view>view>image:nth-child(1) {
		margin-top: 10%;
	}

	.network>view>view>image:nth-child(1),
	.common>view>view>image:nth-child(1),
	.about>view>view>image:nth-child(1) {
		padding-top: 3%;
		height: 100rpx;
	}

	.heard-ch2 {
		margin-top: 2%;
	}
</style>
