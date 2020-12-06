<template>
	<view id="booktstore">

		<view class="context" :class="number === 1 ? 'block' : 'none'">
			<view class="heard">
				<!-- 顶部的分类 -->
				<view class="fenlei">
					<view class="fenlei-heard">
						<scroll-view class="scroll-view_H" scroll-x="true">
							<view class="men scroll-view-item_H" :class="item.id  === categoryId ? 'yse' : 'no' " v-for="(item,index) in fenlei"
							 @tap="change(item.id,item.typeName)">
								{{item.typeName}}
							</view>
						</scroll-view>
						<!-- 顶部分类的放大镜 -->
						<view class="bgc">
							<view class="bgc-ch1 cuIcon-search" @tap="tosearch"></view>
						</view>
					</view>
				</view>
			</view>

			<!-- 具体的书 -->
			<view class="body">
				<view class="body-ch1">
					<view class="scroll-view">
						<!-- 轮播图 -->
						<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
						 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
						 indicator-active-color="#0081ff" id="uni-swiper-dots-horizontal">
							<swiper-item v-for="(item,index) in swiperList1" :key="index" :class="cardCur==index?'cur':''">
								<view class="swiper-item">
									<image :src="item.url" mode="widthFix " v-if="item.type=='image'" class="images" /><!-- mode="aspectFill" -->
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>

				<view class="body-ch2">
					<view class="body-ch2-ch1">

						<view class="current-ch1">本期主打</view>
						<view class="current-ch2" @tap="gotoDetali(oneBook.id)">
							<!-- 主打的一个图片 -->
							<image :src="oneBook.image" class="picture" mode="widthFix" />
							<view class="current-ch2-picture">
								<view class="current-ch2-picture-ch">
									<view class="current-ch2-picture-ch-title">
										{{oneBook.title}}
									</view>
									<view class="current-ch2-picture-ch-context">
										{{oneBook.intro.substring(0,100)+"..."}}
									</view>
									<view class="current-ch2-picture-ch-foot">
										{{oneBook.name}}
									</view>
								</view>
							</view>
						</view>
						<!-- 主打的三个图片   -->
						<view class="current-ch3">
							<view class="current-three">
								<view class="current-three-item" v-for="(item,index) in images" @tap="gotoDetali(item.id)">
									<image :src="item.image" class="item-picture" />
									<view class="picture-font">{{item.title}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="body-ch3">
					<view class="body-ch3-ch1">
						<view class="more">
							<view class="morebook-ch1">{{categoryName}}</view>
							<!-- <view class="morebook-ch2" @tap="morebook(categoryId)">更多好书
								<text class="cuIcon-right" />
							</view> -->
						</view>
						<view class="more-books">
							<view class="more-books-images">
								<view class="" v-for="(item,index) in moreImages" class="more-books-item" @tap="gotoDetali(item.id)">
									<image :src="item.image" class="more-books-item-images" />
									<view class="more-books-item-front">{{item.title}}</view>
								</view>
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
		CidAndHot
	} from "../../api/index.js"
	export default {
		data() {
			return {
				oneBook: {
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
				},
				// bookname: "我有一个资源挂",
				dotStyle: true,
				cardCur: 0,
				num: 0,
				item: 1,
				page: 1,
				fenlei: [],
				swiperList1: [],
				swiperList: [
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/8c055fbd3676a1392146f08502b9bd59.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/63a07e805925788d44d8c03e8abdf67c.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/052cda90a3b7b27591fa502531bd1acc.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/bff42f635c46a8d87a0d88612b8d9e55.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/7543514bf2ed307e4a202d26b66a18a5.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/3a1e26130df0edd8a8910df431802ae0.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/2905a4ae9072197662b741adb5a4c5c3.jpg'
					}],
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/2a2ccdcb1926adabaf64fcbc3fc49512.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/8f6b7d2c997d5b5ff3317facba067450.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/3fc434b7b0f8abc929475cdb2d056b3a.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/e201a79cf39dfa22eaf24b1f5530b683.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/dc7488316053c842a9aab699d4b23fc0.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/91db4f89fbad5a6157a1053867197d5e.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/f3fbf64bbd80df576f8a6e6ad91597b7.jpg'
					}],
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/ffd3d1a3dd2a90655d99f88d6b0ad1ac.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/4fb3b7e101e7db07753b431940fa0b41.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/69299a4833ecbd65eda1599da94eddc6.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/55070254eccfa19dd6bc8ddc9dd43812.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/58a0af6ec445bc4850c9ecfc9c04e91a.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/94df909886546325bd277ec1e7bc74e1.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/216abc2d0bf6f87b94b6243ce4f4a6b8.jpg'
					}],
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/7448ccc69be766e06b2d0428ef93c7a9.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/73a68acdacdcf5f5cad7a6859cf76666.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/3624aa9fb94e020705aa0890b9c0a516.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/2751af02b2cac2d01f9299a5dfe51837.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/76be3fdccbb2d566bf170f48559286ba.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/9bc4165b7102d74a86413d1c90de8f15.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/d5b3289a65601acf47f478790c94d02e.jpg'
					}],
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/185413b94c6e400d7fcd4cc460a648c7.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/df618e2889eeebfb9be8fa616fd607d4.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/98a06d709d5d916f069fdc0cdc88c243.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/e245778ee58b5cefd2e9dae696b242ee.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/eb9393a6e1c6faed72c958af4f6ba076.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/f2f6d755ef4219a682a81f3e26b25e5c.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/b4217539fb73ba3c091f80b6ccc945ac.jpg'
					}],
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/840d2e8ae3505c235ce2903ddb91d9c1.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/bcd3954061db607482ce51003aa99f5a.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/99bc34ba697032fad2b092098ad0f70d.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/c13ce81b403325e38db9fdd69b0f5042.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/a987e034e9b8d3b0e36290ec7ca38959.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/8caf93cfa2affaf2063ab939f4c6399d.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/a3561b15b8f59bd194e9f4461b19b841.jpg'
					}],
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/8b50bd6b5baa92a0f9f3691030390836.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/83fdaa81e627fa48e1a7ac8ef7ef7d06.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/d20ab60d2fe61fb3832db0926ba2d673.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/0723a12e261603460952c793a3beb1d3.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/bd3b5ea7ce59451656e0e5c5eb16073e.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/a9ad07af7f161dbfb29f93fbd53ca921.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/c61d0c61b9f84f3488f9cf0c768472bb.jpg'
					}],
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/11d893bbabe48693c2e769d8a66cc2c9.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/3b32dc10bea492dbb26f8fd26e60cde8.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/93c02cddec3f63f40d8af5b95a57bbf1.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/38e720cd460817efac2a80804657187b.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/452b11f95ff6426272f868738a8a0034.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/425e194db1d7ab4c6dbaf427ad2c33ef.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/1381572f8f944ec91bd7e8fe95bcbcce.jpg'
					}],
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/1869052597a8bc7e4eb68993f86641ae.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/8fc15a913f1e5fa39c3a784dcafc1953.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/90dedba4c3f6515e3a559cb7a1283093.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/7535177e89d913eed64bf86665f80be0.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/b6ddcf108d893522614c4dc560510e88.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/208b240580380220de2843bcddf970a7.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/1c549180f8ff7320346021080969d8ad.jpg'
					}],
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/093002acd40dc7a3c7df6e70b00a2ddb.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/3c9bc006695ba558436ed1dc520dee5a.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/b476a867861c1c4adbba938bf5042319.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/c6b3054532bbd9efde58a449a163bc3e.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/1aee0dd747c4f70fc70c83cace2c0024.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/052af333a3e86443a68f179df0d780db.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/f60390d2ab8d7716571ee34b14a768f7.jpg'
					}],
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/18ab14b69c87f97f6bd655e014199679.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/88e7c0bc2e8f3c03ed387da317981f7b.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/83753e4d9abd5c953a8275221b51355a.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/ff971685622440c2065f41b3f06eb6a1.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/dff5b623aef50047f92ef9d23d2ebba5.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/851b43c011f063155c40efcc47d88d9b.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/021c9ed4a5849281d9c6d6a734150260.jpg'
					}],
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/15d4f12b75789a7ed49cd9617a5f5db5.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/1d688ee260a4dd70c37dd392a165ad21.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/f59d9114588f62588690f170896b522a.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/c3c5d5ee8e9c1725ba0c01d3905f1bf6.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/e1086aaf8ea371aaad942579d0570729.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/43da2548c3ea27775ab4015eae9fae95.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/8b08ba3d85b5424df1fb12a986ec3e45.jpg'
					}],
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/228b427909f89d8e29e22cc5a573ed93.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/a51a7e911acca3238e59ffc30dc0a35d.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/0a284e4e202e5a08fe66b6fbb1d4a142.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/25d583a2beca9618c5b71529ab6b92d8.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/3c2c3fe7e5f046118426b13193ac3b61.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/1fd15e9e07bf4a11386c9d1941f4bbdb.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/2d3c5b06d61c2f7a34ec168e8a8eafff.jpg'
					}],
					[{ //轮播图
						id: 0,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/2128a982891fd864f897bf7ab1db1272.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/b75626ef8b2f82ddede61cd8984715c5.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/52e5b81c3bd21ff3f9dab1e734ab967e.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/05a64edcfe2473fe6ad5d668463cbeb4.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/e5e91c299569a20ed6d5f1bcf0ac765c.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/1a4c8d1f48eb814ca4ce6baf751ec426.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/1aa75780c261a4ad040cdd2111432b9e.jpg'
					}],
				],

				images: [], //三本书
				moreImages: [],
				categoryId: 1,
				categoryName: "玄幻",
				total: 6,
				number: 0,

			}
		},

		methods: {
			tosearch() {
				uni.navigateTo({
					url: "../search/search",
					animationType: 'slide-in-right',
					animationDuration: 200,
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},

			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},

			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},

			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},

			//拿到页面加载的书
			async getbooks() {
				var lists = this.moreImages;
				// console.log(this.item)
				this.page++
				const bookLists = await BookList(this.item, this.page);
				// console.log(bookLists)
				if (bookLists === null) {
					this.page--;
					return;
				}
				const itemn = bookLists.items;
				itemn.forEach((item, index) => {
						lists.push(item)
				}),

				this.moreImages = lists;
				this.total += bookLists.items.length
				// console.log(bookLists.total)
				if (this.total === bookLists.total) {
					this.total = 6;
					uni.showToast({
						title: "客官,轻一点,已经到底了呢",
						icon: "none"
					});
					return
				}
				// console.log(this.total)
			},

			gotoDetali(item) {
				// console.log(item)
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

			async getCategory() { //获取分类
				this.fenlei=[]
				const category = await CategoryList();
				category.forEach((item, index) => {
					this.fenlei.push(item)
				})
				this.fenlei.push("")
			},

			async change(itemm, itemmmmmmm) {
				
				this.swiperList1 = []
				const sss = this.swiperList[itemm - 1]
				sss.forEach((item, index) => {
					// console.log(item)
					this.swiperList1.push(item)
				})
				this.categoryId = itemm;
				this.page = 1;
				// console.log(itemmmmmmm)
				this.categoryName = itemmmmmmm
				this.item = itemm;
				const bookList = await BookList(this.item);
				this.moreImages = [];
				const items = bookList.items;
				items.forEach((item, index) => {
					// console.log(item);
					this.moreImages.push(item)
				})

				const cidAndHot = await CidAndHot({ //四个东西
					cid: itemm,
					rows: 4
				})
				this.oneBook = cidAndHot[0]//获取本期主打
				this.images = [];
				for (var i = 1; i < cidAndHot.length; i++) {
					this.images.push(cidAndHot[i])
				}
			}
		},

		onLoad(option) {
			console.log(this.number)
			if (this.number === 0) {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
			}
		},

		onShow() {
			this.getCategory()
			this.change(1, "玄幻")
			// if(this.images.length >0 && this.oneBook.id !== 0 &&this.moreImages.length >0 ){
			if(this.moreImages){
				uni.hideLoading();
				this.number = 1
			}
		},
		// 上拉加载
		onReachBottom() {
			this.getbooks()
		},
	}
</script>

<style>
	.yse {
		color: #0081ff;
		border-bottom: 2rpx solid #0081ff;
	}

	.fenlei {
		width: 100%;
		position: fixed;
		z-index: 500;
		background-color: #F2F6FC;
	}

	.fenlei-heard {
		display: flex;
		flex-direction: row;
		font-size: 20rpx;
		width: 98%;
		margin-left: 1%;
	}

	scroll-view ::-webkit-scrollbar {
		/* scroll-view 滚动条消失 */
		width: 0;
		height: 0;
		background-color: transparent;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		background-color: #F2F6FC;
		/* box-shadow: 5rpx 2rpx 20rpx #CCCCCC; */
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 17%;
		line-height: 80rpx;
		text-align: center;
		font-size: 36rpx;
	}

	/* 	uni-swiper .uni-swiper-dots-horizontal {
		left: 50% !important;
		bottom: 10px !important;
		text-align: center !important;
		white-space: nowrap;
		-webkit-transform: translate(-50%);
		transform: translate(-50%);
		top: 180rpx;
	}
 */
	.bgc {
		width: 20%;
		position: fixed;
		height: 80rpx;
		text-align: center;
		line-height: 60rpx;
		margin-left: 83%;
		background-color: #F2F6FC;

	}

	.images {
		background-image: url(http://qidian.qpic.cn/qidian_common/349573/dfb625969ded264f6c8c959d4cc40d63/0);
		height: 300rpx;
		border-radius: 0.5em;
	}

	.bgc-ch1 {
		width: 70%;
		margin-left: 10%;
		height: 60rpx;
		margin-top: 10rpx;
		font-size: 36rpx;
	}

	.body {
		padding-top: 10%;
	}

	.current-ch1 {
		margin-bottom: 4%;
		font-size: 36rpx;
		font-weight: 900;
	}

	.body-ch2-ch1 {
		width: 90%;
		margin-left: 5%;
		/* height: 200rpx; */
	}

	.picture {
		/* background-image: url(../../static/bookimages/150.jpg); */
		height: 300rpx;
		width: 30%;
		display: inline-block;
		border-radius: 0.3em;
	}

	.current-ch2 {
		display: flex;
	}

	.current-ch2-picture {
		width: 65%;
		margin-left: 5%;
		word-wrap: break-word;
	}

	.current-ch2-picture-ch {
		height: 150rpx;
		display: block;
		font-size: 30rpx;
	}

	.current-ch2-picture-ch-title {
		font-size: 30rpx;
		font-weight: 600;
	}

	.current-ch2-picture-ch-context {
		font-size: 26rpx;
		height: 150rpx;
	}

	.current-ch2-picture-ch-foot {
		margin-top: 12%;
	}

	.current-ch3 {
		margin-top: 5%;

	}

	.current-three {
		display: flex;
		flex-direction: row;
		margin-left: -6%;
	}

	.current-three-item {
		margin-left: 5%;
		width: 100%;
		/* height: 25%; */
	}

	.item-picture {
		background-image: url(../../static/bookimages/150.jpg);
		border-radius: 0.3em;
		width: 202rpx;
		height: 300rpx;
	}

	.picture-font {
		padding-top: 5%;
		font-size: 26rpx;
		width: 80%;
	}

	.body-ch3 {
		margin-top: 10%;
	}

	.body-ch3-ch1 {
		width: 90%;
		margin-left: 5%;
	}

	.more {
		display: flex;
		flex-direction: row;
	}

	.more-books {
		margin-top: -1%;
		margin-bottom: 10%;
	}

	.morebook-ch1 {
		width: 50%;
		font-size: 36rpx;
		font-weight: 900;
	}

	.morebook-ch2 {
		font-size: 30rpx;
		margin-left: 50%;
		color: #AAAAAA;
		width: 50%;
	}

	.more-books-images {
		margin-left: -6%;
	}

	.more-books-item {
		display: inline-block;
		margin-left: 5%;
		margin-top: 4%;
		height: 360rpx;
		width: 202rpx;
		vertical-align: middle;
		/* padding-left: 2%; */
	}

	.more-books-item-images {
		background-image: url(../../static/bookimages/150.jpg);
		width: 202rpx;
		height: 300rpx;
		border-radius: 0.3em;
	}

	.more-books-item-front {
		font-size: 26rpx;
		margin-top: 3%;
		width: 100%;
	}


	.none {
		display: none;
	}

	.block {
		display: block;
	}
</style>
