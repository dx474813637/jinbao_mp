<template>
	<view class="u-wrap">
		<view class="item " > 
				<!-- <view class="mask" @click="maskClick"></view> -->
				<view class="u-radius-8 bg-white u-p-10 u-p-l-30 u-p-r-30" style=" position: relative;
				z-index: 30;" >
					<view class="u-flex u-flex-items-center u-flex-between">
						<view class="item u-flex u-flex-items-center u-flex-1" style="overflow: hidden;">
							<u-image 
								:src="company.picmy"
								v-if="company.picmy"
								width="35px"
								height="35px"
								borderRadius="4"
							></u-image>
							<view class="item text-black u-line-1 u-font-32 text-bold u-m-l-10">{{company.name}}</view>
						</view> 
					</view>
					<!-- <view v-if="company.intro" class="info u-p-t-10 u-p-b-10 u-font-26" style="font-weight: 300;overflow: hidden;">
						<u-read-more 
						ref="uReadMore" 
						showHeight="72" 
						textIndent="0"
						closeText="展开"
						toggle  
						fontSize="24"
						:shadowStyle="{
							backgroundImage: 'none',
							paddingTop: '0',
							marginTop: '20rpx',
							paddingBottom: '0'
						}"
						@open="class_toggle = true"
						@close="class_toggle = false"
						>
							<view style="line-height: 18px; font-size: 13px;">
								<rich-text :nodes="company.intro" ></rich-text>
							</view>
							
						</u-read-more>
					</view> -->
				</view> 
			
		</view>
		<view class="u-search-box bg-white u-flex u-flex-items-center">
			<view class=" u-flex-1">
				<u-search
					v-model="term" 
					:show-action="false" 
					action-text="搜索" 
					:animation="true"
					@search="handleSearch"
				></u-search>
			</view>
			<view class="u-flex u-flex-items-center u-m-l-20" @click="filterFlag = true">
				<i class="custom-icon-filter2 custom-icon u-font-38"></i>
				<view class="u-font-32 text-base u-m-l-10">筛选</view>
			</view>
		</view>
		<view class="u-menu-wrap">
			<!-- <scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item" :class="{'u-tab-item-active': current==index, 'item-left': item.name != '全部'}"
				 :data-current="index" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			 -->
			<scroll-view scroll-y class="right-box" @scrolltolower="handlescrolltolower">
				<view class="list">
					<list
						:list="dataList"
						:loadStatus="loadStatus"
						listType="grid"
						emptyText="列表为空"
						emptyMode="list"
						@goto="handlePathDetail"
					>
						<template v-slot:grid="{item}">
							<CardProductCol :list="item"></CardProductCol>
						</template>
					</list>
				</view>
				
			</scroll-view>
		</view>
		<u-popup v-model="filterFlag" mode="bottom" height="80%" >
			<view class="filter-box">
				<scroll-view class="box-content" scroll-y>
					<view class="item-filter" v-for="(item, index) in filter_data" :key="item.id">
						<view class="u-p-b-14">
							<view class="filter-header u-flex u-row-between">
								<view class="item-left">
									<view class="filter-title">{{item.name}}</view>
								</view>
								<view class="item-right">
									<view class="u-font-24" @click="handleFilterMore(index, item.more)">
										<text class="u-p-r-6">{{item.more ? '收起' : '展开'}}</text>
										<u-icon size="22" :name="item.more ? 'minus' : 'plus'" ></u-icon>
									</view>
								</view>
							</view>
							<view class="filter-wrap u-flex u-flex-wrap" :class="{
								moreActive: item.more
							}">
								<view 
									class="filter-label u-line-1"  
									v-for="ele in item.children"
									:key="ele.id"
									@click="handleSelectLabel(ele)"
								>{{ele.name}}</view>
							</view>
						</view>
						
					</view>
				</scroll-view>
				<!-- <view class="box-bottom u-flex u-row-around">
					<view class="item">
						<u-button type="error" plain shape="circle" @click="filterReset">重置</u-button>
					</view>
					<view class="item">
						<u-button type="primary" shape="circle" @click="filterConfirm">确定（{{filter_select2.length}}）</u-button>
					</view>
				</view> -->
			</view>
		</u-popup>
		<nav-bar :index="-1" :tabbar="true" ></nav-bar>
	</view>
</template>

<script>
	// import classifyData from "@/common/classify.data.js";
	import { List } from '@/components/list/list';
	import { CardProductCell } from '@/components/CardProductCell/CardProductCell.vue'
	
	import mixShareInfo from '@/utils/mixShareInfo.js'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				id: '',
				tabbar: [
					{
						name: '全部',
						id: '0'
					},
				],
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				dataList: [],
				loadStatus: 'loadmore',
				p: 1,
				term: '',
				tags: '',
				shareOptions: {
					pageName: '产品列表'
				},
				content: ``,
				company: {},
				class_toggle: false,
				filterFlag: false,
				filter_data: [],
				filter_select1: [],
				filter_select2: [],
			}
		},
		onShareTimeline(){
			return{
				title: this.shareOptions.pageName,
				query:{}
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.shareOptions.pageName,
				path: '/' + this.$scope.route
			};
		},
		async onLoad(options) {
			 
			 if(options && options.tags) {
			 	this.tags = options.tags
			 }
			if(options && options.id) {
				this.id = options.id
			}
			if(options && options.term || options.keywords) {
				this.term = options.term || options.keywords
			}
			await this.getInitData()
			uni.showLoading({
				title: '加载中'
			})
			await this.getListData()
			uni.hideLoading()
		},
		components: {
			List,
			CardProductCell
		},
		// watch: { 
		// 	async filter_select1(newV) {
		// 		uni.showLoading({
		// 			title: '正在加载...'
		// 		})
		// 		this.initList();
		// 		this.tags = newV.join(',') 
		// 		await this.getListData()
		// 	}
		// },
		methods: {
			initList() {
				this.dataList = []
				this.p = 1
				this.tags = ''
				this.term = '' 
				this.loadStatus = 'loadmore'
				 
			},
			async getInitData() {
				let res = await this.$http.get('/product_list', {params: {
					p: 1,
					term: this.term,
					tags: this.tags,
					id: this.id,
				}})
				this.company = res.data.company
				// this.$nextTick(() => {
				// 	this.$refs.uReadMore.init();
				// })
				// this.tabbar = [...this.tabbar, ...res.data.tags]
				this.initList();
				
				this.filter_data = res.data.tags.map(ele => { 
					let origin = ele.children || []
					let children = [{name: ele.name, id: ele.id}, ...origin]
					return {...ele, more: true, children}
				});
				// let curIndex = 
			},
			handleFilterMore(index, flag) {
				console.log(flag)
				this.filter_data[index].more = !flag
			},
			async getListData(search) { 
				if(search) {
					this.p = 1;
					this.dataList = []
				}
				if(this.loadStatus == 'loading') return
				this.loadStatus = 'loading'
				let res = await this.$http.get('/product_list', {params: {
					p: this.p,
					term: this.term,
					tags: this.tags,
					id: this.id
				}})
				this.shareOptions.pageName = res.data.share_title
				this.dataList = [...this.dataList, ...res.data.list.list_products]
				if(this.p == res.data.list.pw_page_total) { 
					this.loadStatus = 'nomore'
				}else {
					this.loadStatus = 'loadmore'
				}
			
			},
			async handlescrolltolower() { 
				if(this.loadStatus != 'loadmore') return
				this.p ++
				await this.getListData()
				
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if(index == this.current) return ;
				uni.hideLoading()
				this.current = index;
				this.term = ''
				this.tags = this.tabbar[index].name == '全部' ? '' :this.tabbar[index].name
				if(this.dataList[index].data.length == 0) {
					uni.showLoading({
						title: '加载中'
					})
					await this.getListData()
					uni.hideLoading()
				}
				
				// 如果为0，意味着尚未初始化
				if(this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			handleSearch() { 
				this.getListData(true)
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({size: true},res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if(!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return ;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			
			handlePathDetail(obj) {
				// console.log(obj)
				uni.navigateTo({
					url: `/pages/prodDetail/prodDetail?id=${obj.id}`,
				})
			},
			maskClick() {
				this.class_toggle = false
				this.$nextTick(() => {
					this.$refs.uReadMore.init();
				})
			},
			handleSelectLabel(item) {
				// let i = this.filter_select2.indexOf(item.id);
				// if(i == -1) {
				// 	this.filter_select2.push(item.name)
				// }else {
				// 	this.filter_select2.splice(i, 1)
				// }
				this.filterFlag = false
				uni.showLoading({
					title: '加载中'
				})
				this.initList(); 
				this.tags = item.name.toString()
				this.getListData()
			},
			filterConfirm() {
				this.filter_select1 = this.filter_select2;
				this.term = ""
				uni.setNavigationBarTitle({
					title: '产品列表'
				})
				this.handleChangeFilterBox()
			},
			handleChangeFilterBox() {
				this.filterFlag = !this.filterFlag;
			},
			filterReset() {
				this.filter_select2 = []
			},
		}
	}
</script>

<style lang="scss" scoped>
	.filter-box {
		background-color: #fff;
		height: 100%;
		border-radius: 40rpx;
		overflow: hidden;
		.box-content {
			height: calc(100% - 120rpx);
			background-color: #f8f8f8;
			padding: 20rpx 30rpx 0;
			.item-filter {
				background-color: #fff;
				margin-bottom: 20rpx;
				border-radius: 20rpx;
				box-shadow: 0 0 10rpx rgba(90,90,90,0.1);
				.filter-header {
					border-bottom: 1rpx solid #eee;
					height: 80rpx;
					padding: 0 30rpx;
					.item-left {
						.filter-title {
							font-weight: bold;
						}
					}
					.item-right {
						color: #999;
					}
				}
				.filter-wrap {
					padding-left: 20rpx;
					padding-right: 20rpx;
					height: 85rpx;
					overflow: hidden;
					margin-top: 6rpx;
					&.moreActive {
						padding-bottom: 20rpx;
						height: auto;
						overflow: auto;
					}
					.filter-label {
						width: 47.5%;
						flex: 0 0 47.5%;
						margin-right: 5%;
						margin-top: 12rpx;
						background-color: #fff;
						border-radius: 8rpx;
						line-height: 60rpx;
						text-align: center;
						border: 1rpx solid #eee;
						color: #666;
						background-color: #fdfdfd;
						&:nth-of-type(2n) {
							margin-right: 0;
						}
						&.active {
							color: #007aff;
							border-color: #aed5ff;
							background-color:#f6faff;
						}
					}
				}
			}
		}
		.box-bottom {
			height: 120rpx;
			background-color: #fff;
			border-top: 1rpx solid #e7e7e7;
			.item {
				width: 40%;
			}
		}
	}
	.mask {
		display: none;
	}
	.isOpen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 200;
		background-color: rgba(0,0,0,.3);
		
		.mask {
			position: absolute;
			display: block;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 20rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		flex: 0 0 160rpx;
		width: 160rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 120rpx;
		// background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 40rpx;
		padding: 0 10rpx;
		border-top: 1rpx solid #f8f8f8;
		transition: all .3s;
		&.item-left {
			// justify-content: flex-start;
		}
	} 
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 28rpx;
		font-weight: 600;
		background: #e6ecff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 2px solid $u-type-primary;
		height: 100%;
		left: 0;
		top: 0;
	}

	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		flex: 1;
		// width: calc(100% - 160rpx);
		background-color: #f5f5f5;
		.list {
			padding: 10rpx;
			width: 100%;
		}
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
