<template>
	<view>
		<u-popup 
			v-model="popShow" 
			mode="bottom"  
			@close="close"  
			borderRadius="25"
			safeAreaInsetBottom
			bgColor="#f8f8f8"
		>
			<view class="wrapper" >
				<view class="header u-p-18">
					<view class="title-bar u-p-20 u-flex u-flex-between u-flex-items-center u-font-30">
						<view class="item ">
							<text class="u-info" @click="close">取消</text>
						</view>
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-34 text-base">搜索银行关键词</text>
						</view>
						<view class="item u-text-right">
							 
						</view>
					</view>
					<view class="u-flex u-flex-items-center" > 
						<view class="search-bar u-flex-1">
							<u-search 
								placeholder="建议多个关键字用空格分隔搜索，如：平安 杭州" 
								v-model="keyword" 
								bgColor="#f8f8f8"
								@search="handleSearch"
							></u-search>
						</view>
					</view>
					
				</view>
				<view class="main" >
					<template v-if="loading">
						<view class="load-w u-flex u-flex-items-center u-flex-center" >
							<u-loading 
								mode="circle" 
								size="36" 
								text="获取最新数据中..." 
								color="#eee" 
								inactiveColor="#9cb6ef" 
								vertical
								></u-loading>
						</view>
					</template>
					<template v-else >
						<scroll-view
							style="height: 100%;"
							enableBackToTop
							scroll-y
							@scrolltolower="scrolltolower" 
							>
							<view
								v-for="(item, index) in list"
								:key="item.bank_no">
								<view class="u-p-10">
									<view class="u-p-20 u-flex u-flex-items-center"
										:style="{
											backgroundColor: '#eaeaea',
											border: '1rpx solid #dedede',
											borderRadius: '10rpx'
										}"
										@click="selectLabel(item)"
									>
										<view class="u-font-32"
											:style="{
												color: '#333'
											}"
										>{{item.bank_name}}</view> 
									</view>
								</view>
							</view>
							<template name="dataStatus">
								<template v-if="list.length == 0">
									<view class="u-p-30 u-flex u-flex-center">
										<u-image :src="empty" width="200px" mode="widthFix"></u-image>
									</view> 
								</template>
								<template v-else>
									<u-loadmore
										:status="loadstatus"
									/>
								</template>
							</template>
						</scroll-view>
					</template> 
				</view> 
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name:"menusPopupBank",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			theme: {
				type: String,
				default: 'white'
			},
		},
		async mounted() {},
		data() {
			return {
				keyword: '',
				list: [],
				curP: 1,
				loadstatus: 'nomore',
				loading: false,
			};
		},
		watch: {
			
		},
		computed: {
			...mapState({
				empty: state => state.empty,
			}), 
			popShow: {
				get() {
					return this.show
				},
				set(v) {
					if(!v) this.$emit('close') 
					
				}
			}
		},
		methods: { 
			initParamas() {
				this.curP = 1;
				this.list = [];
				this.loadstatus = 'loadmore'
			}, 
			close() {
				this.$emit('close') 
			},
			selectLabel(menu) {
				this.$emit('confirm', {...menu})
				this.popShow = false
			},  
			async handleSearch() {
				if(!this.keyword) return
				this.loading = true
				this.initParamas()
				uni.showLoading()
				await this.getData()
				this.loading = false
			},
			scrolltolower() {
				this.getMoreData()
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},
			async getData() { 
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$http.get('get_bank_name', {
					params: {
						term: this.keyword,
						p: this.curP
					}
				})
				if(res.data.code == 1) {
					this.list = [...this.list, ...res.data.list]
					if(res.data.list.length < 15) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
				}
			}
		}
	}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
	.load-w {
		width: 100%;
		height: 100%;
		background-color: rgba(255,255,255,.4);
	}
	.wrapper {
		width: 100%;
		border-radius: 30rpx 30rpx 0 0 ;
		overflow: hidden;
		background-color: #f8f8f8;
		color: #666;
		.header {
			background-color: #fff;
		}
		.main {
			background-color: #f8f8f8;
			height: 50vh;
			width: 100%;
			box-sizing: border-box;
			.item-card {
				width: 100%;
				box-sizing: border-box;
				.card-title {
					color: #666;
				}
			}
			.card-content {
				// background-color: #fff;
				border-radius: 10rpx;
				width: 100%;
				box-sizing: border-box;
				
			}
			.card-label {
				flex: 0 0 30%;
				margin-right: 4%;
				height: 30px;
				line-height: 30px;
				transition: all .3s;
				font-size: 14px;
				text-align: center;
				border-radius: 8rpx;
				position: relative;
				border: 1rpx solid #eee;
				&.rows {
					flex: 0 0 100%;
					margin-right: 0;
					text-align: left;
				}
				&.normal_white {
					border-color: #eee;
					color: #666;
				}
				&.normal_dark {
					border-color: #3a3352;
					color: #c8cfff;
				}
				&.active_white {
					border-color: #98c9ff;
					color: #007aff;
					background-color: #e6f2ff;
				}
				&.disabled_white {
					border-color: #c373ff !important;
					color: #7d3df7 !important;
					background-color: #ead9f7 !important;
				}
				&.active_dark {
					border-color: #025688;
					color: #00ffff;
					// background-color: #e6f2ff;
				}
				&.disabled_dark {
					border-color: #503f17 !important;
					color: #f7823d !important;
					// background-color: #ead9f7 !important;
				}
				&:nth-of-type(3n) {
					margin-right: 0;
				}
			}
		}
		.bottom {
			
		}
	}
</style>
