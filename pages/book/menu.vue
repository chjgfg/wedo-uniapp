<template>
	<view class="menu">
		<view class="body">
			<view class="chapter" v-for="(item,index) in newChapters" @tap="goToChapter(item)">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		Chapters
	} from "../../api/index.js"
	export default {
		data() {
			return {
				firstPage: "1-20章",
				num: 0,
				newChapters: [],
				bookId: 0,
				chapterNumber: 0,
				bookPage: 1,
				lastChapter: 0
			}
		},

		methods: {
			async getChapters(bid, page) {
				if (this.lastChapter >= this.chapterNumber) {
					return;
				}
				const chapters = await Chapters({
					bid: bid,
					page: page,
					rows: 20
				})
				this.lastChapter = chapters.items[chapters.items.length - 1].sequenceNum
				var lists = this.newChapters;
				
				chapters.items.forEach((item, index) => {
					this.newChapters.push(item)
				})
				this.newChapters = lists;
				// console.log(this.newChapters)
			},
			goToChapter(item) {
				// console.log(item)
				uni.navigateTo({
					url: "./chapter?name=" + this.bookId+"&number="+this.chapterNumber+"&chapter="+item.id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
		},
		async onReachBottom() {
			await this.getChapters(this.bookId, ++this.bookPage)
		},
		async onLoad(option) {
			console.log(option)
			this.bookId = option.name
			// this.bookPage = option.number
			this.chapterNumber = option.number
			await this.getChapters(this.bookId, this.bookPage)
		},

	}
</script>

<style>
	.heard {
		width: 100%;
		position: fixed;
		height: 50rpx;
	}

	.heard-ch {
		background-color: #AAAAAA;
		/* margin-top: -3%; */
		height: 100%;
		font-size: 20rpx;
	}

	.body,
	.heard-ch1 {
		width: 94%;
		margin-left: 3%;
	}

	.body {
		padding-top: 5%;
	}

	.page-first {
		margin-left: 76%;
	}

	.chapter {
		margin-top: 5%;
		border-bottom: 1rpx solid #AAAAAA;
		height: 60rpx;
	}
</style>
