<template>
	<view class="log">
		<view class="heard">
			<view class="heard-ch1" :class="changenum === 0 ? 'ok' : 'no'">
				<view class="heard-ch1-ch1">
					<input type="number" placeholder="手机号" @input="inputIt" :maxlength='11' />
				</view>
				<view class="heard-ch1-ch2">
					<input type="number" placeholder="验证码" class="input" :maxlength='6' @input="inputIt2" />
					<button  class="text"  type="primary"  @tap="getCode" :disabled="disabled">{{content}}</button ><!--  :class=" num === 0 ? 'none' : 'red'" -->
				</view>
				<view class="btn">
					<view class="btn-ch1">
						<button type="primary" class="btn-ch1-ch1" @tap="ok">登录</button>
					</view>
				</view>
				<view class="msg">
					<view class="msg-ch1" @tap="change">账号密码登录</view>
				</view>
			</view>

			<view class="heard-ch2" :class="changenum === 1 ? 'ok' : 'no'">
				<view class="heard-ch1-ch1">
					<input type="text" placeholder="账号" @input="inputIt" :maxlength='11' />
				</view>
				<view class="heard-ch1-ch2">
					<input type="password" placeholder="密码" class="input password" :maxlength='12' @input="inputIt2" />
				</view>
				<view class="btn">
					<view class="btn-ch1">
						<button type="primary" class="btn-ch1-ch1" @tap="ok">登录</button>
					</view>
				</view>
				<view class="msg">
					<view class="msg-ch1" @tap="change">手机号快捷登录</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import {
		Code,
		Login1,
		Login2,
	} from "../../api/index.js"
	export default {
		data() {
			return {
				// num: 0,
				changenum: 0,
				first: "",
				second: "",
				token: "",
				totalTime: 60,
				content: "获取验证码",
				clock: undefined,
				disabled: false,
			}
		},
		methods: {
			change() {
				if (this.changenum === 0) {
					this.changenum = 1
				} else {
					this.changenum = 0
				}
			},
			inputIt(e) {
				console.log(e.detail.value)
				// this.num = 1;
				this.first = e.detail.value
			},
			inputIt2(e) {
				this.second = e.detail.value
				console.log(e.detail.value)
			},

			async getCode() { //获取验证码
				if (this.first === "") {
					uni.showToast({
						title: `客官,手机号还没输的呢。`,
						icon: "none"
					})
					return
				}
				this.disabled=true
				this.clock = setInterval(() => {//倒计时
					this.totalTime--
					this.content = this.totalTime + 's后重新发送'
					if (this.totalTime === 0) { //当倒计时小于0时清除定时器
						clearInterval(this.clock)
						this.content = '重新发送验证码'
						this.totalTime = 60
						this.disabled=false
					}
				}, 1000)
				console.log(this.first)
				await Code({
					phone: this.first
				})
			},
			async ok() { //登录
				let login = "";
				console.log(this.changenum)
				if (this.first === "" && this.second === "") {
					uni.showToast({
						title: `客官,登录失败,是不是信息错误呢。`,
						icon: "none"
					})
					return
				}
				if (this.changenum === 1) {
					console.log("username----" + this.first + "---" + this.second)
					login = await Login2({
						username: this.first,
						password: this.second,
						type: 1
					})
				} else {
					console.log("phone------" + this.first + "---" + this.second)
					login = await Login1({
						phone: this.first,
						code: this.second,
						type: 2
					})
				}
				if (login === "") {
					uni.showToast({
						title: `客官,登录失败,是不是信息错误呢。`,
						icon: "none"
					})
					return
				}
				console.log(login)
				if (login.status == 500) {
					uni.showToast({
						title: `客官,登录失败,是不是信息错误呢。`,
						icon: "none"
					})
					return
				}
				try {
					uni.setStorageSync('WD_TOKEN', login);
					this.token = login.WD_TOKEN
					this.$store.dispatch("token", this.token) /* actions/*/
					uni.switchTab({
						url: "../navigator/mine",
						success() {
							uni.showToast({
								title: `客官,登录成功,赶紧去看书呢。`,
								icon: "none"
							})
						}
					})
				} catch (e) {
					console.log(e)
				}
			}
		},
		created() {
			console.log(this.$store)
		}
	}
</script>

<style>
	.log {
		width: 94%;
		margin-left: 3%;
	}

	.heard {
		margin-top: 30%;
	}

	.heard-ch1,
	.heard-ch2 {
		width: 80%;
		margin-left: 10%;
	}

	.heard-ch2 {
		display: none;
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
		width: 65%;
		margin-top: 5%;
		line-height: 100rpx;
	}

	.text {
		width: 35%;
		margin-top: 3.5%;
		font-size: 12rpx;
		height: 55rpx;
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

	.red {
		color: #FF0000;
	}

	.msg {
		width: 100%;
	}

	.msg-ch1 {
		font-size: 26rpx;
		color: #0081FF;
		text-align: center;
	}

	.password {
		width: 100%;
	}

	.ok {
		display: block;
	}

	.no {
		display: none;
	}
</style>
