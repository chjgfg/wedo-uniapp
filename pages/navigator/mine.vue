<template>
	<view id="mine">

		<view class="title-image">
			<view class="title-image-left">
				<image class="image-size ziyuan" src="../../static/img/mine/0/ziyuan.png" mode="" @tap="goToSet"></image>
				<image class="image-size tixing" src="../../static/img/mine/0/tixing.png" mode="" @tap="goToCard"></image>
			</view>
		</view>

		<view class="heard">
			<view class="heard-ch1">
				<image :src="user.uPhoto" class="user-images" @tap="GoToDetailMine" />
				<view class="user-detils">
					<view class="user-name" @tap="GoToDetailMine">
						{{user.nickname}}
					</view>
					<view class="user-read-time">
						累计读0小时|今日读0小时
						<text class="cuIcon-playfill"></text>
					</view>
					<view class="pround">
						荣誉
						<text class="cuIcon-playfill"></text>
					</view>
				</view>
			</view>
			<view class="heard-vip">
				<view class="heard-vip-ch1" @tap="vip">
					<view class="heard-vip-ch1-ch1" @tap="goToCard">
						<view class="heard-vip-ch1-ch1-ch1">vip会员</view>
						<view class="heard-vip-ch1-ch1-ch2">vip好书免费读</view>
					</view>
					<view class="heard-vip-ch1-ch2">
						<view class="heard-vip-ch1-ch2-ch1">
							<view class="heard-vip-ch1-ch2-ch1-ch1">6元特惠<text class="cuIcon-right"></text></view>
						</view>
					</view>
				</view>
			</view>
			<view class="heard-three">
				<view class="my-book" @tap="goTobookrack">
					<view class="my-book-num">{{number}}</view>
					<view class="my-book-name text">我的书籍</view>
				</view>
				<view class="my-think" @tap="goToCard">
					<view class="my-think-num">0</view>
					<view class="my-think-name text">想法/书评/帖子</view>
				</view>
				<view class="my-booklist" @tap="goToCard">
					<!-- @tap="booklist" -->
					<view class="my-booklist-num">0</view>
					<view class="my-booklist-name text">我的书单</view>
				</view>
			</view>
		</view>

		<view class="body">
			<view class="body-ch1">

				<view class="body-ch1-ch1">
					<view class="body-ch1-ch1-ch1">我的功能</view>
					<view class="body-ch1-ch1-ch2">
						<view class="body-ch1-ch1-ch2-ch " @tap="goToCheck">
							<image class="image-size image-size1" src="../../static/img/mine/1/1-1.png"></image>
							<view>签到|活动</view>
						</view>
						<!-- <view class="body-ch1-ch1-ch2-ch" @tap="goToFree">
							<image class="image-size" src="../../static/img/mine/1/1-2.png"></image>
							<view>今日免费</view>
						</view> -->
						<!-- <view class="body-ch1-ch1-ch2-ch" @tap="goToEvaluate">
							<image class="image-size" src="../../static/img/mine/1/1-3.png"></image>
							<view>评价</view>
						</view> -->
						<view class="body-ch1-ch1-ch2-ch" @tap="goToCard">
							<image class="image-size" src="../../static/img/mine/1/1-4.png"></image>
							<view>卡券</view>
						</view>
						<view class="body-ch1-ch1-ch2-ch" @tap="goToWriter">
							<image class="image-size" src="../../static/img/mine/1/1-5.png"></image>
							<view>我要写书</view>
						</view>
						<view class="body-ch1-ch1-ch2-ch" @tap="goToRecommend">
							<image class="image-size" src="../../static/img/mine/1/1-6.png"></image>
							<view>足迹</view>
						</view>
						<view class="body-ch1-ch1-ch2-ch" @tap="goToWeekly">
							<image class="image-size" src="../../static/img/mine/1/1-7.png"></image>
							<view>待办</view>
						</view>
					</view>
				</view>

				<view class="body-ch1-ch2">
					<view class="body-ch1-ch2-ch1">我的服务</view>
					<view class="body-ch1-ch2-ch2">
						<view class="body-ch1-ch1-ch2-ch" @tap="goToHelp">
							<image class="image-size" src="../../static/img/mine/2/2-1.png" />
							<view>帮助与反馈</view>
						</view>
						<view class="body-ch1-ch1-ch2-ch" @tap="goToCenter">
							<image class="image-size" src="../../static/img/mine/2/2-2.png"></image>
							<view>客服中心</view>
						</view>
						<view class="body-ch1-ch1-ch2-ch" @tap="goToWelfare">
							<image class="image-size" src="../../static/img/mine/2/2-3.png"></image>
							<view>福利</view>
						</view>
						<view class="body-ch1-ch1-ch2-ch" @tap="goToCommend">
							<image class="image-size" src="../../static/img/mine/2/2-4.png"></image>
							<view>发现</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		GetUser,
		UserStar
	} from "../../api/index.js";
	export default {
		data() {
			return {
				user: {
					age: 0,
					created: "",
					email: "",
					id: 0,
					nickname: "",
					password: "",
					phone: "",
					sex: "",
					uPhoto: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1741424648,2803775455&fm=11&gp=0.jpg",
					username: "",
				},
				token: "",
				number: 0,

			}
		},
		methods: {
			goTobookrack() {
				uni.switchTab({
					url: "./bookrack",
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			vip() {
				uni.showToast({
					title: `客官,该功能还没做好呢。`,
					icon: "none"
				});
			},
			putout() {
				uni.showToast({
					title: `客官,只有等级在100级以上才可以评论呢。`,
					icon: "none"
				});
			},
			booklist() {

			},

			goToHelp() {
				uni.navigateTo({
					url: "../mine/help",
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			goToSet() {
				uni.navigateTo({
					url: "../mine/setting/setting",
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			goToCheck() {
				uni.showToast({
					title: `客官,该功能还没做好呢。`,
					icon: "none"
				});
			},
			goToLog() {
				uni.navigateTo({
					url: "../mine/log",
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			GoToDetailMine() {
				const user = encodeURIComponent((JSON.stringify(this.user)))
				/* if(user === null ){
					
				} */
				uni.navigateTo({
					url: "../mine/detailmine/detailmine?id=" + user,
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},

			goToCard() {
				uni.showToast({
					title: `客官,该功能还没做好呢。`,
					icon: "none"
				});
			},
			goToWriter() {
				uni.showToast({
					title: `客官,该功能还没做好呢。`,
					icon: "none"
				});
			},
			goToRecommend() {
				uni.showToast({
					title: `客官,该功能还没做好呢。`,
					icon: "none"
				});
			},
			goToWeekly() {
				uni.showToast({
					title: `客官,该功能还没做好呢。`,
					icon: "none"
				});
			},
			goToCenter() {
				uni.showToast({
					title: `客官,该功能还没做好呢。`,
					icon: "none"
				});
			},
			goToWelfare() {
				uni.showToast({
					title: `客官,该功能还没做好呢。`,
					icon: "none"
				});
			},
			goToCommend() {
				uni.showToast({
					title: `客官,该功能还没做好呢。`,
					icon: "none"
				});
			},
			async updateInit(token) {
				try {
					this.user = []
					if (token !== null) {
						let user = await GetUser({
							token: token
						});
						console.log(user)
						if (user === null) {
							user = {
								age: 0,
								created: "请登录",
								email: "请登录",
								id: 0,
								nickname: "请登录",
								password: "请登录",
								phone: "00000000000",
								sex: "11111111111",
								uPhoto: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1741424648,2803775455&fm=11&gp=0.jpg",
								username: "请登录"
							}
						}
						this.user = user
					}
				} catch (e) {
					console.log(e)
				}
			},
			async initUserBook() {
				this.number = 0 ;
				try {
					const value = uni.getStorageSync('WD_TOKEN').WD_TOKEN;
					const userStar = await UserStar({
						token: value,
						bid: "",
						page: 1,
						rows: 10000
					});
					console.log(userStar.items.length)
					this.number = userStar.items.length
					if (!value) {
						this.number = 0 ;
					}
				} catch (e) {
					console.log(e)
				}
			}
		},

		async onShow() {
			this.user = []
			this.updateInit(this.$store.state.token)
			this.initUserBook()
		},
	}
</script>

<style>
	#mine {
		background-color: #dfdfdf;
	}

	.title-image {
		position: fixed;
		width: 100%;
		z-index: 500;
	}

	.title-image-left {
		flex-direction: row;
		display: flex;
		background-color: #efefef;
		box-shadow: 1rpx 5rpx 10rpx #efefef;
	}

	.ziyuan,
	.tixing {
		margin-top: 1%;
		margin-bottom: 1%;
	}

	.ziyuan {
		top: -3rpx;
		right: -80%;
	}

	.tixing {
		top: -3rpx;
		right: -85%;
	}

	.notice {
		font-size: 50rpx;
		text-align: center;
		line-height: 50rpx;
		margin-left: 90%;
		font-weight: 500;
	}

	.heard {
		padding-top: 5%;
		background-color: #efefef;
	}

	.heard-ch1 {
		margin-top: 3%;
		width: 94%;
		margin-left: 3%;
		display: flex;
	}

	.heard-vip {
		margin-top: 5%;
		width: 94%;
		margin-left: 3%;
		height: 80rpx;
		border-radius: 0.3em;
		background: #eacda3;
		background: -webkit-linear-gradient(to right, #eacda3, #d6ae7b);
		background: linear-gradient(to right, #eacda3, #d6ae7b);
	}

	.heard-vip-ch1 {
		font-size: 23rpx;
		color: #BA8B02;
	}

	.heard-vip-ch1,
	.heard-vip-ch1-ch1 {
		display: flex;
		flex-direction: row;
	}

	.heard-vip-ch1-ch1 {
		line-height: 80rpx;
		width: 70%;
	}

	.heard-vip-ch1-ch1-ch1 {
		margin-left: 5%;
		font-size: 30rpx;
		border-right: 1px solid #BA8B02;
		padding-right: 3%;
		height: 40rpx;
		line-height: 40rpx;
		margin-top: 4%;
	}

	.heard-vip-ch1-ch1-ch2 {
		margin-left: 3%;
	}

	.heard-vip-ch1-ch2 {
		width: 30%;
		/* text-align: center; */
	}

	.heard-vip-ch1-ch2-ch1 {
		width: 90%;
		border-radius: 0.8em;
		-webkit-border-radius: 0.8em;
		margin-top: 20rpx;
		background-color: #fceabb;
		height: 40rpx;
		line-height: 40rpx;
	}

	.heard-vip-ch1-ch2-ch1-ch1 {
		text-align: center;
	}


	.user-name {
		font-size: 33rpx;
		font-weight: 700;
	}

	.user-detils {
		font-size: 26rpx;
		color: #333333;
		margin-left: 8%;
		font-weight: 600;
	}

	.user-read-time,
	.pround {
		margin-top: 5%;
		color: #AAAAAA;
		font-size: 23rpx;
	}


	.user-images {
		background-image: url(../../static/bookimages/0.png);
		width: 100rpx;
		height: 100rpx;
		border-radius: 2em;
	}



	.heard-three {
		display: flex;
		flex-direction: row;
		width: 100%;
		margin-top: 3%;
		padding-bottom: 5%;
	}

	.my-book,
	.my-think,
	.my-booklist {
		text-align: center;
		width: 33.3%;
		border-right: 2rpx solid #dddddd;
		font-size: 36rpx;
		font-weight: 900;
	}

	.text {
		font-size: 15rpx;
		color: #AAAAAA;
	}

	.body {
		background-color: #dfdfdf;
		margin-top: 1.5%;
		height: 900rpx;
	}

	.body-ch1 {
		width: 94%;
		margin-left: 3%;
		padding-top: 1%;
	}

	.body-ch1-ch1,
	.body-ch1-ch2 {
		height: 100%;
		border: 1rpx solid #f5f5f5;
		border-radius: 0.5em;
		background-color: #f0f0f0;
	}

	.body-ch1-ch2 {
		margin-top: 3%;
		height: 100%;
	}

	.body-ch1-ch1-ch1,
	.body-ch1-ch2-ch1 {
		margin-top: 5%;
		margin-left: 3%;
		font-size: 33rpx;
		font-weight: 900;
	}


	.body-ch1-ch1-ch2,
	.body-ch1-ch2-ch2 {
		margin-bottom: 5%;
	}

	.body-ch1-ch1-ch2-ch {
		display: inline-block;
		width: 25%;
		text-align: center;
		margin-top: 5%;

	}

	.image-size {
		width: 40rpx;
		height: 40rpx;
	}

	.image-size1 {
		width: 50rpx;
		height: 50rpx;
	}


	.free,
	.sign,
	.set,
	.help,
	.log {
		font-size: 30rpx;
		height: 60rpx;
	}

	.free,
	.sign,
	.set,
	.help {
		border-bottom: 2rpx solid #AAAAAA;
	}

	.sign,
	.help,
	.set,
	.log {
		margin-top: 2%;
	}

	.free>.right {
		margin-left: 70%;
	}

	.sign>.right {
		margin-left: 68.5%;
	}

	.set>.right {
		margin-left: 78%;
	}

	.help>.right {
		margin-left: 63.5%;
	}
</style>
