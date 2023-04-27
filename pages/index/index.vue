<template>
	<view>
		<u-sticky>
			<view class="u-p-20 bg-white">
				<view class="search-w u-p-5 u-p-r-8" :style="{
					border: `1rpx solid #bbb`
				}">
					<u-search placeholder="请输入想要搜索的商品1" 
						v-model="keyword" 
						bgColor="transparent" 
						shape="round" 
						:actionStyle="{
							borderRadius: '20px',
							background: homelist.bgcolor,
							color: homelist.frontcolor,
							padding: '6px 14px',
							width: 'auto', 
						}"
						@search="search()"
						></u-search>
				</view>
			</view>
		</u-sticky>
		
		<view class="u-p-l-20 u-p-r-20 u-p-b-30">
			<view class="swiper-w u-p-t-20" v-if="homelist.swiper.length > 0">
				<u-swiper :list="homelist.swiper" name="img" @change="e => current = e.current" @click="swiperClick" bgColor="transparent">
					<!-- <view slot="indicator" class="indicator">
						<view class="indicator__dot" v-for="(item, index) in homelist.swiper" :key="index"
							:class="[index === current && 'indicator__dot--active']">
						</view>
					</view> -->
				</u-swiper>
			</view>
			<view class="nav-rows u-p-t-20" v-if="homelist.memu.length > 0">
				<view class="u-flex u-flex-items-center u-flex-between u-p-30 bg-white u-radius-5">
					<view class="item u-flex u-flex-column u-flex-items-center" v-for="(item,index) in homelist.memu" :key="index"
						@click="navTo(item)">
						<view class="u-m-b-10">
							<u-image :src="item.img" width="50px" height="50px"></u-image>
						</view>
						<view class="u-line-1" v-if="item.name">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<view class="nav-rows u-p-t-20" v-if="homelist.ad2.length > 0">
				<view class="img-rows2 u-flex u-flex-items-start u-flex-wrap ">
					<view class="item "
						v-for="(item, index) in homelist.ad2"
						:key="index"
						@click="navTo(item)"
						>
						<u-image :src="item.img" width="100%" mode="widthFix"
							bgColor="transparent"></u-image>
					</view> 
				</view>
			</view>
			<view class="nav-rows u-p-t-20" v-if="homelist.ad1.length > 0">
				<view class="img-rows1 u-flex u-flex-items-start u-flex-wrap ">
					<view class="item"
						v-for="(item, index) in homelist.ad1"
						:key="index"
						@click="navTo(item)"
						>
						<u-image :src="item.img" width="100%" mode="widthFix"
							bgColor="transparent"></u-image>
					</view> 
				</view>
			</view>
		</view>
		<!-- <u-sticky offsetTop="116">
			<view class="tabs-w bg-white">
				<u-tabs 
					:list="list1" 
					:current="current"
					@change="tabsclick"
				></u-tabs>
			</view>
		</u-sticky> -->
		<view class="product-list-w u-p-20">
			<view class="u-flex u-flex-wrap product-list">
				<view class="item" v-for="item in list_product" :key="item.id" @click="handlePathDetail(item)">
					<CardProductCol :list="item"></CardProductCol>
				</view>
			</view>
		</view>



		<nav-bar :index="memu_id" :tabbar="true" :name="homelist.title"></nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				homelist: {
					ad1: [],
					ad2: [],
					memu: [],
					swiper: [],
					frontcolor: '#fff',
					bgcolor: '#fb3a3a'
				},
				memu_id: 1,
				keyword: '',
				current: 0,
				list1: [{
					name: '关注',
				}, {
					name: '推荐',
				}, {
					name: '电影'
				}, {
					name: '科技'
				}, {
					name: '音乐'
				}, {
					name: '美食'
				}, {
					name: '文化'
				}, {
					name: '财经'
				}, {
					name: '手工'
				}], 
				list_product: []
			};
		},
		onShareTimeline() {
			return {
				title: this.homelist.share_title,
				query: `login=${uni.getStorageSync('sharelogin')}`,
				imageUrl: this.homelist.imageurl
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.homelist.share_title,
				path: '/' + this.$scope.route + '?login=' + uni.getStorageSync('sharelogin'),
				imageUrl: this.homelist.imageurl
			};
		},
		onLoad(options) {
			console.log(options)
			options.memu_id ? this.memu_id = options.memu_id : 1;
			options.login ? uni.setStorageSync('sharelogin', options.login) : {};
			this.homeUrl();
			this.getProductData()
		},
		onshow(options) {

		},
		methods: {
			homeUrl() {
				this.$http
					.get('home', {

					})
					.then(res => {
						if (res.data.code == 1) {

							this.homelist = {...this.homelist, ...res.data.list};
							uni.setStorageSync('home', {
								title: res.data.list.title,
								imageurl: res.data.list.imageurl
							})
							uni.setNavigationBarTitle({
								title: this.homelist.title
							});
							uni.setNavigationBarColor({
								frontColor: this.homelist.frontcolor,
								backgroundColor: this.homelist.bgcolor,
								animation: {
									duration: 400,
									timingFunc: 'easeIn'
								}
							});
						}
					});
			},
			navTo(item) {  
				uni.redirectTo({
					url: item.url
				});
			},
			tabsclick(item) {
				this.current = item 
			},
			search() {
				uni.redirectTo({
					url: `/pages/prodList/prodList?term=${this.keyword}`
				})
			},
			async getProductData(search) {
				this.loadStatus = 'loading'
				let list = await this.$http.get('/product_list', {
					params: {
						p: 1
					}
				}) 
				if(list.data.code == 1) {
					this.list_product = [...this.list_product, ...list.data.list.list_products]
					// if (this.p == list.data.list.pw_page_total) {
					// 	this.loadStatus = 'nomore'
					// 	this.endFlag = 'true'
					// } else this.loadStatus = 'loadmore'
					
				} 
			},
			handlePathDetail(obj) {
				uni.navigateTo({
					url: `/pages/prodDetail/prodDetail?id=${obj.id}`,
				})
			},
			goto(data) {
				uni.navigateTo({
					url: data.url,
				})
			},
			swiperClick(index) {
				if(!this.homelist.swiper[index]?.url) return
				this.navTo(this.homelist.swiper[index]) 
			}
		}
	};
</script>

<style lang="scss" scoped>
	.search-w {
		border-radius: 20px;
	}
	.img-rows2 .item{
		flex: 0 0 49%;
		margin-right: 2%;
		&:nth-of-type(2n) {
			margin-right: 0;
		}
	}
	.img-rows1 .item{
		flex: 0 0 100%; 
	}
	.product-list {
		.item {
			flex: 0 0 49%;
			overflow: hidden;
			margin-left: 2%;
			&:nth-of-type(2n+1) {
				margin-left: 0
			}
		}
	}
	.indicator {
		@include flex(row);
		justify-content: center;

		&__dot {
			height: 6px;
			width: 6px;
			border-radius: 100px;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 5px;
			transition: background-color 0.3s;

			&--active {
				background-color: #ffffff;
			}
		}
	}
</style>