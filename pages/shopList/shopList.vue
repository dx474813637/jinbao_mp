<template>
	<view class="w">  
		<view class="list u-p-20">
			<view 
				class="item u-m-b-20 uni-shadow-base"
				v-for="item in 10"
				:key="item"
				>
				<CardShopCell :list="item" @gotoIndex="gotoIndex"></CardShopCell>
			</view>
			<u-loadmore :status="loadstatus" />
		</view>
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
				loadstatus: 'loadmore'
			};
		},
		async onLoad() {
			this.refreshData()
		}, 
		onReachBottom() {
			this.scrolltolower()
		},
		methods: { 
			gotoIndex({data}) {
				uni.reLaunch({
					url: `pages/prodList/prodList2`,
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
				const res = await this.$http.get('pacc_query_list', {params: {
					p: this.curP,
					status: this.status,
				}})
				if(res.data.code == 1) {
					this.list = [...this.list, ...res.data.list.list]
					if(this.curP >= +res.data.list.pw_page_total) {
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
			detailClick({data}) {
				uni.navigateTo({
					url:`/pages/pacc_query/pacc_query?id=${data.id}`
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
