<template>
	<view>
		<u-popup 
			v-model="popShow" 
			mode="bottom"  
			@close="close" 
			@open="open" 
			:overlayStyle="overlayStyle"
			borderRadius="25"
			safeAreaInsetBottom
			bgColor="#f8f8f8"
		>
			<view class="wrapper" >
				<view class="header u-p-18" >
					<view class="title-bar u-p-20 u-flex u-flex-between u-flex-items-center u-font-30">
						<view class="item ">
							<text class="u-info" @click="close">取消</text>
						</view>
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-34">开户行总行列表</text>
						</view>
						<view class="item"> 
						</view>
					</view>
					<view class="u-flex u-flex-items-center" > 
						<view class="search-bar u-flex-1">
							<u-search 
								placeholder="导航关键字" 
								v-model="keyword"
								:showAction="false"
								bgColor="#f8f8f8"
							></u-search>
						</view>
					</view>
					
				</view>
				<view class="main" >
					<template v-if="bankLoading">
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
					<template v-else>
						<scroll-view
							style="height: 100%;"
							enableBackToTop
							scroll-y
							@scrolltolower="scrolltolower" 
							>
							<template v-if="keyword">
								<template v-if="searchRes.length > 0">
									<view
										v-for="(ele, i) in searchRes"
										:key="ele.id" >
										<view class="u-p-10">
											<view class="u-p-20 u-flex u-flex-items-center u-radius-5"
												:style="{
													backgroundColor: '#fff', 
												}"
												@click="selectLabel(ele)"
											>
												
												<text>{{ele.name.slice(0, ele.pp[0])}}</text>
												<text class="text-error">{{ele.name.slice(ele.pp[0], ele.pp[0]+ele.pp[1])}}</text>
												<text>{{ele.name.slice(ele.pp[0]+ele.pp[1])}}</text> 
											</view>
										</view>
									</view>
									<!-- <view class="u-p-10">
										<view class="u-p-20 u-flex u-flex-items-center u-radius-5 "
											:style="{
												backgroundColor: '#fff', 
											}"
											v-for="(ele, i) in searchRes"
											:key="ele.id" 
											@click="selectLabel(ele)"
										>
											<text>{{ele.name.slice(0, ele.pp[0])}}</text>
											<text class="text-error">{{ele.name.slice(ele.pp[0], ele.pp[0]+ele.pp[1])}}</text>
											<text>{{ele.name.slice(ele.pp[0]+ele.pp[1])}}</text> 
										</view>
									</view> -->
								</template>
								<template v-else>
									<u-empty
										marginTop="40"
										mode="data"
										icon="http://cdn.uviewui.com/uview/empty/data.png"
										text="搜索无匹配项，可置空搜索栏列表查看"
									></u-empty>
								</template>
							</template>
							<template v-else>
								<view
									v-for="(item, index) in bankData"
									:key="item.id">
									<view class="u-p-10">
										<view class="u-p-20 u-flex u-flex-items-center u-radius-5"
											:style="{
												backgroundColor: '#fff', 
											}"
											@click="selectLabel(item)"
										>
											<view class="u-font-32">{{item.name}}</view> 
										</view>
									</view>
								</view>
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
		name:"menusPopup",
		props: {
			pan: {
				type: String,
				default: 's'
			},
			overlayStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			minNum: {
				type: Number,
				default: 0
			},
			maxNum: {
				type: Number,
				default: 999
			}, 
			show: {
				type: Boolean,
				default: false
			},
			isPPI: {
				type: Boolean,
				default: false
			},
			multiple: {
				type: Boolean,
				default: false
			},
			isMyProduct: {
				type: Boolean,
				default: false
			},
			isMyAllCpy: {
				type: Boolean,
				default: false
			},
			isMduCpy: {
				type: Boolean,
				default: false
			},
			showMode: {
				type: String,
				default: 'grid' //grid or list
			},
			mainkey: {
				type: String,
				default: 'id'
			},
			selectedList: {
				type: Array,
				defualt: () => []
			},
		},
		async mounted() {},
		data() {
			return {
				keyword: '',
				menusList2: [],
				searchRes: [],
				searchFocus: false,
				multipleList: [],
				loading: false
			};
		},
		watch: { 
			keyword:{
				handler() {
					uni.$u.debounce(this.searchMenus, 500)
				}
			}
		},
		computed: {
			...mapState({ 
				bankLoading: state => state.bankLoading,  
				bankData: state => state.bankData,  
			}),
			popShow: {
				get() {
					return this.show
				},
				set(v) {
					if(!v) this.$emit('close') 
					
				}
			}, 
		},
		methods: {      
			searchMenus() {
				this.searchRes = []
				let k = this.keyword.toUpperCase()
				let str = ''
				this.bankData.forEach(ele => { 
					str = ele.name.toUpperCase()
					let i = str.indexOf(k)
					if(i > -1) {
						ele.pp = [i, k.length]
						this.searchRes.push(ele)
					}
				})
				
			}, 
			async open() { 
			},
			close() {
				this.popShow = false 
			},
			selectLabel(menu) {
				this.$emit('confirm', {...menu})
				this.popShow = false
				 
			},  
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
