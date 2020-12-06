<template>
	<view class="detailmine">
		<view class="detailmine-heard">
			<view class="heard">

				<view class="first big">
					<view class="big-first-ch">
						头像
					</view>
					<view class="first-ch2 first-ch" @tap="jump">
						<view class="f-first">
							<image :src="user.uPhoto" mode="" class="headImages "><text class="cuIcon-right"></text>
						</view>
					</view>
				</view>

				<view class="first">
					<view class="first-ch1">
						昵称
					</view>
					<view class="first-ch2" @tap="goToUpdateNName">
						<view class="f-first">
							<text class="f-first-ch1">{{user.nickname}}</text><text class="cuIcon-right"></text>
						</view>
					</view>
				</view>

				<view class="first">
					<view class="first-ch1">
						账号密码
					</view>
					<view class="first-ch2" @tap="goToUUAP">
						<view class="f-first">
							<text class="f-second-ch1">******</text><text class="cuIcon-right"></text>
						</view>
					</view>
				</view>

				<view class="first">
					<view class="first-ch1">
						手机号
					</view>
					<view class="first-ch2" @tap="goToUpdatePhone">
						<view class="f-first">
							<text class="f-third-ch1">{{user.phone}}</text><text class="cuIcon-right"></text><!-- {{user.phone.substring(0,3)+"****"+user.phone.substring(7,11)}} -->
						</view>
					</view>
				</view>

				<view class="first">
					<view class="first-ch1">
						注销账号
					</view>
					<view class="first-ch2" @click="goToLogout">
						<view class="f-first">
							<text class="f-fouth-ch1">注销后无法恢复,请谨慎操作</text><text class="cuIcon-right"></text>
						</view>
					</view>

				</view>
			</view>

			<view class="footer">
				<view class="footer-ch1">
					<view class="sigout" @tap="goToLog()">
						<view :class="(user.username === '请登录' ||user.username === ''||user.username === undefined )? 'block':'none'">
							请登录
						</view>
						<view :class="(user.username !== '请登录' ||user.username !== ''||user.username !== undefined ) ? 'block':'none'">
							退出当前账号
						</view>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		UpdatePicture
	} from "../../../api/index.js"
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
					uPhoto: "",
					username: "",
				},
				info: "",
			}
		},
		methods: {
			goToLog() {
				uni.removeStorageSync("WD_TOKEN")
				uni.redirectTo({
					url: "../log",
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			goToUUAP() {
				uni.navigateTo({
					url: "./updatepwd",
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			goToUpdateNName() {
				uni.navigateTo({
					url: "./updatenameorphone?id=1&nickname=" + this.user.nickname,
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			goToUpdatePhone() {
				uni.navigateTo({
					url: "./updatenameorphone?id=0",
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			jump() {
				const _this = this;
				uni.showActionSheet({
					itemList: ['相册', '拍照'],
					success: (res) => {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if (res.tapIndex == 0) {
							// 用户点击了从图库上传
							console.log("相册")
							uni.chooseImage({
								count: 1,
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album'], //从相册选择
								success: (res) => {
									// 选择图片后, 返回的数据
									console.log("相册")
									console.log(res.tempFilePaths[0])
									this.pushPhotoToService(res.tempFilePaths[0])
								}
							})
						} else {
							console.log("照相")
							uni.chooseImage({
								count: 1,
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['camera'], //从摄像头选择
								success: (res) => {
									console.log(res.tempFilePaths[0])
									this.pushPhotoToService(res.tempFilePaths[0])
								}
							})
						};
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
			},

			async pushPhotoToService(value) { //图片上传到服务器
				console.log(value)
				const uploadTask = uni.uploadFile({
					url: 'http://42.192.137.173:10010/api/upload/image',
					filePath: value,
					name: 'file',
					success: (uploadFileRes) => {
						// console.log(uploadFileRes.data);
						this.updatePhoto(uploadFileRes.data)
					}
				});
			},

			async updatePhoto(photo) { //修改数据库图片
				// console.log(photo)
				try {
					const value = uni.getStorageSync('WD_TOKEN').WD_TOKEN;
					// console.log(value)
					if (value.WD_TOKEN !== null) {
						const updatePicture = await UpdatePicture({
							uPhoto: photo,
							token: value
						})
						if (updatePicture !== null) {
							uni.showToast({
								title: "客官,头像修改成功了呢",
								icon: "none"
							})
							uni.switchTab({
								url: '../../navigator/mine',
								success(res) {
									console.log(res)
								},
								fail(err) {
									console.log(err)
								}
							});
						}
						// console.log(updatePicture)
					}
				} catch (e) {
					console.log(e)
				}
			},


			goToLogout() {
				uni.showToast({
					title: "客官,这个功能还没开放呢",
					icon: "none"
				})
			},
			getUser(option) {
				if (option === null) {
					this.user = ""
				} else {
					const user = JSON.parse(decodeURIComponent(option))
					this.user = user
					console.log(this.user)
				}
			}
		},
		onLoad(option) {
			this.getUser(option.id)
		}

	}
</script>

<style>
	.none {
		display: none;
	}

	.block {
		display: block;
	}


	.detailmine {
		background-color: #f1f1f1;
	}

	.detailmine-heard {
		background-color: #FFFFFF;
		width: 100%;
	}


	.heard {
		background-color: #FFFFFF;
		width: 94%;
		margin-left: 3%;
	}


	.first-ch1-ch {
		height: 120rpx;
		line-height: 120rpx;
		width: 50%;
	}

	.headImages {
		margin-left: 50%;
		width: 80rpx;
		height: 80rpx;
		border-radius: 5em;
		vertical-align: middle;
	}


	.first {
		margin-top: -8%;
		margin-bottom: 10%;
		display: flex;
		flex-direction: row;
		height: 60rpx;
		border-bottom: 1rpx solid #EFEFEF;
		padding-bottom: 10%;
	}

	.first-ch1 {
		width: 45%;
	}

	.first-ch2 {
		width: 50%;
	}

	.first-ch1,
	.first-ch2 {
		line-height: 60rpx;
	}

	.f-first {
		text-align: right;
		color: #999999;
	}

	.f-fouth-ch1 {
		margin-left: -10%;
	}

	.big {
		height: 110rpx;
		line-height: 110rpx;
		margin-top: -1rpx;
	}

	.big-first-ch,
	.first-ch {
		width: 50%;
	}

	.first-ch {
		margin-top: 15rpx;
		margin-left: -5%;
	}


	.footer {
		position: fixed;
		width: 100%;
		bottom: 0;
	}

	.footer-ch1 {
		height: 100rpx;
		background-color: #FFFFFF;
	}

	.sigout {
		width: 60%;
		margin-left: 20%;
		text-align: center;
		line-height: 100rpx;
		color: #E54D42;
	}
</style>
