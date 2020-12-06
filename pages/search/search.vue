<template>
	<view id="search">
		<view class="search-ch">
			<view class="heard" :class="num === 0 ? 'block' : 'none' ">
				<view class="heard-h">
					<view class="input-icon">
						<view class="input-icon-ch1">
							<input type="text" class="input" placeholder="客官,请输入..." v-model="value" @confirm="doSearch"><!-- @input="getvalue" -->
						</view>
					</view>
					<view class="frond">
						<view class="frond-ch1" @tap="getinputvalue">
							搜索
						</view>
					</view>
				</view>
			</view>

			<view class="heards" :class="num === 1 ? 'block' : 'none' ">
				<view class="heard-h">
					<view class="input-icon">
						<view class="input-icon-ch1">
							<input type="text" class="input" placeholder="客官,请输入..." v-model="value" @confirm="doSearch"><!-- @input="getvalue" -->
						</view>
					</view>
					<view class="frond">
						<view class="frond-ch1" @tap="getinputvalue">
							搜索
						</view>
					</view>
				</view>
			</view>

			<view class="body">

				<view class="body-children" :class="num === 0 ? (flag === true ? 'none' : 'bloak') : 'none' ">
					<view class="history">搜索历史</view>
					<view class="body-children-ch1">
						<view class="body-children-ch1-ch1">
							<view class="body-children-ch1-ch1-ch1" v-for="(item,index) in history" @tap="searchHistorys(item)">
								{{item}}
							</view>
						</view>
						<view class="body-children-ch2">
							<view class="cuIcon-deletefill" @tap="cleanStorage"></view>
						</view>
					</view>
				</view>

				<view class="body-children1" :class="num === 0 ? 'block' : 'none' ">
					<!-- 推荐 -->
					<view class="body-ch1">
						<view class="body-ch1-ch1">
							<view class="tuijian">为你推荐</view>
							<view class="gengxin cuIcon-refresh" @tap="getsome"></view>
						</view>
						<view class="cate-item">
							<view v-for="(item,index) in category" class="cate" @tap="getCategory(item)">
								<view class="item">{{item.typeName}}</view>
							</view>
						</view>
					</view>

					<view class="body-ch2">
						<view class="book-cate">
							<view class="book-cate-ch1" v-for="(item,index) in bookCate" :class="item.id == indexs ? 'red' : 'nored'" @tap="getbook(index,item.id)" :key="index">{{item.typeName}}</view>
						</view>
						<view class="books">
							<view class="books-ch1" v-for="(item,index) in books" @tap="goToDetaiolbook(item.id)">{{item.title}}</view>
						</view>
					</view>

				</view>



				<view class="body-children2" :class="num === 1 ? 'block' : 'none' ">
					<view class="body-children2-ch2">
						<view class="book" v-for="(item,index) in bookImages" @tap="gotoBook(item.id)">
							<view class="book-image">
								<image :src="item.image" class="book-pricture"></image>
							</view>
							<view class="itemssssss">
								<view class="line-heigh">{{item.title}}</view>
								<view class="line-heigh">{{item.authorName}}</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		CategoryList,
		BookList,
		Search,
		Book
	} from "../../api/index.js"
	export default {
		data() {
			return {
				indexs: 1,
				color: '',
				value: "",
				num: 0,
				categorys: [],
				category: [{
						iconUrl: null,
						id: 1,
						typeInfo: "暂无信息",
						typeName: "玄幻"
					},
					{
						iconUrl: null,
						id: 2,
						typeInfo: "暂无信息",
						typeName: "奇幻",
					}, {
						iconUrl: null,
						id: 3,
						typeInfo: "暂无信息",
						typeName: "武侠",
					}, {
						iconUrl: null,
						id: 4,
						typeInfo: "暂无信息",
						typeName: "仙侠"
					}, {
						iconUrl: null,
						id: 5,
						typeInfo: "暂无信息",
						typeName: "都市"
					}, {
						iconUrl: null,
						id: 6,
						typeInfo: "暂无信息",
						typeName: "现实"
					},
				],
				bookCate: [],
				category0: [],
				searchHistory: [],
				history: [],
				length: 0,
				books: [{
					aId: "",
					bookComment: "",
					cId: "",
					chapterNumber: "",
					creatDate: "",
					hot: 0,
					id: 0,
					image: "",
					intro: "",
					name: "",
					protagonist: "",
					state: "",
					title: "",
					updateDate: ""
				}],
				images: [],
				bookImages: [],
				flag: true
			}
		},
		onLoad() {
			this.getCategoryList()
			this.getbook(0, 1)
			// this.getsome();
		},
		computed: {
			setindexss: function(index) {
				if (this.indexs === index) {
					return 'red';
				}
				return 'none';
			}
		},
		methods: {
			doSearch() { //键盘监听
				this.getInputValue()
			},
			getinputvalue() { //点击搜索
				this.getInputValue()
			},
			async getInputValue() {
				this.bookImages = []
				if (this.value === "" || this.value === undefined) {
					this.num = 0
					uni.showToast({
						title: '客官,您输入为空呢',
						icon: "none"
					});
				} else {
					console.log(this.searchHistory)
					this.searchHistory.push(this.value)
					const aHistory = this.searchHistory;
					const bHistory = [];
					for (var k = 0; k < aHistory.length; k++) { //数组去重
						if (aHistory[k] !== undefined) {
							if (!bHistory.includes(aHistory[k])) {
								bHistory.push(aHistory[k])//去重存进变量数组
							}
						}
					}
					console.log(bHistory)
					try {
						uni.setStorageSync('search_history', bHistory);
					} catch (e) {
						console.log(e);
					}
					this.history = []
					try {
						const value = uni.getStorageSync('search_history');
						value.forEach((item, index) => {
							this.history.push(item)
						})
					} catch (e) {
						console.log(e);
					}
					console.log("flag", this.flag)
					this.num = 1
					const search = await Search({
						key: this.value
					})
					// console.log(search.items)
					const items = search.items
					items.forEach((item, index) => [
						// console.log(item)
						this.bookImages.push(item)
					])
				}
				this.flag = this.history === "" ? true : false
			},

			searchHistorys(item) {
				console.log(item)
				this.value = item
				this.num = 1
				this.getInputValue()
			},

			cleanStorage() {
				try {
					uni.removeStorageSync('search_history');
					this.history= [];
					this.flag = true
				} catch (e) {
					console.log(e);
				}
			},
			async getsome() {

				this.category = []
				var max = this.length
				var min = 0;
				var arr = new Array(max);
				for (var i = 0; i < max; i++) {
					var k = parseInt(Math.random() * (max - min)) + min; //指定生成某一范围内的随机数
					arr.push(k + "");
				}
				var array = []
				for (var k = 0; k < arr.length; k++) { //数组去重
					if (arr[k] !== undefined) {
						if (!array.includes(arr[k])) {
							array.push(arr[k])
						}
					}
				}
				for (var m = 0; m < array.length - 1; m++) {
					if (m === 6) {
						break
					}
					this.category.push(this.category0[array[m]])
				}
				arr = new Array(max);
				array = []
				// console.log(this.category)
			},
			async getbook(ii, index) {
				this.indexs = ii + 1;
				// console.log(this.indexs)
				this.books = []
				const bookList = await BookList(index, 1)
				for (var i = 0; i < bookList.items.length; i++) {
					this.books.push(bookList.items[i])
				}
			},

			gotoBook(item) {
				uni.navigateTo({
					url: "../book/detailbook?name=" + item,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			gotoAuthor(item) {
				uni.navigateTo({
					url: "../author/author?name=" + item,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			async getCategoryList() {
				const categoryList = await CategoryList()
				this.categorys = categoryList
				this.length = this.categorys.length
				this.category0 = categoryList
				for (let i in this.categorys) { //给四个分类书
					if (i > 3) {
						break
					}
					this.bookCate.push(this.categorys[i])
				}
				// console.log(this.category0)

			},
			goToDetaiolbook(item) {
				console.log(item)
				uni.navigateTo({
					url: "../book/detailbook?name=" + item,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			},

			async getCategory(item) {
				this.num = 1
				const bookList = await BookList(item.id, 1, 6)
				for (var i = 0; i < bookList.items.length; i++) {
					this.bookImages.push(bookList.items[i])
				}
			}
		},

	}
</script>

<style>
	/* @import url("../../static/css/iconfont.css"); */

	.red {
		color: #0081ff;
		border-bottom: 2px solid #0081ff;
	}

	.block {
		display: block;
	}

	.none {
		display: none;
	}

	.search {
		margin: 0;
		padding: 0;
	}

	.search-ch {
		width: 100%;
		height: 70rpx;
		padding-top: 0.5%;
		padding-bottom: 1%;
		/* border-bottom: 1rpx solid #; */
		/* box-shadow: 1rpx 2rpx 20rpx #E5E5E5; */
	}

	.heards {
		position: fixed;
		z-index: 500;
		height: 75rpx;
		width: 100%;
		background-color: #f1f1f1;
		margin-top: -10rpx;
		padding-top: 10rpx;
	}

	.heard-hs {
		padding-top: 50rpx;
		display: flex;
		margin-bottom: 5%;
	}

	.heard-h {
		display: flex;
		margin-bottom: 5%;
	}

	.body-children {
		width: 94%;
		margin-left: 3%;
		margin-bottom: 1%;
	}

	.body-children-ch1 {
		display: flex;
		flex-direction: row;
	}

	.body-children-ch1-ch1 {
		width: 88%;
	}

	.body-children-ch1-ch1-ch1 {
		display: inline-block;
		width: 33.3%;
		margin-bottom: 5%;
	}


	.history {
		font-size: 36rpx;
		margin-bottom: 2%;
	}


	.input-icon {
		width: 75%;
	}

	.input-icon-ch1 {
		width: 80%;
		margin-left: 10%;
		border-radius: 0.8em;
		border: 1rpx solid #3B4144;
		line-height: 60rpx;
	}

	.input {
		display: inline-block;
		vertical-align: middle;
		font-size: 60%;
		width: 90%;
		margin-left: 5%;
		font-size: 34rpx;
		margin-bottom: 1%;
	}

	.frond {
		width: 25%;
		margin-left: -3%;
		font-size: 30rpx;
	}

	.frond-ch1 {
		width: 80%;
		/* border-radius: 0.8em; */
		line-height: 60rpx;
		text-align: center;
	}

	.body {
		width: 100%;
		height: 1px;
		/* border-bottom: 1px solid #333333; */
		padding-top: 3%;
	}

	.body-ch1 {
		height: 200rpx;
		border-bottom: 1rpx solid #D3D3D3;
	}

	.body-ch1-ch1 {
		width: 95%;
		margin-left: 2.5%;
		/* background-color: #3B4144; */
		display: flex;
		flex-direction: row;

		/* height: 200rpx; */
	}

	.tuijian {
		width: 70%;
		font-size: 36rpx;
	}

	.gengxin {
		font-size: 155%;
		margin-left: 55%;
		width: 30%;
	}


	.cate-item {
		width: 100%;
	}

	.cate {
		font-size: 22rpx;
		width: 30%;
		margin-top: 2%;
		margin-left: 2.5%;
		display: inline-flex;
		margin-bottom: 2%;
	}

	.item {
		font-size: 26rpx;
		border: 1rpx solid #E6E6FA;
		background-color: #E6E6FA;
		border-radius: 0.5em;
	}

	.body-ch2 {
		margin-top: 8%;
		font-size: 20rpx;
		/* cursor: pointer; */
	}


	.book {
		display: flex;
		flex-direction: row;
		width: 80%;
		margin-left: 5%;
	}

	.book-image {
		width: 20%;
	}

	.itemssssss {
		width: 70%;
		text-align: left;
	}



	.book-cate {
		margin-left: 1.5%;
		display: flex;
		flex-direction: row;
	}

	.book-cate-ch1 {
		margin-left: 8%;
		font-size: 36rpx;
	}

	.book-cate-ch1:nth-child(1) {
		margin-left: 1%;
	}

	.body-children2 {
		width: 94%;
		margin-left: 3%;
	}

	.body-children2-ch1 {
		padding-bottom: 5%;
		border-bottom: 1rpx solid #AAAAAA;

	}

	.body-children2-ch2 {
		padding-top: 5%;
	}

	.books {
		margin-top: 5%;
		margin-left: 2.5%;

	}

	.books-ch1 {
		width: 80%;
		margin-bottom: 5%;
		/* display: inline-flex; */
		font-size: 32rpx;
	}

	.people,
	.book {
		display: inline-flex;
		width: 100%;
		height: 100rpx;
		margin-top: 2%;
	}

	.people-pricture {
		background-image: url(../../static/bookimages/150.jpg);
		border-radius: 2em;
		width: 100rpx;
		height: 100rpx;
	}

	.book-pricture {
		background-image: url(../../static/bookimages/150.jpg);
		width: 100rpx;
		height: 150rpx;
		border-radius: 0.3em;
	}

	.line-heigh {
		/* text-align: center; */
		margin-left: 5%;
		margin-top: 8%;
	}
</style>
