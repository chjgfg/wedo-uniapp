<template>
	<view class="updatepwd">
		<view class="heard">
			<view class="heard-ch1">
				<view class="heard-ch1-ch1">
					<text class="pwd-f1">密&emsp;&emsp;码</text><input :type="type1 ===0?'password':'text'" class="pwd1" @input="values1"
					 placeholder="请输入密码" />
					<image class="image-size1" :src="image1 === 0? '../../../static/img/mine/3/yanjing2.png' : '../../../static/img/mine/3/yanjing1.png'"
					 @click="change1" />
				</view>
				<view class="heard-ch1-ch2">
					<text class="pwd-f2">确认密码</text><input :type="type2 === 0 ? 'password':'text'" class="pwd2" @input="values2"
					 placeholder="请确认密码" />
					<image class="image-size2" :src="image2 === 0? '../../../static/img/mine/3/yanjing2.png' : '../../../static/img/mine/3/yanjing1.png'"
					 @click="change2" />
				</view>
				<view class="heard-ch1-ch3">
					<text>密码长度8-32位,须包含数字.字母.符号至少两种或以上元素</text>
				</view>
				<view class="heard-ch1-ch4">
					<button type="primary" class="size" size="default" @tap="getValue">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {UpdatePassword} from "../../../api/index.js"
	export default {
		data() {
			return {
				image1: 0,
				type1: 0,
				value1: "",
				image2: 0,
				type2: 0,
				value2: "",
			}
		},
		methods: {
			change1() {
				if (this.image1 === 0) {
					this.image1 = 1
					this.type1 = 1
				} else {
					this.image1 = 0
					this.type1 = 0
				}
			},
			change2() {
				if (this.image2 === 0) {
					this.image2 = 1
					this.type2 = 1
				} else {
					this.image2 = 0
					this.type2 = 0
				}
			},
			values1(event){
				 this.value1 = event.target.value
			},
			values2(event){
				 this.value2 = event.target.value
			},
			async getValue() {
				console.log(this.value1 + "-------------" + this.value2 )
				if(this.value1 === this.value2){
					const updatePassword  = await UpdatePassword({password:this.value1,token:uni.getStorageSync('WD_TOKEN').WD_TOKEN})
					console.log(updatePassword)
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
				}else{
					uni.showToast({
						title:"客官,两次输入的密码不一样呢",
						icon:"none"
					})
				}
			}
		}
	}
</script>

<style>
	.updatepwd {
		width: 94%;
		margin-left: 3%;
	}

	.heard {
		width: 90%;
		margin-left: 5%;
		padding-top: 20%;
	}

	/* 	.heard-ch1{
		
	} */
	.heard-ch1-ch1,
	.heard-ch1-ch2 {
		height: 90rpx;
		line-height: 80rpx;
		display: flex;
		flex-direction: row;
		border-bottom: 1rpx solid #dddddd;
	}

	.pwd1,
	.pwd2 {
		margin-top: 18rpx;
		margin-left: 3%;
		width: 65%;
	}

	.heard-ch1-ch2 {
		margin-top: 35rpx;
	}

	.image-size1,
	.image-size2 {
		width: 50rpx;
		height: 50rpx;
		margin-left: 5%;
	}

	.heard-ch1-ch3 {
		margin-top: 8%;
		height: 100rpx;
	}

	.size {
		width: 100%;
	}
</style>
