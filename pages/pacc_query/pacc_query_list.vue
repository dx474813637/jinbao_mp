<template>
	<view class="w">
		<u-sticky>
			<view class="select-w bg-white u-p-20 u-border-bottom">
				<u-input
					type="select"
					border
					:value="statusStr" 
					placeholder="请选择" 
					@click="show = true"
					></u-input> 
			</view>
		</u-sticky>
		
		<u-select 
			v-model="show"  
			:list="tabs_list"  
			@confirm="confirm"
		></u-select> 
		<view class="list u-p-20">
			<view 
				class="item u-m-b-20 uni-shadow-base"
				v-for="item in list"
				:key="item.id"
				>
				<CardPaccQuery 
					:origin="item"
					@detailClick="detailClick"
				></CardPaccQuery>
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
				tabs_list: [
					{ label: '全部', value: '' },
					{ label: '授信申请中', value: '1' },
					{ label: '授信已递交', value: '2' },
					{ label: '授信签约取消中', value: '3' },
					{ label: '授信失败', value: '4' },
					{ label: '授信通过，签约中', value: '5' },
					{ label: '授信通过，贷款企业已签约', value: '6' },
					{ label: '授信通过，签约通过', value: '7' },
					{ label: '授信通过，贷款账户已激活', value: '8' },
				],
				list: [],
				status: '',
				p: 1,
				loadstatus: 'loadmore'
			};
		},
		async onLoad() {
			this.refreshData()
		},
		computed: {
			statusStr() {
				return this.tabs_list[this.tabs_list.findIndex(ele => ele.value == this.status)].label
			},
		},
		onReachBottom() {
			this.scrolltolower()
		},
		methods: { 
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
