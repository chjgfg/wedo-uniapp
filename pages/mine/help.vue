<template>
	<view class="help">
		<view class="heard">
			全部问题
		</view>
		<view class="body">
			<view class="questions">
				<view v-for="(item,index) in things" :key="index" @tap="goToAnswer(item)" class="questions-ch">
					<view class="question">
						{{item.question}}
					</view>
				</view>
			</view>
			<view class="tofab" @tap="goToFab">
				<view class="">
					立即反馈
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				things: []
			}
		},
		methods: {
			helpThings() {
				var newThings = [{
						question: "不良信息和有害信息举报",
						answer: "网上有害信息举报专区 : https://www.12377.cn/" + "\r\n" + "举报电话 : 010-59845699" + "\r\n" +
							"举报邮箱 : jubao@zhanmgyue.com" + "\r\n" + "青少年有害信息专项举报邮箱 : jubaoqs@zhanmgyue.com"
					},
					{
						question: "用户信息为什么无法修改?",
						answer: "亲爱的书友您好,非常抱歉由于该功能正在升级优化中,暂时无法修改用户昵称,用户头像和个人简介等信息,如有需要请联系客服小哥哥,他会将后端大叔的数据库地址告诉你,你可以直接从数据库修改!"
					},
					{
						question: "如何找回账号",
						answer: "你登录没?没登录谈什么找回账号!"
					},
					{
						question: "扫码功能在哪里",
						answer: "会做早就做了,还用你提醒?"
					},
					{
						question: "为什么我账户里阅饼/代金券不见了",
						answer: "废话,有了才恐怖,本来就是没做的东西怎么可能有啊!有付费的书,你就掏钱啊!没钱就脑补后续啊!"
					},
					{
						question: "已购买的书籍如何下载?",
						answer: "md,后端都没给接口,下nm呢!"
					},
					{
						question: "为什么我批量购买的章节不是我想要的章节",
						answer: "是的,那的确不是你想要的章节,你想要的不是章节,而是剧情里的男/女主,或者剧情里的财富"
					},
					{
						question: "如何取消连续包月",
						answer: "亲爱的书友您好,非常抱歉由于该功能正在升级优化中,暂时无法取消,预计将与于该软件生命周期进入尾声时恢复正常,给您带来不便敬请见谅!"
					},
					{
						question: "买过的书还会收费吗?",
						answer: "肯定啊,后端大叔早就把后门给留好了,就等着你们买了之后暗中扣费呢!不然怎么赚钱啊!"
					},
					{
						question: "VIP的图书加入到书架后等VIP到后期还能看吗?",
						answer: "这是绝对的,肯定不能啊,VIP早就烂大街了,现在就是按字付费的,看多少个字付多少钱好吧!"
					},
					{
						question: "书架上的书籍打开失败",
						answer: "换个网络试试,不行就换个电话卡,再不行就换个地理位置,再不行就换手机!总有一款适合你."
					},
					{
						question: "漫画里怎么发不了弹幕?",
						answer: "哪有漫画啊?帅气的前端记得数据库里没这数据吧!"
					},
					{
						question: "用户信息为什么修改不了?",
						answer: "可能后端大叔没有进库吧!"
					},
					{
						question: "微信/支付宝自动续费问题",
						answer: "这不是自动续费问题.是你没钱的问题!连看书的钱都没有,用我室友的话说:\"你可以去吃*了!\""
					}
				]
				newThings.forEach((item, index) => {
					this.things.push(item)
				})
			},
			goToAnswer(item) {
				uni.navigateTo({
					url: "./answer?item=" + encodeURIComponent(JSON.stringify(item)),
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
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
		created() {
			this.helpThings()
		}
	}
</script>

<style>
	.help {
		width: 94%;
		margin-left: 3%;
	}

	.heard {
		margin-top: 5%;
		margin-bottom: 3%;
		font-size: 36rpx;
		font-weight: 700;
	}

	.questions-ch {
		height: 80rpx;
		width: 98%;
		border-bottom: 1rpx solid #CCCCCC;
	}

	.question {
		font-size: 30rpx;
		line-height: 80rpx;
	}

	.tofab {
		margin-top: 5%;
		height: 80rpx;
	}

	.tofab>view {
		font-size: 36rpx;
		text-align: center;
		color: #0081FF;
	}
</style>
