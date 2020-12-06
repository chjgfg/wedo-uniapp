<template>
	<view class="evaluatelist">
		<view class="heard">
			<view class="heard-ch1">
				<image :src="book.image" mode="" class="evaluate-picture"></image>
			</view>
			<view class="heard-ch2">
				<view class="bookname">
					{{book.title}}
				</view>
				<view class="author">
					{{author.name}}
				</view>
				<view class="other">
					<text class="bookfriends">书友<text>1111</text></text>
					<text class="say">发言<text>1111</text></text>
				</view>
			</view>
			<view class="heard-ch3">
				<view class="addit"><text>加入</text></view>
			</view>
		</view>

		<view class="body">
			<view class="body-ch1">
				<view class="title">
					<text class="new">最新</text>
					<text class="hot">最热</text>
				</view>
				
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y evaluate">
					<view v-for="(item,index) in evaluateList" :key="index" class="evaluate-ch1">
						<view class="evaluate-ch1-ch">
							<view class="evaluate-ch1-ch1">
								<view class="evaluate-ch1-ch1-ch1">
									<image :src="item.photo" mode="" class="evaluate-ch1-ch1-picture" />
									<text class="evaluate-ch1-ch1-name">{{item.nickname}}</text>
								</view>
								<view class="evaluate-ch1-ch1-ch2">
									<text class="evaluate-ch1-ch1-name">{{item.created}}</text>
								</view>
							</view>
							<view class="evaluate-ch1-ch2">
								<view class="evaluate-ch1-ch2-ch1">
									{{item.text}}
								</view>
							</view>
							<view class="evaluate-ch1-ch3">
								<text class="cuIcon-evaluate_fill" @tap="support(index)" :class="(index === indexs && color === 1) ? 'red' : 'no'">支持</text>
								<text class="cuIcon-comment" @tap="comment">评论</text>
							</view>
						</view>
					</view>
				</scroll-view>
				
			</view>
		</view>
		<view class="input">
			<view class="input-ch1">
				<view class="textarea">
					<textarea class="eeee" placeholder="回复" v-model="value" :adjust-position="true" :hold-keyboard="false"></textarea>
				</view>
				<view class="btnnn">
					<button type="primary" size="mini" class="btn" @tap="addComment">发布</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		Book,
		Chapters,
		Chapter,
		GetAuthor,
		FindReview,
		AddReview
	} from "../../api/index.js"
	export default {
		data() {
			return {
				scrollTop: 0,
				evaluateList: [],
				color: 0,
				book: {},
				author: {},
				value: "",
				bid: 0,
			  indexs:0,
				supports:"支持",
				
			}
		},
		methods: {
			async getEvaluate(bid) {
				/* var evaluate = [{
						img: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194131577,2954769920&fm=26&gp=0.jpg",
						fname: "情殇天下",
						context: "请系好安全带,高速飙车,一脚油门踩到底的那种"
					},
					{
						img: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2319772070,3114389419&fm=26&gp=0.jpg",
						fname: "情殇地下",
						context: "现在最好看的书,高速飙车"
					},
					{
						img: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1741424648,2803775455&fm=11&gp=0.jpg",
						fname: "情非天下",
						context: "开车慢点,注意安全"
					},
					{
						img: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=819635182,2054230561&fm=11&gp=0.jpg",
						fname: "痛苦天下",
						context: "北京交通委提醒您:道路千万条,安全第一条,行车不规范,家里添口人"
					},
				] */

				const findReview = await FindReview({bid: bid,page: 1,rows: 5})
				// console.log(findReview.items)
				var evaluate = findReview.items
				evaluate.forEach((item, index) => {
					if (item.photo === null) {
						item.photo = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1741424648,2803775455&fm=11&gp=0.jpg";
					}
					if (item.nickname === "未设置昵称") {
						item.nickname = "未设置"
					}
					item.created = new Date(+new Date(new Date(item.created).toJSON()) + 8 * 3600 * 1000).toISOString().replace(
						/T/g, ' ').replace(/\.[\d]{3}Z/, '');
					this.evaluateList.push(item);
				})
			},
			support(index) {
				this.indexs = index
				if (this.color === 0) {
					this.color = 1
					this.supports="取消支持"
				} else {
					this.supports="支持"
					this.color = 0
				}
			},
			comment(){
				uni.showToast({
					title: "客官，该功能等你开发的呢。",
					icon: "none"
				})
			},

			async addComment() {
				try {
					const value = uni.getStorageSync('WD_TOKEN');
					if (value.WD_TOKEN !== null) {
						const addComment = await AddReview({bId: this.bid,text: this.value,token: value.WD_TOKEN})
						// console.log(addComment)
						if (addComment === true) {
							uni.showToast({
								title: "客官，添加成功的呢。",
								icon: "none"
							})
							this.value = ""
							this.evaluateList=[];
							this.getEvaluate(this.bid)
						}else{
							uni.showToast({
								title: "客官，添加失败的呢。",
								icon: "none"
							})
						}
					} else {
						uni.showToast({
							title: "客官，还没登录的呢。",
							icon: "none"
						})
					}
				} catch (e) {
					console.log(e)
				}
			},
			async getbook(bid) { //获取书信息
				const book = await Book(bid) //显示书
				// console.log(book)
				this.book = book
				this.getAuthor(book.aId)
			},
			async getAuthor(aId) { //获取作者信息
				const auther = await GetAuthor({aId: aId});
				// console.log(auther)
				this.author = auther
			}

		},
		onLoad(option) {
			// console.log(option);
			this.bid = option.bid
			this.getEvaluate(option.bid)
			this.getbook(option.bid)
		},
	}
</script>

<style>
	.evaluatelist {
		margin-top: 10%;
		width: 94%;
		margin-left: 3%;
	}

	.heard {
		display: flex;
		flex-direction: row;
	}

	.heard-ch1 {
		width: 33%;
	}

	.heard-ch2 {
		width: 44%;
	}

	.heard-ch3 {
		width: 23%;
	}

	.evaluate-picture {
		width: 202rpx;
		height: 300rpx;
		border-radius: 0.3em;
	}

	.bookname {
		font-size: 36rpx;
		font-weight: 900;
	}

	.author {
		font-size: 30rpx;
	}

	.other {
		font-size: 33rpx;
		font-weight: 500;
	}

	.say {
		margin-left: 5%;
		border-left: 1rpx solid #AAAAAA;
		padding-left: 5%;
	}

	.addit {
		width: 100rpx;
		height: 50rpx;
		border: 1rpx solid #ED1C24;
		border-radius: 0.5em;
	}

	.addit>text {
		font-size: 26rpx;
		text-align: center;
		line-height: 50rpx;
		margin-left: 25%;
	}

	.body {
		margin-top: 10%;
	}

	.title {
		height: 50rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}

	.evaluate {
		margin-top: 5%;
		padding-bottom: 120rpx;
	}

	.evaluate-ch1 {
		/* box-shadow: 1rpx 5rpx 10rpx #CCCCCC; */
		margin-bottom: 5%;
		border-bottom: 1rpx solid #d0d0d0;
		/* border-radius: 0.5em; */
	}

	.evaluate-ch1-ch {
		margin: 3%;
	}

	.evaluate-ch1-ch1 {
		display: flex;
		flex-direction: row;
	}

	.evaluate-ch1-ch1-ch1 {
		width: 60%;
	}

	.evaluate-ch1-ch1-ch2 {
		width: 40%;
		line-height: 105rpx;
		font-size: 20rpx;
	}

	.evaluate-ch1-ch1-picture {
		width: 100rpx;
		height: 100rpx;
		border-radius: 5em;
		vertical-align: middle;
		/* 将图片和字垂直居中 */
	}

	.evaluate-ch1-ch1-name {
		margin-left: 3%;
		margin-top: -100%;
	}

	.evaluate-ch1-ch2,
	.evaluate-ch1-ch3 {
		margin-top: 5%;
	}

	.cuIcon-comment {
		margin-left: 5%;
	}

	.red {
		color: #FF0000;
	}

	.input {
		position: fixed;
		bottom: 1rpx;
		width: 100%;
		background-color: #F1F1F1;
		margin-left: -3%;
	}

	.input-ch1 {
		display: flex;
		flex-direction: row;
		margin-bottom: 5%;
		width: 100%;
		margin-top: 2.5%;
	}

	.textarea{
		width: 70%;
		margin-left: 5%;
		border: 1rpx solid #989b9c;
		border-radius: 0.3em;
	}

	.eeee {
		word-wrap: break-word;
		/* margin-left: 2%; */
		height: 100rpx;
	}

	.btnnn {
		width: 20%;
		margin-left: 3%;
		margin-top: 3%;
	}
	.btn {
		color: #333333;
	}
</style>
