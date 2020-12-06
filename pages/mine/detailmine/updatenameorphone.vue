<template>
	<view class="update-name-or-phone">
		<view class="heard">

			<view class="heard-ch1">
				<view class="nickname" :class="id ==1 ? 'bloak' : 'none'">
					<view class="nickname-ch1">
						<text class="nickname-ch1-ch1">昵&emsp;&emsp;称:</text><input type="text" class="nickname-ch1-ch2" v-model="nickname"
						 placeholder="输入昵称" />
					</view>
					<view class="nickname-ch2">
						以英文字母或汉字开头,限4-16个字符,一个汉字为2个字符
					</view>
					<view class="nickname-ch3">
						<button type="primary" @tap="updateNickname">修改</button>
					</view>
				</view>
			</view>

			<view class="heard-ch2">
				<view class="phone" :class="id !=1 ? 'bloak' : 'none'">
					<view class="heard-ch1-ch1">
						<input type="number" placeholder="手机号" v-model="phone" :maxlength='11' />
					</view>
					<view class="heard-ch1-ch2">
						<input type="number" placeholder="验证码" class="input" :maxlength='6' v-model="code" />
						<view class="text" :class=" num === 0 ? 'no' : 'red' " @tap="getCode">获取验证码</view>
					</view>
					<view class="btn">
						<view class="btn-ch1">
							<button type="primary" class="btn-ch1-ch1" @tap="ok">修改</button>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		UpdateNickname,
		UpdatePhone,
		Code
	} from "../../../api/index.js"
	export default {
		data() {
			return {
				id: 0,
				nickname: "",
				code: "",
				phone: "",
				num: 0
			}
		},

		methods: {
			async updateNickname() {
				const updateNickname = await UpdateNickname({
					nickname: this.nickname,
					token: uni.getStorageSync("WD_TOKEN").WD_TOKEN
				});
				if (updateNickname.id) {
					uni.showToast({
						title:"客官,修改成功了呢",
						icon:"none"
					})
					uni.switchTab({
						url: "../../navigator/mine",
						success(res) {
							console.log(res)
						},
						fail(err) {
							uni.showToast({
								title:"客官,没登录的呢",
								icon:"none"
							})
							console.log(err)
						}
					})
				}
				// console.log(updateNickname.id)
			},
			async getCode() {
				await Code({
					phone: this.phone
				})
			},
			async ok() {

				const updatePhone = await UpdatePhone({phone: this.phone,code:this.code,token: uni.getStorageSync("WD_TOKEN").WD_TOKEN});
				console.log(updatePhone)
				if (updatePhone.id) {
					uni.showToast({
						title:"客官,修改成功了呢",
						icon:"none"
					})
					uni.switchTab({
						url: "../../navigator/mine",
						success(res) {
							console.log(res)
						},
						fail(err) {
							console.log(err)
						}
					})
				} 
			},
			getInfo(option) {
				this.id = option.id
				this.nickname = option.nickname
				if (this.id === 1) {
					uni.setNavigationBarTitle({
						title: "修改昵称"
					})
				} else if (this.id === "0") {
					// console.log(option.id)
					uni.setNavigationBarTitle({
						title: "修改手机号"
					})
				}
			}
		},
		onLoad(option) {
			console.log(option)
			this.getInfo(option)
		},

	}
</script>

<style>
	
	.heard-ch2{
		width: 94%;
		margin-left: 3%;
	}
	.red {
		color: #FF0000;
	}

	.heard-ch1-ch1 {
		height: 60rpx;
		border-bottom: 1rpx solid #dddddd;
	}

	.heard-ch1-ch2 {
		border-bottom: 1rpx solid #dddddd;
		display: flex;
		flex-direction: row;
		height: 100rpx;
	}

	.input {
		width: 70%;
		margin-top: 5%;
		line-height: 100rpx;
	}

	.text {
		width: 30%;
		margin-top: 5%;
		height: 40rpx;
		/* margin-left: -10%; */
	}

	.btn {
		margin-top: 10%;
		height: 220rpx;
	}

	.btn-ch1 {
		height: 90rpx;
	}

	.btn-ch1-ch1 {
		height: 90rpx;
		border-radius: 0.5em;
	}

	.update-name-or-phone {
		width: 94%;
		margin-left: 3%;
	}

	.heard {
		margin-top: 15%;
	}


	.heard-ch1 {
		width: 94%;
		margin-left: 3%;
	}

	.bloak {
		display: block;
	}

	.none {
		display: none;
	}

	.nickname-ch1,
	.nickname-ch2,
	.nickname-ch3 {
		margin-bottom: 5%;
	}

	.nickname-ch1-ch1,
	.nickname-ch1-ch2,
	.phone-ch1-ch1-ch1,
	.phone-ch1-ch1-ch2 {
		display: inline-block;
		vertical-align: middle;
	}

	.nickname-ch1-ch2,
	.phone-ch1-ch1-ch2 {
		width: 70%;
		margin-left: 5%;
	}

	.phone-ch1-ch1 {
		margin-bottom: 10%;
	}
</style>
