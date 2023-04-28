<template>
	<view>
		<u-sticky>
			<view class="u-p-20 bg-white">
				<view class="search-w u-p-5 u-p-r-8" :style="{
					border: `1rpx solid #bbb`
				}">
					<u-search 
						:placeholder="search_name" 
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
				</u-swiper>
			</view> 
		</view> 
		<view class="product-list-w u-p-20">
			<view class="box-title u-flex u-flex-between u-flex-items-center u-m-b-20 u-p-l-20 u-p-r-20">
				<view class="item text-bold text-black">
					{{shop_name}}
				</view>
				<view class="item text-light u-font-28" @click="$u.route('/pages/shopList/shopList')">
					更多
				</view>
			</view>
			<view class="product-list">
				<view class="item u-m-b-20 uni-shadow-base" v-for="item in list" :key="item.id" >
					<CardShopCell :list="item" @gotoIndex="gotoIndex"></CardShopCell>
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
				list: [],
				shop_name: '',
				search_name: ''
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
		},
		onshow(options) {

		},
		methods: {
			homeUrl() {
				this.$http
					.get('home')
					.then(res => {
						if (res.data.code == 1) {
							this.list = res.data.shop_list
							this.shop_name = res.data.shop_name
							this.search_name = res.data.search_name
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
					url: `/pages/shopList/shopList?keywords=${this.keyword}`
				})
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
			gotoIndex({data}) {
				uni.reLaunch({
					url: `/pages/prodList/prodList2?id=${data.id}`,
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