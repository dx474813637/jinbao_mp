<template>
	<view class="w">  
		<view class="u-search-box bg-white u-p-10 u-p-l-20 u-p-r-20">
			<u-search  
				v-model="keywords" 
				:show-action="false" 
				action-text="搜索" 
				:animation="true"
				@search="handleSearch"
			></u-search>
		</view>
		<view class="list u-p-20">
			<view 
				class="item u-m-b-20 uni-shadow-base"
				v-for="item in list"
				:key="item.id"
				>
				<CardShopCell :list="item" @gotoIndex="gotoIndex"></CardShopCell>
			</view>
			<u-loadmore :status="loadstatus" />
		</view>
		<nav-bar :index="2" :tabbar="true" ></nav-bar>
	</view>
</template>

<script>
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	export default {
		mixins: [mixCheckLogin],
		data() {
			return {
				show: false, 
				list: [],
				status: '',
				p: 1,
				loadstatus: 'loadmore',
				keywords: ''
			};
		},
		async onLoad(options) {
			if(options.hasOwnProperty('keywords')) {
				this.keywords = options.keywords
			}
			this.refreshData()
		}, 
		onReachBottom() {
			this.scrolltolower()
		},
		methods: { 
			handleSearch() {
				uni.showLoading()
				this.initData()
				this.getData()
			},
			gotoIndex({data}) {
				uni.reLaunch({
					url: `/pages/prodList/prodList2?id=${data.id}`,
				})
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
				const res = await this.$http.get('shop_list', {params: {
					p: this.curP,
					terms: this.keywords,
				}})
				if(res.data.code == 1) {
					uni.setNavigationBarTitle({
						title: res.data.title
					});
					this.list = [...this.list, ...res.data.list]
					if(this.curP >= +res.data.pages) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
				}
			},
			confirm(e) { 
				this.status = e[0].value
				this.refreshData()
			},
			async refreshData() {
				this.initData()
				uni.showLoading()
				await this.getData()
			},
			initData() {
				this.list = []
				this.loadstatus = 'loadmore'
				this.curP = 1
			},
			paccClick() {
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.w {
		padding-bottom: 60px;
	}

</style>
