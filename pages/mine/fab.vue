<template>
	<view class="fab">
		<view class="heard">
			<view class="textarea">
				<view class="uni-textarea">
					<textarea placeholder-style="font-size:30rpx;" placeholder="请详细描述您的问题,若与书籍相关,就不要反馈了" maxlength="300"
					 @blur="bindTextAreaBlur"></textarea>
				</view>
			</view>
			<view class="phone">
				<view class="uni-form-item uni-column">
					<input class="uni-input" type="number" placeholder="请输入手机号,便于我们联系你" @blur="phone" />
				</view>
			</view>
			<view class="btn">
				<button type="primary" plain="true" @tap="getValue">立即反馈</button>
			</view>
			<view class="ddddddd">
				如问题紧急,请联系客服小哥哥15993596769
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				textarea: "",
				input: ""
			}
		},
		methods: {
			bindTextAreaBlur: function(e) {
				this.textarea = e.detail.value
				console.log(e.detail.value)
			},
			phone: function(e) {
				this.input = e.detail.value
				console.log(e.detail.value)
			},
			getValue() {
				if (this.textarea === "" || this.input === "") {
					uni.showToast({
						title: "客官,你没入的呢!",
						icon:"none"
					})
				} else {
					console.log(this.textarea + " -------- " + this.input)
				}
			}
		}
	}
</script>

<style>
	.fab {
		width: 94%;
		margin-left: 3%;
	}

	.uni-textarea {
		margin-top: 5%;
		border: 1rpx solid #AAAAAA;
		border-radius: 0.3em;
		/* box-shadow: 1rpx 5rpx 10rpx #AAAAAA; */
	}

	textarea {
		width: 98%;
		margin-left: 1%;
	}

	.phone {
		margin-top: 3%;
		margin-bottom: 3%;
	}

	.uni-form-item {
		width: 100%;
		border: 1rpx solid #AAAAAA;
		border-radius: 0.3em;
	}

	.uni-input {
		/* box-shadow: 1rpx 5rpx 10rpx #AAAAAA; */
		margin-left: 1%;
	}

	.btn>button {
		/* box-shadow: 1rpx 5rpx 10rpx #AAAAAA; */
		margin-top: 4%;
	}

	.ddddddd {
		margin-top: 2%;
		text-align: center;
		color: #AAAAAA;
		font-size: 20rpx;
	}
</style>
