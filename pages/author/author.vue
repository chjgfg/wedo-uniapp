<template>
	<view class="author">
		<!-- 		<view class="heard">
			<cover-image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601527225860&di=8f8fe974ea72e52c9a3f1a927c7924c1&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fcul%2Fpics%2Fhv1%2F170%2F63%2F2206%2F143461385.jpg"
			 class="people-pricture"></cover-image>
		</view> -->
		<view class="body">
			<view class="body-ch1">
				<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601527225860&di=8f8fe974ea72e52c9a3f1a927c7924c1&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fcul%2Fpics%2Fhv1%2F170%2F63%2F2206%2F143461385.jpg"
				 class="people-pricture"></image>
				<text class="body-ch1-ch1">老舍</text>
				<text class="body-ch1-ch2">作者</text>
			</view>
			<view class="body-ch2">
				<text class="body-ch2-ch1">老舍（1899年2月3日—1966年8月24日），男，原名舒庆春，字舍予，另有笔名絜青、鸿来、非我等。因为老舍生于阴历立春，父母为他取名“庆春”，大概含有庆贺春来、前景美好之意。上学后，自己更名为舒舍予，含有“舍弃自我”，亦即“忘我”的意思。北京满族正红旗人。
					[1] 中国现代小说家、作家、语言大师、人民艺术家、北京人艺编剧 [2] ，新中国第一位获得“人民艺术家”称号的作家。代表作有《骆驼祥子》《四世同堂》，剧本《茶馆》。老舍的一生，总是忘我地工作，他是文艺界当之无愧的“劳动模范”。</text>
			</view>
			<view class="body-ch3">
				<view class="body-ch3-ch">
					<text class="body-ch3-ch1">关注<text>0</text></text>
					<text class="body-ch3-ch2">粉丝<text>1万</text></text>
					<text class="body-ch3-ch3">圈子<text>1</text></text>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="footer-ch1">
				<view class="footer-ch1-ch1">
					<text class="footer-ch1-ch1-ch1">Ta的作品</text>
					<text class="footer-ch1-ch1-ch2">累计7692.2万字</text>
					<text class="footer-ch1-ch1-ch3">全部360本<text class="cuIcon-right"></text></text>
				</view>
			</view>
			<view class="footer-ch2">
				<scroll-view scroll-x="true" class="scroll-Y" @scroll="scroll">
					<view id="demo1" class="scroll-view-item" v-for="(item,index) in 3">
						<view class="scroll-view-item-ch">
							<view class="scroll-view-item-ch1">
								<image class="book-detail" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601786958411&di=87db85fd2d81165323d81e8d353fe9ea&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201411%2F22%2F20141122224440_nGj4L.jpeg" />
							</view>
							<view class="scroll-view-item-ch2">
								<view class="book-name">书名书名书名书名书名书名书名书名</view>
								<view class="book-people">12人在读</view>
								<view class="cuIcon-command book-cricule" @tap="goToEvaluate">去书圈讨论</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// scrollTop: 0
			}
		},
		methods: {
			scroll: function(e) {
				console.log(e)
				// this.old.scrollTop = e.detail.scrollTop
			},
			goToEvaluate() {
				uni.navigateTo({
					url: '../evaluate/evaluatelist',
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style>
	.heard {
		width: 100rpx;
		height: 100rpx;
	}

	.people-pricture {
		border-radius: 2em;
		margin-top: 5%;
		margin-bottom: 5%;
		width: 700rpx;
		height: 1000rpx;
	}

	.body {
		width: 90%;
		margin-left: 5%;
		border-bottom: 1rpx solid #AAAAAA;
		padding-bottom: 5%;
	}

	.body-ch1-ch1 {
		font-size: 36rpx;
		font-weight: 900;
	}

	.body-ch1-ch2 {
		font-size: 20rpx;
		color: #FF0000;
		margin-left: 5%;
		border: 2rpx solid #FF0000;
		border-radius: 0.5em;
	}

	.body-ch2 {
		margin-top: 3%;
	}

	.body-ch2-ch1 {
		font-size: 30rpx;
	}

	.body-ch3 {
		height: 50rpx;
		margin-top: 4%;
	}

	.body-ch3-ch {
		width: 50%;
		font-size: 25rpx;
		display: inline-block;
	}

	.body-ch3-ch1,
	.body-ch3-ch2 {
		border-right: 1rpx solid #AAAAAA;
	}

	.body-ch3-ch1,
	.body-ch3-ch2,
	.body-ch3-ch3 {
		text-align: center;
		width: 33.3%;
		padding-right: 5%;
		font-size: 33rpx;
	}

	.body-ch3-ch2,
	.body-ch3-ch3 {
		margin-left: 5%;
	}

	.footer {
		margin-top: 6%;
		width: 90%;
		margin-left: 5%;
	}

	.footer-ch1-ch1-ch1 {
		font-size: 36rpx;
		font-weight: 700;
	}

	.footer-ch1-ch1-ch2,
	.footer-ch1-ch1-ch3 {
		font-size: 30rpx;
	}

	.footer-ch1-ch1-ch2 {
		margin-left: 3%;
	}

	.footer-ch1-ch1-ch3 {
		margin-left: 15%;
	}

	.scroll-Y {
		white-space: nowrap;
		margin-top: 5%;
		margin-bottom: 10%;
	}

	.scroll-view-item {
		width: 70%;
		display: inline-block;
		flex-direction: row;
		border: 1rpx solid #AAAAAA;
		margin-left: 10%;
		border-radius: 0.5em;
	}

	.scroll-view-item-ch {
		display: flex;
		flex-direction: row;
		width: 80%;
		margin-left: 5%;
		height: 220rpx;
		margin-top: 30rpx;
	}

	.scroll-view-item-ch2 {
		margin-left: 10%;
	}

	.book-detail {
		width: 150rpx;
		height: 200rpx;
	}

	.book-name {
		width: 250rpx;
		white-space: normal;
	}

	.book-people {
		margin-top: 10%;
		font-size: 20rpx;
	}

	.book-cricule {
		font-size: 20rpx;
		margin-top: 20%;
		color: #0081FF;
	}
</style>
