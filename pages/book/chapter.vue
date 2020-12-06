<template>
	<view :class="color === '日间' ? 'chapter2' : 'chapter1'" @touchstart="start" @touchend="end">

		<view class="heard" :class="num1 === 0 ? 'ok': 'no'">
			<view class="heard-ch1">
				<text class="heard-ch1-ch1 cuIcon-back" @tap="back"></text>
				<text class="heard-ch1-ch2 " @tap="goToInits(gotoinit)">
					{{gotoinit}}
				</text>
			</view>
		</view>

		<view class="body" v-for="(item,index) in chapterList">
			<view class="title" :class="color ==='夜间' ? 'fontColor1' :'fontColor2' ">
				{{item.title}}
			</view>
			<view class="context" v-html="item.context" :class="color ==='夜间' ? 'fontColor1' :'fontColor2' "></view>
		</view>

		<view class="footer" :class="num1 === 0 ? 'ok': 'no'">
			<view class="footer-ch1">

				<div class="befor" @click="light">
					<div class="image-bigss">
						<image src="../../static/img/tabbar/deng.png" mode="" class="bigss" />
					</div>
					<div class="test">亮度</div>
				</div>

				<div class="bookList" @click="showDrawer('showLeft')">
					<div class="image-bigss">
						<image src="../../static/img/tabbar/mulu.png" mode="" class="bigss" />
					</div>
					<div class="test">目录</div>
				</div>
				<div class="after" @tap="whiteorblack">
					<div class="image-bigss">
						<image src="../../static/img/tabbar/sun.png" mode="" :class="color === '夜间' ? 'ok':'no' " class="bigss dddd" />
						<!-- :src="color === '日间' ? 'sun' : 'yueliang'" -->
						<image src="../../static/img/tabbar/yueliang.png" mode="" :class="color === '日间' ? 'ok':'no' " class="bigss dddd" /><!--  :src="color === '日间' ? 'sun' : 'yueliang'" -->
					</div>
					<div class="test">{{color}}</div>
				</div>
			</view>
		</view>

		<view class="displayList">
			<view class="displayList-ch1" :class="num2 === 0 ? 'no' : 'ok'">
				<view class="displayList-ch1-footer">
					<uni-drawer ref="showLeft" mode="left" :mask-click="false" @change="change($event,'showLeft')" :maskClick=true>
						<view class="scroll-view">
							<scroll-view class="scroll-view-box " :class="color === '日间' ? 'ssss2' : 'ssss1'" scroll-y="true">
								<view class="close" :class="color === '夜间' ? 'fontColor1' : 'fontColor2'">
									章节目录
								</view>
								<view class="info-content" :class="color === '夜间' ? 'fontColor1' : 'fontColor2'" v-for="(item,index) in list"
								 :key="index" @tap="changePage(item)">
									<text>{{item.title}}</text>
								</view>
								<view class="info-content-sss"></view>
							</scroll-view>
						</view>
					</uni-drawer>
				</view>
			</view>
			<view class="displayList-ch2"></view>
		</view>


	</view>
</template>

<script>
	import {
		Chapters,
		Chapter,
		LastOrNextChapter,
		UserStar,
		AddUserStar,
		UpdateUserStar,
		DeleteUserStar,
	} from "../../api/index.js"
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	export default {
		components: {
			uniDrawer
		},
		data() {
			return {
				num1: 0,
				num2: 0,
				scrollTop: 0,
				startData: {
					clientX: 0,
					clientY: 0
				},
				list: [],
				/* 接收别的页面的跳转过来的数据*/
				bid: 0,
				number: 0,
				chapter: 0,
				/**/
				//章节列表页面初始列为1
				page: 1,
				//获取章节的最后一章id
				lastId: 0,
				//每一章节信息
				chapterList: [{
					title: null,
					context: null,
				}],
				//向上翻了多少页
				lastPageNumber: 0,
				//向下翻了多少页
				nextPageNumber: 0,
				//获取当前页的章节号
				chapterId: 0,
				//收藏或取消收藏
				gotoinit: "",
				//颜色变化
				color: "夜间",
				//图片
				yueliang: "../../static/img/tabbar/yueliang.png",
				sun: "../../static/img/tabbar/sun.png",
				lignt: 0,
			}
		},

		async onReachBottom() { //上拉加载
			console.log("上拉了")
			this.lastOrNextChapter(this.nextPageNumber, 1);
		},
		async onPullDownRefresh() { //下拉刷新
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 200);
			this.lastOrNextChapter(this.lastPageNumber, -1);
		},
		methods: {

			start(e) {
				var subY = e.changedTouches[0].clientY;
				var subX = e.changedTouches[0].clientX;
				this.startData.clientX = subX;
				this.startData.clientY = subY;
			},
			end(e) {
				const subX = e.changedTouches[0].clientX - this.startData.clientX;
				const subY = e.changedTouches[0].clientY - this.startData.clientY;
				var suby = this.startData.clientY
				var subx = this.startData.clientX
				if (suby >= 222 && suby <= 444) {
					if (subx >= 87 && subx <= 287) {
						// console.log("ok")
						if (this.num1 === 0) {
							this.num1 = 1
							return;
						} else {
							this.num1 = 0
							return;
						}
					}
				}
				if (subY > 50) {
					// console.log('上滑 ====>' + subY)
					return;
				} else if (subY < -50) {
					this.addList(this.bid, ++this.page)
					// console.log('下滑 ====>' + subY)
					return;
				} else {
					if (subX > 50) {
						// console.log('右滑')
						return;
					} else if (subX < -50) {
						// console.log('左滑')
						return;
					} else {
						// console.log('无效')
						return;
					}
				}
			},

			light() {
				this.lignt = this.lignt + 0.3;
				if (this.lignt > 0.9) {
					this.lignt = 0;
				}
				uni.setScreenBrightness({
					value: this.lignt, //屏幕亮度值，范围 0~1，0 最暗，1 最亮
					success: function() {
						console.log('success');
					}
				});
				console.log(this.lignt)
			},

			whiteorblack() {
				if (this.color == "夜间") {
					this.color = "日间"
				} else {
					this.color = "夜间"
				}
			},

			back() { //返回到上一页面
				console.log("返回")
				if (this.gotoinit === "取消收藏") { //是取消收藏就更新
					console.log("back 页面销毁了")
					const value = uni.getStorageSync('WD_TOKEN').WD_TOKEN;
					this.updateUserStar(value, this.bid, this.chapterId)
				}
				uni.navigateBack({
					delta: 1
				});
			},
			showDrawer(e) {
				this.num2 = 1
				this.num1 = 0
				console.log(this.num2)
				if (this.num2 === 0) {
					this.num2 = 1
				} else {
					this.num2 = 0
				}
				this.$refs[e].open()
				console.log(e)
			},
			change(e, type) {
				// console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},

			async addList(bid, pages) { //初始化获取章节列表
				if (this.lastId >= this.number) {
					return;
				}
				const chapterList = await Chapters({
					bid: bid,
					page: pages,
					rows: 20
				});
				this.lastId = chapterList.items[chapterList.items.length - 1].sequenceNum
				// console.log(chapterList)
				const arr = this.list
				var items = chapterList.items
				items.forEach((item, index) => {
					arr.push(item)
				})
				this.list = arr
			},



			async initFindOne(bid, pages) { //初始化获取一本书的一章
				console.log(bid, pages)
				this.num1 = 0
				this.num2 === 0 ? 1 : 0;

				let chapter = this.chapterList
				const findOneChapter = await Chapter({
					cid: pages
				});
				chapter.push(findOneChapter)
				this.chapterList = chapter
				// console.log(findOneChapter)
				this.lastPageNumber = findOneChapter.id; //获取跳转后的页面加载的数据id
				this.nextPageNumber = findOneChapter.id; //获取跳转后的页面加载的数据id
				this.chapterId = findOneChapter.id
				// console.log(findOneChapter)
			},



			async lastOrNextChapter(pages, number) { //查询是上一章还是下一章
				// console.log(pages)
				const newChapter = await LastOrNextChapter({
					cid: pages,
					type: number
				});
				if (newChapter == null) {
					if (number == -1) {
						uni.showToast({
							title: "客官已经是第一章了呢",
							icon: "none"
						})
						return;
					} else if (number == 1) {
						uni.showToast({
							title: "客官,轻一点,已经到底了呢",
							icon: "none"
						})
						return;
					}
				} else {
					if (number == -1) {
						this.chapterList.unshift(newChapter)
						this.lastPageNumber = newChapter.id
					} else if (number == 1) {
						this.chapterList.push(newChapter)
						this.nextPageNumber = newChapter.id
					}
					this.chapterId = newChapter.id
				}
				console.log(newChapter)
			},

			changePage(item) {
				this.num2 = 1
				this.num1 = 0
				console.log(item)
				this.chapterList = [];
				this.initFindOne(this.bid, item.id);
			},

			async addUserStar(token, bid, cid) { //添加用户收藏
				const addUserStar = await AddUserStar({
					token: token,
					bId: bid,
					cId: cid
				})
				console.log(addUserStar)
			},

			async updateUserStar(value, bid, cid) { //修改用户收藏
				const updateUserStar = await UpdateUserStar({
					token: value,
					bId: bid,
					cId: cid
				})
				console.log(updateUserStar)
				// location.reload()
			},

			async deleteUserStar(value, bid) { //取消收藏
				const deleteUserStar = await DeleteUserStar({
					token: value,
					bId: bid
				})
				console.log(deleteUserStar)
			},

			async updateStatus(value) { //找到这本书
				const userStar = await UserStar({
					token: value,
					bid: this.bid,
					page: 1,
					rows: 1
				});
				console.log(userStar)
				if (userStar === null) {
					this.gotoinit = "收藏";
				} else {
					this.gotoinit = "取消收藏";
				}
			},

			goToInits(item) {
				console.log(item)
				const value = uni.getStorageSync('WD_TOKEN').WD_TOKEN;
				if (item === "收藏") {
					this.addUserStar(value, this.bid, this.chapterId)
					this.gotoinit = "取消收藏";
				} else if (item === "取消收藏") {
					this.deleteUserStar(value, this.bid)
					this.gotoinit = "收藏";
				}
			},

		},
		async onLoad(option) {
			const value = uni.getStorageSync('WD_TOKEN').WD_TOKEN;
			this.bid = option.name;
			this.number = option.number;
			this.chapter = option.chapter;
			console.log(option)
			this.addList(this.bid, this.page);
			this.initFindOne(this.bid, this.chapter);
			this.updateStatus(value)
		},

		async onUnload() {
			if (this.gotoinit === "取消收藏") { //是取消收藏就更新
				console.log("页面销毁了")
				const value = uni.getStorageSync('WD_TOKEN').WD_TOKEN;
				this.updateUserStar(value, this.bid, this.chapterId)
			}
		}
	}
</script>

<style>
	.ok {
		display: none;
	}

	.no {
		display: block;
	}

	.heard {
		height: 150rpx;
		background-color: #0f0f0f;
		opacity: 0.9;
		/* 透明度,越小越透明 */
		position: fixed;
		width: 100%;
		padding-top: 100rpx;
		z-index: 100;
	}

	.heard-ch1 {
		width: 90%;
		margin-left: 5%;
		font-size: 36rpx;
	}


	.heard-ch1-ch2 {
		margin-left: 73%;
		font-size: 36rpx;
		text-align: center;
	}

	.heard-ch1-ch1,
	.heard-ch1-ch2 {
		color: #EEEEEE;

	}

	.chapter1 {
		background-color: #ecd192;
	}

	.chapter2 {
		background-color: #3a3a3a;
	}

	.body {
		padding-top: 50rpx;
		width: 94%;
		margin-left: 3%;
		height: 100%;
	}


	.title {
		padding-top: 10%;
		font-size: 50rpx;
		text-align: center;
	}

	.context {
		margin-top: 5%;
		font-size: 40rpx;
	}

	p {
		margin-bottom: 5%;
	}

	.footer {
		height: 100rpx;
		background-color: #0f0f0f;
		position: fixed;
		opacity: 0.9;
		bottom: 0;
		width: 100%;
		z-index: 100;
	}

	.footer-ch1 {
		width: 100%;
		height: 100rpx;
		display: flex;
	}

	.befor,
	.bookList,
	.after {
		width: 33.3%;
		/* text-align: center;
		line-height: 100rpx;
		font-size: 36rpx; */
		/* line-height: 80rpx; */
		font-size: 36rpx;
		text-align: center;
		color: #EEEEEE;
	}


	.displayList {
		position: fixed;
		top: 0;
		display: flex;
		width: 100%;
		z-index: 9990;
	}

	.displayList-ch1 {
		/* background-color: #FFA200; */
		width: 80%;
	}

	.displayList-ch1-footer-ch>view {
		margin-left: 10%;
	}

	.displayList-ch1-footer-ch {
		border-bottom: 2rpx solid #1d1d1d;
		height: 100rpx;
		line-height: 100rpx;
	}

	.displayList-ch2 {
		width: 20%;
		background-color: #1d1d1d;
		opacity: 0.8;
	}


	.scroll-view {
		flex: 1
	}

	.scroll-view-box {
		flex: 1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.close {
		padding: 15px;
		font-weight: 600;
	}

	.info-content {
		margin-left: 30rpx;
		font-size: 30rpx;
		margin-top: 50rpx;
	}

	.info-content-sss {
		margin-top: 50rpx;
		height: 20rpx;
	}

	.ssss1 {
		background-color: #ecd192;
	}

	.ssss2 {
		background-color: #3a3a3a;
	}

	.bigss {
		width: 52rpx;
		height: 52rpx;
		text-align: center;
		margin: auto;
	}

	.test {
		display: block;
	}

	.dddd {
		margin: auto;
		margin-bottom: 10rpx;
	}

	.fontColor1 {
		color: #000000;
	}

	.fontColor2 {
		color: #cecece;
	}

	.fontColor3 {
		color: #303030;
	}
</style>
