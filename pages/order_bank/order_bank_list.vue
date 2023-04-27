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
				<CardOrderBank 
					:origin="item"
					@detailClick="detailClick"
					@orderBtn="orderBtn"
				></CardOrderBank>
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
					{ label: '融资申请中', value: '1' },
					{ label: '流程暂停', value: '2' },
					{ label: '财务已拒绝', value: '3' },
					{ label: '放款机构已同意', value: '4' },
					{ label: '放款机构已拒绝', value: '5' },
					{ label: '提款成功', value: '6' },
					{ label: '提款失败', value: '7' }, 
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
				const res = await this.$http.get('order_bank_list', {params: {
					p: this.curP,
					rz_status: this.status,
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
			orderBtn({data}) { 
				uni.navigateTo({
					url:`/pages/orderDetail/orderDetail?id=${data.order_id}`
				})
			},
			detailClick({data}) {
				uni.navigateTo({
					url:`/pages/order_bank/order_bank?id=${data.id}`
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
