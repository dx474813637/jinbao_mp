<template>
	<view class="u-p-40" v-if="list.hasOwnProperty('id')"> 
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">融资ID</view>
			<view class="item text-base ">{{list.id}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">来源订单</view>
			<view class="item text-primary" 
				@click="$u.route(`/pages/orderDetail/orderDetail?id=${list.order_id}`)">
				{{list.order_id}}
				</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">卖家</view>
			<view class="item text-base ">{{list.sell_company}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">买家</view>
			<view class="item text-base ">{{list.buy_company}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">订单商品</view>
			<view class="item text-base">{{list.order.product_names}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">融资金额</view>
			<view class="item text-base">{{list.price}}元</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">放款银行</view>
			<view class="item text-primary" 
				@click="$u.route(`/pages/pacc_query/pacc_query?id=${list.bank_pacc.id}`)">
				{{list.bank_zxrz.bank_name}}
				</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">融资时间</view>
			<view class="item text-base">{{list.post_time}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">融资期限</view>
			<view class="item text-base">{{list.bank_pacc.credit_termMonth}}月</view>
		</view> 
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0 u-flex u-flex-items-center">
				<view>融资状态</view>
				<view class="u-m-l-10" @click="updateStatus">
					<u-icon name="shuaxin" custom-prefix="custom-icon" size="30" color="#007aff"></u-icon>
				</view>
			</view>
			<view class="item" :class="{
				'text-success': list.rz_status == 4 || list.rz_status == 6,
				'text-light2': list.rz_status == 1 || list.rz_status == 2,
				'text-error': list.rz_status == 3 || list.rz_status == 5 || list.rz_status == 7
			}">
				<view>{{list.rz_status | orderRzStatus2Str}}</view>
			</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">受托支付账户卡号</view>
			<view class="item text-base">{{list.bank_account.cardNo}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">受托支付账户开户行</view>
			<view class="item text-base">{{list.bank_account.subbranch}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.remark">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">备注</view>
			<view class="item text-base">{{list.remark}}</view>
		</view> 
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	export default {
		mixins: [mixCheckLogin],
		data() {
			return {
				pid: '',
				list: {}
			};
		},
		async onLoad(options) {
			if(options.hasOwnProperty('id')) {
				this.pid = options.id
			}
			this.refreshData()
		},
		methods: {
			showToast( params={} ) {
				this.$refs.uToast.show({
					position: 'bottom',
					title: '操作成功',
					type: 'success',
					...params
				})
			},
			async refreshData() {
				uni.showLoading()
				await this.getData()
			},
			async getData() {
				const res = await this.$http.get('order_bank_detail', {params: {id: this.pid}})
				if(res.data.code == 1) {
					this.list = res.data.list
				}
			},
			async updateStatus() {
				const res = await this.$http.get('order_bank_query', {params: {order_id: this.list.order_id}})
				if(res.data.code == 1) {
					this.showToast({title: res.data.msg})
					this.refreshData()
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
