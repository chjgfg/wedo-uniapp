<template>
	<view class="detailbook" :class="number === 1 ? 'black' : 'none' ">
		<view class="detail">

			<view class="heard" @tap="goToChapter(images.id)">

				<view class="heard-ch1">
					<view class="heard-ch1-ch1">
						{{images.title}}
					</view>
					<view class="heard-ch1-ch2">
						{{author.name}}
					</view>
					<view class="heard-ch1-ch3">
						{{images.state === false ? "连载中" : " 完结"}}|{{String(Math.random() * 100).substr(0, 5)}}万字
					</view>
					<view class="heard-ch1-ch3">
						{{images.protagonist}}
					</view>
				</view>

				<view class="heard-ch2">
					<view class="heard-ch2-ch1">
						<image :src="images.image" class="picture" />
					</view>
				</view>

			</view>


			<view class="body">
				<view class="body-ch1">
					<view class="body-ch1-ch1">
						<view class="body-ch1-ch1-ch1">{{peopleNumber}}万</view>
						<view class="body-ch1-ch1-ch2">人气</view>
					</view>
					<view class="body-ch1-ch2">
						<view class="body-ch1-ch2-ch1">{{agree}}</view>
						<view class="body-ch1-ch2-ch2">点赞</view>
					</view>
					<view class="body-ch1-ch3">
						<view class="body-ch1-ch3-ch1">{{fance}}</view>
						<view class="body-ch1-ch3-ch2">粉丝</view>
					</view>
				</view>
				<view class="body-ch2">
					<view class="body-ch2-ch1">
						{{images.intro.substring(0,50)+"..."}}
					</view>
				</view>
				<view class="body-ch3">
					<text class="body-ch3-ch1">最新</text>
					<text class="body-ch3-ch2">{{lasterTitle}}</text>
					<text class="body-ch3-ch3" @tap="goToMenu">5小时前更新<text class="cuIcon-right" /></text>
				</view>
			</view>


			<view class="footer">
				<view class="footer-ch1">
					<text class="footer-ch1-ch1">书圈</text>
					<text class="footer-ch1-ch2">{{fance}}粉丝,27条发言</text>
					<text class="footer-ch1-ch3" @tap="popup">写书评</text>
				</view>
				<view class="footer-ch2" :class="numerical === 0 ? 'none' :'block'">
					<scroll-view :scroll-top="scrollTop" scroll-x="true" class="scroll-x">
						<view class="scroll-view-item" v-for="(item,index) in image">
							<view class="scroll-view-item-test">
								<view id="demo1" class="scroll-view-item1 uni-bg-red">
									<view class="scroll-view-item1-ch-ch1">
										<image :src="item.photo" mode="" class="scroll-view-item1-picture" />
										<text class="scroll-view-item1-ch2">{{item.nickname}}</text>
									</view>
									<view class="scroll-view-item1-ch-ch2">
										<text class="scroll-view-item1-ch3">{{item.created}}</text>
									</view>
								</view>
								<view id="demo2" class="scroll-view-item2 uni-bg-green">
									<view class="scroll-view-item2-ch1">
										<view class="scroll-view-item2-ch1-ch1">
											{{item.text}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="footer-ch3">
					<view class="footer-ch3-ch1" @tap="goToEvaluateList">{{message}}</view>
				</view>
			</view>
		</view>
		<view class="last" :class="show === 0 ? 'none':'block'">
			<!--  -->
			<view class="input-ch1" >
				<view class="textarea">
					<textarea class="eeee" placeholder="回复" v-model="value" :adjust-position="true" :hold-keyboard="false"></textarea>
					<!-- <text>从v的方法时地方vd</text> -->
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
		UserStar,
		FindReview,
		AddReview,
	} from "../../api/index.js"
	export default {
		data() {
			return {
				scrollTop: 0,
				images: {
					aId: 0,
					bookComment: "",
					cId: "",
					chapterNumber: 0,
					creatDate: "",
					id: 0,
					image: "",
					intro: "",
					protagonist: "",
					state: false,
					title: "",
					updateDate: ""
				},
				author: {
					id: 0,
					name: "",
					introduce: "",
					aPhoto: ""
				},
				numbers: 0,
				image: [],
				peopleNumber: 0,
				agree: 0,
				fance: 0,
				lasterTitle: "",
				chapter: 0, //章节id
				message: "",
				numerical: 0,
				show: 0,
				value: "",
				number:0,
			}
		},
		methods: {
			goToChapter(name) {
				console.log("this.chapter" + this.chapter);
				this.numbers = name
				if(this.chapter === 0){
					uni.showToast({
						title:"客官,慢一点,唯唯还没准备好的呢",
						icon:"none"
					})
					return
				}
				uni.navigateTo({
					url: './chapter?name=' + name + "&number=" + this.images.chapterNumber + "&chapter=" + this.chapter,
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			goToMenu() {
				uni.navigateTo({
					url: './menu?name=' + this.numbers + "&number=" + this.images.chapterNumber,
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			goToEvaluateList() {
				if (this.numerical === 0) {
					uni.showToast({
						title: "客官，还没评论的呢。",
						icon: "none"
					})
					return
				}
				uni.navigateTo({
					url: '../evaluate/evaluatelist?bid=' + this.images.id,
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			popup() {//文本框是否显示
				if(this.show === 0){
					this.show = 1
				}else{
					this.show =0
				}
			},
			async addComment() {//添加评论
				try {
					const value = uni.getStorageSync('WD_TOKEN');
					console.log(value.WD_TOKEN)
					if (value.WD_TOKEN !==null ) {
						const addComment = await AddReview({bId:this.images.id,text:this.value,token:value.WD_TOKEN})
						console.log(addComment)
						if(addComment === true){
							uni.showToast({
								title: "客官，添加成功的呢。",
								icon: "none"
							})
							this.show = 0
							this.findReview(this.images.id)
						}else{
							uni.showToast({
								title: "客官，添加失败的呢。",
								icon: "none"
							})
						}
					}else{
						uni.showToast({
							title: "客官，还没登录的呢。",
							icon: "none"
						})
					}
				} catch (e) {
					console.log(e)
				}
				
			},
			async getLastChapter() { //获取最后一章
				const chapters = await Chapters({bid: this.numbers,page: 1,rows: 0})
				this.lasterTitle = chapters.items[chapters.items.length - 1].title
			},

			async findReview(bid) { //找到前三条评论
				this.image=[];
				const findReview = await FindReview({bid: bid,page: 1,rows: 3})
				if (findReview === null) {
					this.numerical = 0
					this.message = "客官,暂时还没评论的呢"
					return
				}
				this.numerical = 1
				this.message = "客官,点这里查看全部评论的呢"
				var items = findReview.items
				items.forEach((item, index) => {
					if (item.photo === null) {
						item.photo = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1741424648,2803775455&fm=11&gp=0.jpg";
					}
					if (item.nickname === "未设置昵称") {
						item.nickname = "未设置"
					}
					if (item.text.length >= 53) {
						item.text = item.text.substring(0,53)+"..."
					}
					item.created = new Date(+new Date(new Date(item.created).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
					console.log(item)
					this.image.push(item)
				})
			},


			async initUserStar(bid) { //查看token是否有,有就获取用户收藏,没就获取这本书的第一页
				console.log("书id" + bid)
				try {
					const value = uni.getStorageSync('WD_TOKEN').WD_TOKEN;
					// console.log(value)
					const userStar = await UserStar({token: value,bid: bid,page: 1,rows: 1});
					console.log(userStar)
					if (userStar !== null) { //判断token是否为空
						console.log(userStar.items[0])
						this.chapter = userStar.items[0].cId
					}else{//为空
						const findOne = await Chapters({bid: bid,page: 1,rows: 1});
						// console.log(findOne)
						let chapter = this.chapterList
						const findOneChapter = await Chapter({ //找到这本书的第一章
							cid: findOne.items[0].id
						});
						this.chapter = findOneChapter.id
					}
					console.log(this.chapter)
				} catch (e) {
					console.log(e)
				}
			},
			
		},

		async onLoad(option) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			setTimeout(function(){
				uni.hideLoading();
			},2000)
			this.number = 1
			this.image=[];
			console.log("cscsccccccccccccccccc")
			this.peopleNumber = parseInt(String(Math.random() * 100).substr(0, 2))
			this.agree = parseInt(String(Math.random() * 10000000).substr(0, 7))
			this.fance = parseInt(String(Math.random() * 10000).substr(0, 4))
			const book = await Book(option.name) //显示书
			// console.log(book)
			await this.initUserStar(book.id)
			this.images = book;
			const auther = await GetAuthor({aId: this.images.aId});
			this.author = auther
			this.numbers = option.name
			console.log(option)
			this.getLastChapter()
			this.findReview(book.id)
			
		},
		
		
	}
</script>

<style>
	
	.uni-textarea-compute>div{
		width: 5%;
		}
		
	.detail {
		width: 94%;
		margin-left: 3%;

	}

	.heard {
		margin-top: 6%;
		display: flex;
		flex-direction: row;
		border-bottom: 2rpx solid #AAAAAA;
		padding-bottom: 2%;
	}

	.heard-ch1 {
		width: 60%;
	}

	.heard-ch2 {
		width: 30%;
	}

	.heard-ch1-ch1 {
		font-size: 36rpx;
		font-weight: 600;
	}

	.heard-ch1-ch2,
	.heard-ch1-ch3 {
		font-size: 26rpx;
		margin-top: 7%;
	}

	.heard-ch1 {
		margin-left: 5%;
	}

	.heard-ch2 {
		/* margin-left: 20%; */
	}

	.picture {
		background-image: url(../../static/bookimages/150.jpg);
		width: 202rpx;
		height: 300rpx;
		border-radius: 0.3em;
	}

	.body {
		margin-top: 5%;
	}

	.body-ch1 {
		width: 100%;
		display: flex;
	}

	.body-ch1-ch1,
	.body-ch1-ch2,
	.body-ch1-ch3 {
		width: 33.3%;
		margin-left: 2%;
		text-align: center;
	}

	.body-ch1-ch1-ch1,
	.body-ch1-ch2-ch1,
	.body-ch1-ch3-ch1 {
		font-size: 33rpx;
		font-weight: 900;
	}


	.body-ch2 {
		height: 160rpx;
	}

	.body-ch2,
	.body-ch3 {
		margin-top: 4%;
	}

	.body-ch3 {
		border-bottom: 1rpx solid #AAAAAA;
		padding-bottom: 2%;
		display: flex;
	}

	.body-ch2-ch1 {
		font-size: 26rpx;
		width: 90%;
		margin-left: 5%;
	}

	.body-ch3-ch1 {
		font-size: 36rpx;
		font-weight: 900;
		width: 20%;
	}

	.body-ch3-ch2 {
		margin-left: 6%;
		font-size: 25rpx;
		width: 50%;
		margin-top: 2%;
	}

	.body-ch3-ch3 {
		margin-top: 2%;
		width: 30%;
	}

	.body-ch3-ch3,
	.body-ch3-ch3>text {
		font-size: 25rpx !important;
		margin-left: 16%;
		color: #FF0000;
	}

	.scroll-x {
		white-space: nowrap;
		/* 不换行 */
		height: 350rpx;
	}

	.scroll-view-item {
		vertical-align: middle;
		display: inline-block;
		width: 93%;
		font-size: 36rpx;
		margin-left: 6%;
		height: 250rpx;
		margin-top: 5%;
		margin-bottom: 6%;
	}

	.scroll-view-item-test {
		border: 1rpx solid #808080;
		height: 300rpx;
		width: 96%;
		border-radius: 0.5em;
		padding-bottom: 10%;
	}


	.body-ch3-ch3,
	.body-ch1-ch1-ch2,
	.body-ch1-ch2-ch2,
	.body-ch1-ch3-ch2,
	.scroll-view-item2-ch1 {
		font-size: 20rpx;
	}
	
	.scroll-view-item2-ch1{
		word-wrap: break-word;
	}

	.scroll-view-item2-ch1-ch1 {
		font-size: 33rpx;
		/* overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2; */
		/* 在第几行显示... */
		/* display: -webkit-box;
		-webkit-box-orient: vertical; */
		white-space: normal;
		/* 换行 */
	}

	.scroll-view-item1 {
		margin-top: 2%;
		/* text-align: center; */
		display: flex;
		flex-direction: row;
	}

	.scroll-view-item1-ch-ch1 {
		width: 45%;
		margin-left: 5%;
	}

	.scroll-view-item1-ch-ch2 {
		width: 55%;
		line-height: 110rpx;
	}

	.scroll-view-item2 {
		margin-top: 2%;
		margin-left: 5%;
		width: 90%;
	}

	.scroll-view-item1-ch2,
	.scroll-view-item1-ch3 {
		font-size: 15rpx;
	}

	.scroll-view-item1-ch2 {
		margin-left: 5%;
	}

	.scroll-view-item1-ch3 {
		margin-left: 15%;
		word-wrap: break-word;
	}

	.footer {
		margin-top: 6%;
	}

	.footer-ch1-ch1,
	.footer-ch1-ch2,
	.footer-ch1-ch3 {
		text-align: center;
	}

	.footer-ch1-ch1 {
		font-size: 36rpx;
		font-weight: 900;
	}

	.footer-ch1-ch2 {
		margin-left: 6%;
		font-size: 26rpx;
	}

	.footer-ch1-ch3 {
		margin-left: 35%;
		font-size: 30rpx;
		color: #0081FF;
	}


	.footer-ch3 {
		width: 94%;
		margin-left: 3%;
		margin-top: 5%;
		margin-bottom: 12%;
	}

	.footer-ch3-ch1 {
		width: auto;
		text-align: center;
		font-size: 34rpx;
		color: #0081FF;
	}

	.last {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #F1F1F1;
	}

	.input-ch1 {
		display: flex;
		flex-direction: row;
		margin-bottom: 5%;
		width: 100%;
		margin-top: 2.5%;
	}


	.btnnn {
		width: 20%;
		margin-left: 5%;
	}

	.btn {
		color: #333333;
		/* margin-left: 70%; */
		margin-top: 20%;
	}
	.textarea{
		width: 80%;
		margin-left: 5%;
		border: 1rpx solid #989b9c;
		border-radius: 0.3em;
	}

	.eeee{
		word-wrap : break-word;
		width: 100%;
	}
	
	.scroll-view-item1-picture {
		width: 100rpx;
		height: 100rpx;
		border-radius: 2em;
		vertical-align: middle;
		text-align: left;
	}

	.none {
		display: none;
	}

	.block {
		display: block;
	}

	uni-textarea {
		width: 370px;
		height: 100rpx;
	}
</style>
