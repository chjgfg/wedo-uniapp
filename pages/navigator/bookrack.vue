<template>
	<view class="index">
		<view id="heard">
			<view class="heards">
				<view class="container">
					<!--弹性布局  -->
					<view class="green text time">
						本周已读<view>0</view>分钟
					</view>
					<view class="red text2">
						<view class="r1 red cuIcon-calendar" @tap="rili"></view>
						<view class="r1 blue cuIcon-search" @tap="fangdajing"></view>
						<view class="r1 green cuIcon-add" @tap="jiahao"></view>
					</view>
				</view>
			</view>
		</view>

		<view id="body">
			<view :class="number === 0 ? 'block':'none'" class="login">
				<view>客官,还没图书的呢!</view>
			</view>
			<view :class="number === 1  ? 'block':'none'">
				<view v-for="(item,i) in books" class="photo" @tap="image(item.bId)">
					<image :src="item.book.image" alt="" class="image-child" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		UserStar
	} from "../../api/index.js"
	export default {
		data() {
			return {
				books: [],
				number: 0,
			}
		},
		methods: {
			rili() {
				uni.showToast({
					title: `客官,该功能还没做好呢。`,
					icon: "none"
				});
			},

			fangdajing() {
				uni.navigateTo({
					url: "../search/search",
					animationType: 'slide-in-right',
					animationDuration: 200,
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			jiahao() {
				uni.showToast({
					title: `客官,该功能还没做好呢。`,
					icon: "none"
				});
			},
			image(item) {
				uni.navigateTo({
					url: "../book/detailbook?name=" + item,
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
				// console.log(item)
			},
			async initUserBook() {

				try {
					this.books = []
					const value = uni.getStorageSync('WD_TOKEN').WD_TOKEN;
					console.log(value)
					if (value === undefined || value === "") {
						this.number = 0
						return
					}
					const userStar = await UserStar({
						token: value,
						bid: "",
						page: 1,
						rows: 10000
					});
					// console.log(userStar)
					if (userStar.status == 500) {
						return
					}
					if (userStar !== null) { //判断token是否为空
						console.log(userStar)
						var arr = userStar.items
						arr.forEach((item, index) => {
							this.books.push(item)
						})
						this.number = 1
					} else { //是空
						console.log("未登录");
					}
					this.number = 1
					console.log(this.number)
				} catch (e) {
					console.log(e)
				}
			}
		},

		async onShow() {
			console.log(this.number)
			this.initUserBook()
		},

	}
</script>

<style>
	/* @import url("../../static/css/iconfont.css"); */

	.block {
		display: block;
	}

	.none {
		display: none;
	}

	.index {
		position: relative;
	}

	.heard {
		position: absolute;

	}

	.heards {
		border-top: 1rpx solid #F2F6FC;
		position: fixed;
		/* 浮动 */
		width: 100%;
		z-index: 100;
	}

	.container {
		display: flex;
		/* 两个子view都是弹性布局 */
		flex-direction: row;
		/* 按行排列 */
		z-index: 100;
	}

	.time {
		padding-left: 3%;
	}

	.green {
		background-color: #F2F6FC;
		line-height: 50rpx;
	}

	.green>view {
		display: inline-block;
		font-size: 36rpx;
		text-align: center;
	}

	.red {
		background-color: #F2F6FC;
	}

	.blue {
		background-color: #F2F6FC;
	}

	.text,
	.text2 {
		width: 70%;
		/* 指定宽 */
		height: 50rpx;
	}

	.text2 {
		width: 30%;
		display: flex;
		/* 三个都是弹性布局 */
	}

	.r1 {
		width: 33.3%;
		/* height: 25%; */
		/* border: 1rpx solid #333333; */
		text-align: center;
		line-height: 50rpx;
		font-size: 36rpx;
	}


	#body {}

	#body>view {
		padding-top: 10%;
	}

	.photo {
		width: 33%;
		display: inline-block;
		margin-left: 0.3%;
		margin-bottom: 5%;
	}

	.image-child {
		background-image: url(../../static/bookimages/150.jpg);
		width: 202rpx;
		height: 300rpx;
		/* 	width: 80%;
		height: 150%; */
		border-radius: 0.3em;
		/* margin-top: -15%; */
		padding-top: -10%;
		margin-left: 10%;
	}
	
	.login {
		font-size: 86rpx;
		text-shadow: 5px 5px 5px black, 0px 0px 2px black;
		color: white;
	}
</style>
