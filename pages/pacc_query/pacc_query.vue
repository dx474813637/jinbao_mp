<template>
	<view class="u-p-40 u-p-b-80"> 
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">授信ID</view>
			<view class="item text-base ">{{list.id}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">银行产品</view>
			<view class="item text-primary " @click="$u.route('/pages/query_product/query_product', {id: list.bank_zxrz.product_id})">{{list.bank_zxrz.name}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.amount">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">申请金额</view>
			<view class="item text-base ">{{list.amount}}元</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.credit_termMonth">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">申请期限</view>
			<view class="item text-base">{{list.credit_termMonth}}月</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.credit_amount">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">审批额度</view>
			<view class="item text-base">{{list.credit_amount}}元</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.credit_beginDate">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">开始日期</view>
			<view class="item text-base">{{list.credit_beginDate}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.credit_endDate">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">截止日期</view>
			<view class="item text-base">{{list.credit_endDate}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.credit_termMonth">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">授信期限</view>
			<view class="item text-base">{{list.credit_termMonth}}月</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.bank_zxrz && list.bank_zxrz.loan_term">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">贷款期限</view>
			<view class="item text-base">{{list.bank_zxrz.loan_term}}{{list.bank_zxrz.credit_mode | date2Str}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">申请人</view>
			<view class="item text-base">{{list.platform_person}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">发起时间</view>
			<view class="item text-base">{{list.ctime}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0 u-flex u-flex-items-center">
				<view>授信状态</view>
				<view class="u-m-l-10" @click="getPaccQuery" v-if="list.pacc_id">
					<u-icon name="shuaxin" custom-prefix="custom-icon" size="30" color="#007aff"></u-icon>
				</view>
			</view>
			<view class="item" :class="{
				'text-success': list.status == '8',
				'text-error': list.status == '4'
			}">
				<view>{{list.status | paccStatus2Str}}</view>
			</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.errorText">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">授信失败原因</view>
			<view class="item text-base">{{list.errorText}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.status == 8">
			<view class="item text-light u-m-r-20 u-flex-shrink-0 u-flex u-flex-items-center">
				<view>可用余额</view>
				<view class="u-m-l-10" @click="getMoney">
					<u-icon name="shuaxin" custom-prefix="custom-icon" size="30" color="#007aff"></u-icon>
				</view>
			</view>
			<view class="item text-error u-flex u-flex-items-center"> 
				<view class="u-m-r-20">
					<u-loading mode="circle" color="#007aff" :show="lastMoney.loading"></u-loading>
				</view>
				<view v-if="lastMoney.money == 'hide'">****</view>
				<view v-else>{{lastMoney.money}} 元</view>
				
			</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">备注</view>
			<view class="item text-base">{{list.remark}}</view>
		</view>
		<view class="u-m-b-30 u-font-32 u-p-t-30 u-p-b-30" v-if="list.status >= 5">
			<!-- <view class="item text-light u-m-b-10">待签约原始文件</view> -->
			<view class="item page-bg2 u-p-20 u-radius-10 u-m-b-20 " v-for="item in filesList" :key="item.id">
				<view class="u-p-8 u-font-30">
					<view class="item text-black">
						<text class=" u-p-r-20 pacc-file-status-tag " :class="{
							'text-success': item.signflows_state == 3,
							'text-light': item.signflows_state == 4, 
							'text-primary': item.signflows_state != 3 && item.signflows_state != 4, 
						}">{{item.signflows_state | paccFileStatus2Str}}</text>
						<text>{{item.name}}</text>
					</view>
				</view>
				<view class="u-p-8 u-font-30 u-flex u-flex-items-start ">
					
					<view class="item u-p-r-20" v-if="!item.signflows_id" >
						<u-button
							size="medium"
							type="primary"
							plain 
							@click="getyiqianbao(item.contract_id)" 
							:customStyle="btnStyle"
						>开始签约</u-button>
					</view>
					<template v-if="item.signflows_state == 1 || item.signflows_state == 2">
						<view class="item u-p-r-20" >
							<u-button
								size="medium"
								type="warning"
								plain  
								:customStyle="btnStyle"
								@click="updateyiqianbao(item.contract_id)" 
							>更新签状态</u-button>
						</view>
						<!-- <view class="item u-p-r-20" >
							<u-button
								size="medium"
								type="error"
								plain 
								:customStyle="btnStyle"
								@click="cancelyiqianbao(item.contract_id)" 
							>撤销签约</u-button>
						</view> -->
					</template>
					
					<view class="item u-p-r-20"   >
						<u-button
							size="medium"
							type="primary"
							plain 
							:customStyle="btnStyle"
							@click="watchPDF(item)" 
						>查看文件</u-button>
					</view>
				</view>
			</view>
			 
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-30 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">微信二维码图片</view>
			<view class="item text-base">
				<u-image width="300rpx" height="300rpx" :src="list.pic_bankofsun"></u-image>
			</view>
		</view>
		<view class="u-m-t-40">
			<u-button type="primary"  plain @click="$u.route('/pages/pacc_query/pacc_query_edit', {id: list.product_id})">申请授信</u-button>
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
				list: {},
				filesList: [],
				lastMoney: {
					money: 'hide',
					loading: false
				},
				btnStyle: {
					padding: '0 12px',
					 height: '32px'
				}
			};
		},
		async onLoad(options) {
			if(options.hasOwnProperty('id')) {
				this.pid = options.id
			} 
			await this.refreshData()
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
				const res = await this.$http.get('pacc_query_detail', {params: {id: this.pid}})
				if(res.data.code == 1) {
					this.list = res.data.list
					if(this.list.status >= 5) {
						this.filesList = [this.list.file_286, this.list.file_287]
					}
				}
			},
			async getPaccQuery() { 
				const res = await this.$http.get('pacc_query', {params: {pacc_id: this.list.pacc_id}})
				if(res.data.code == 1) {
					this.showToast({title: res.data.msg})
					this.refreshData()
				}
			},
			async getMoney() {
				if(this.lastMoney.loading) return
				this.lastMoney.loading = true
				const res = await this.$http.get('query_loans_information', {params: {id: this.list.id}})
				this.lastMoney.loading = false
				if(res.data.code == 1) { 
					this.lastMoney.money = res.data.list.money
				}
			},
			async getyiqianbao(contract_id) {
				const res = await this.$http.get('yiqianbao_start', {params: {id: this.pid, contract_id}})
				if(res.data.code == 1) {
					this.showToast({title: res.data.msg})
					this.refreshData()
				}
			},
			async updateyiqianbao(contract_id) {
				const res = await this.$http.get('query_signflows', {params: {id: this.pid, contract_id}})
				if(res.data.code == 1) {
					this.showToast({title: res.data.msg})
					this.refreshData()
				}
			},
			async cancelyiqianbao(contract_id) {
				const res = await this.$http.get('yiqianbao_cancel', {params: {id: this.pid, contract_id}})
				if(res.data.code == 1) {
					this.showToast({title: res.data.msg})
					this.refreshData()
				}
			},
			watchPDF({signflows_state, file_url, pdf_http}) {  
				uni.downloadFile({
				  url: signflows_state == 3? file_url: pdf_http,
				  success: function (res) {
				    var filePath = res.tempFilePath;
				    uni.openDocument({
				      filePath: filePath,
				      showMenu: true,
				      success: function (res) {
				        console.log('打开文档成功');
				      }
				    });
				  }
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
<style lang="scss" scoped> 
	.pacc-file-status-tag {
		position: relative;
		&:before {
			content: '·';
			background-color: inherit;
			color: inherit; 
			position: absolute;
			right: 2px;
			font-weight: bold;
			top: 2px;
		}
	}
</style>