<template>
	<view class="u-p-20">
		<view class="load-w u-flex u-flex-center u-flex-items-center" v-if="pageLoading">
			<u-loading mode="circle" color="#007aff" size="80" ></u-loading> 
			<view>刷新数据中...</view>
		</view>
		
		<view class="u-flex u-flex-items-center u-flex-between u-m-b-20 u-p-l-30 u-p-r-30">
			<view class="item text-white u-font-38">{{list.bank_zxrz.name}}</view>
			<view class="item u-flex u-flex-items-center" v-if="show != 1">
				<view class="u-m-r-20">
					<u-icon name="shuaxin" custom-prefix="custom-icon" size="30" color="#fff" @click="refreshBtn"></u-icon>
				</view>
				<u-tag mode="light" :text="list.status | paccStatus2Str" type="primary" ></u-tag>
			</view>
		</view>
		<view class="card-w u-radius-8 u-p-20">
			<view class="u-flex u-flex-items-center u-flex-between text-light u-font-26 u-m-b-20 u-p-l-30 u-p-r-30">
				<view class="item">
					{{list.platform_person || ''}}
				</view>
				<view class="item"  v-if="show != 1">
					{{list.ctime}}
				</view>
			</view>
			<view class="bg-white u-p-20 u-radius-8 u-p-l-30 u-p-r-30" > 
				<template v-if="show == 1">
					<view class="u-content">
						<u-parse :html="msg"></u-parse>
					</view> 
				</template> 
				<template v-else>
					<template v-if="type == '1'">
						<view class="card-rows u-flex u-flex-center u-p-20 u-radius-8 u-m-b-10">
							<view class="title text-light u-font-30 u-text-right u-p-r-20 u-border-right">授信状态</view>
							<view class="value u-font-34 text-error u-flex-1 u-p-l-30 u-flex u-flex-items-center">
								<view class="u-m-r-30">{{list.status | paccStatus2Str }}</view> 
								<u-icon name="shuaxin" custom-prefix="custom-icon" size="30" color="#ff0000" @click="refreshBtn"></u-icon>
							</view> 
						</view> 
						<view class="card-rows u-flex u-flex-center u-p-20 u-radius-8 u-m-b-10">
							<view class="title text-light u-font-30 u-text-right u-p-r-20 u-border-right">申请金额(元)</view>
							<view class="value u-font-34 text-black u-flex-1 u-p-l-30">
								<u-count-to
									:end-val="list.amount || 0" 
									separator=","
									color="#326dbd"
									duration="100"
									decimals="2"
									font-size="40"
								></u-count-to>
							</view> 
						</view> 
						<view class="card-rows u-flex u-flex-center u-p-20 u-radius-8 u-m-b-10">
							<view class="title text-light u-font-30 u-text-right u-p-r-20 u-border-right">贷款期限</view>
							<view class="value u-font-34 text-black u-flex-1 u-p-l-30">{{list.bank_zxrz.loan_term || '-'}}{{list.bank_zxrz.credit_mode | date2Str}}</view> 
						</view>  
						<view class="card-rows u-flex u-flex-center u-p-20 u-radius-8 u-m-b-10">
							<view class="title text-light u-font-30 u-text-right u-p-r-20 u-border-right">备注</view>
							<view class="value u-font-34 text-black u-flex-1 u-p-l-30">{{list.remark}}</view> 
						</view> 
						<view class="mp-code u-flex u-flex-column u-flex-items-center u-p-20" v-if="list.pic_bankofsun">
							<view class="u-p-10 u-p-l-80 u-p-r-80 u-radius-8 text-black u-font-28" style="border: 1rpx solid #eee;">
								银行小程序二维码
							</view>
							<view class="u-p-20">
								<u-image width="300rpx" height="300rpx" :src="list.pic_bankofsun"></u-image>
							</view>
							<view class="text-light u-font-26">长按识别二维码进行银行端操作</view>
						</view>
						<view class="u-p-20">
							<u-button type="primary" @click="gotoType2">授信通过 前往签约中心</u-button>
						</view>
					</template>
					
								
					<template v-if="type == '2'">
					
						<template v-if="list.status == '5'">
							<view class="card-info u-flex u-flex-items-start u-p-30 u-p-l-40 u-p-r-40 u-radius-8 u-m-b-10">
								
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">申请金额(元)</view>
									<view class="value u-font-34 text-black">
										<u-count-to
											:end-val="list.amount || 0" 
											separator=","
											color="#222"
											duration="100"
											decimals="2"
											font-size="40"
										></u-count-to>
									</view>
								</view> 
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">贷款期限</view>
									<view class="value u-font-34 text-black">{{list.bank_zxrz.loan_term || '-'}}{{list.bank_zxrz.credit_mode | date2Str}}</view>
								</view> 
							</view> 
							<view class="card-info u-flex u-flex-items-start u-p-30 u-p-l-40 u-p-r-40 u-radius-8 u-m-b-10">
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">审批额度(元)</view>
									<view class="value u-font-34 text-black u-p-t-10">
										<u-count-to
											:end-val="list.credit_amount || 0" 
											separator=","
											color="#ff0000"
											duration="100"
											decimals="2"
											font-size="40"
										></u-count-to>
									</view>
								</view> 
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28 u-flex u-flex-items-center">
										<view class="u-m-r-20">授信状态</view>
										<u-icon name="shuaxin" custom-prefix="custom-icon" size="30" color="#ff0000" @click="refreshBtn"></u-icon>
									</view>
									<view class="value u-font-32 text-error u-p-t-10">
										{{list.status | paccStatus2Str }}
									</view>
								</view>
							</view> 
						</template>
						
						<template v-if="list.status == '8'">
							<view class="card-info u-flex u-flex-items-start u-p-30 u-p-l-40 u-p-r-40 u-radius-8 u-m-b-10">
								
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">申请金额(元)</view>
									<view class="value u-font-34 text-black">
										<u-count-to
											:end-val="list.amount || 0" 
											separator=","
											color="#222"
											duration="100"
											decimals="2"
											font-size="40"
										></u-count-to>
									</view>
								</view> 
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">申请期限</view>
									<view class="value u-font-34 text-black">{{list.credit_termMonth}}月</view>
								</view> 
							</view> 
							<view class="card-info u-flex u-flex-items-start u-p-30 u-p-l-40 u-p-r-40 u-radius-8 u-m-b-10">
								
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">开始日期</view>
									<view class="value u-font-34 text-black">{{list.credit_beginDate}}</view>
								</view> 
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">截止日期</view>
									<view class="value u-font-34 text-black">{{list.credit_endDate}}</view>
								</view> 
							</view> 
							<view class="card-info u-flex u-flex-items-start u-p-30 u-p-l-40 u-p-r-40 u-radius-8 u-m-b-10">
								
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">授信期限</view>
									<view class="value u-font-34 text-black">{{list.credit_termMonth}}月</view>
								</view> 
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">贷款期限</view>
									<view class="value u-font-34 text-black">{{list.bank_zxrz.loan_term || '-'}}{{list.bank_zxrz.credit_mode | date2Str}}</view>
								</view> 
							</view> 
							<view class="card-info u-flex u-flex-items-start u-p-30 u-p-l-40 u-p-r-40 u-radius-8 u-m-b-10">
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">审批额度(元)</view>
									<view class="value u-font-34 text-black u-p-t-10">
										<u-count-to
											:end-val="list.credit_amount || 0" 
											separator=","
											color="#ff0000"
											duration="100"
											decimals="2"
											font-size="40"
										></u-count-to>
									</view>
								</view> 
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28 u-flex u-flex-items-center">
										<view class="u-m-r-20">可用余额(元)</view>
										<u-icon name="shuaxin" custom-prefix="custom-icon" size="30" color="#ff0000" @click="refreshBtn"></u-icon>
									</view>
									<view class="value u-font-34 text-black u-p-t-10 u-flex u-flex-items-center">
										<view class="u-m-r-20">
											<u-loading mode="circle" color="#007aff" :show="lastMoney.loading"></u-loading>
										</view>
										<view v-if="lastMoney.money == 'hide'">****</view>
										<view v-else>
											<u-count-to
												:end-val="lastMoney.money || 0" 
												separator=","
												color="#ff0000"
												duration="100"
												decimals="2"
												font-size="40"
											></u-count-to>
										</view>
										
									</view>
								</view>
							</view> 
							
						</template>
					
						<view class="files-box u-p-t-20 u-p-b-20 u-m-t-40">
							<view class="box-title u-text-center text-base u-font-28">服务协议签约</view>
							<view class="files-list  u-font-32 u-p-t-30 u-p-b-30"> 
									<view class="item u-p-20 u-radius-10 u-flex u-flex-items-start" v-for="item in filesList" :key="item.id">
										<view class="item u-p-r-10 u-p-t-10">
											<u-image src="https://wx3.y.netsun.com/Public/tu1.png" width="35px" height="35px"></u-image>
										</view>
										<view class="item u-flex-1">
											<view class="u-p-8 u-font-30">
												<view class="item text-black u-m-b-5">
													<text class="">{{item.name1}}</text>
													<text class=" u-p-l-20 pacc-file-status-tag " :class="{
														'text-success': item.signflows_state == 3,
														'text-light': item.signflows_state == 4, 
														'text-primary': item.signflows_state != 3 && item.signflows_state != 4, 
													}">{{item.signflows_state | paccFileStatus2Str}}</text>
												</view>
												<view class="item text-light">
													<text class="">{{item.name2}}</text> 
												</view>
											</view>
											<view class="u-p-8 u-font-30 u-flex u-flex-items-start ">
												
												<view class="item u-p-r-20" v-if="!item.signflows_id" >
													<u-button
														size="mini"
														type="primary" 
														@click="getyiqianbao(item.contract_id)" 
														:customStyle="btnStyle"
														shape="circle"
													>开始签约</u-button>
												</view>
												<template v-if="item.signflows_state == 1 || item.signflows_state == 2">
													<view class="item u-p-r-20" >
														<u-button
															size="mini"
															type="warning" 
															:customStyle="btnStyle"
															@click="updateyiqianbao(item.contract_id)" 
															shape="circle"
														>更新签状态</u-button>
													</view> 
												</template>
												
												<view class="item u-p-r-20"   >
													<u-button
														size="mini"
														type="primary" 
														plain
														:customStyle="btnStyle"
														@click="watchPDF(item)" 
														shape="circle"
													>查看文件</u-button>
												</view>
											</view>
										</view>
										 
									 
									</view>
							</view>
						</view>
					
					</template>
								 
				</template>
				
			</view>
		</view> 
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				type: '1',
				list: {},
				pageLoading: false,
				filesList: [],
				lastMoney: {
					money: 'hide',
					loading: false
				},
				show: 1,
				msg: ''
			};
		},
		computed: {
			...mapState({ 
				account: state => state.account,  
			}), 
		},
		async onLoad(options) {
			if(options.hasOwnProperty('type')) {
				this.type = options.type
			}
			this.pageLoading = true
			await this.getData() 
			this.pageLoading = false
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
			async getData() {
				uni.showLoading()
				const res = await this.$http.get('pacc_type_detail', {
					params: {
						type: this.type
					}
				})
				if(res.data.code == 1) {
					this.list = res.data.list 
					this.msg = res.data.msg
					this.show = res.data.show 
					if(this.list.status >= 5) {
						this.filesList = [this.list.file_286, this.list.file_287]
					}
					if(this.list.status == '8') {
						this.getMoney()
					}
				}
				return res
				
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
			async updateStatus() {
				const res = await this.$http.get('pacc_query', {
					params: {
						pacc_id: this.list.pacc_id
					}
				})
				if(res.data.code == 1) {
					this.showToast({title: res.data.msg})
				}
				
			},
			gotoType2() {
				uni.redirectTo({
					url: '/pages/pacc_query/pacc_type_detail?type=2', 
				})
			},
			async refreshBtn() {
				this.pageLoading = true
				await this.updateStatus()
				const res = await this.getData() 
				this.pageLoading = false
				if(res.data.id && this.type != 2) {
					uni.redirectTo({
						url: '/pages//pacc_query/pacc_type_detail',
						params: {
							type: '2'
						}
					})
				} 
				
			}
		}
	}
</script>


<style lang="scss">
	page {
		// background-color: #fff;
		background: linear-gradient(to bottom, #326dbd 10%, #f6f7fb 25%);
		background-image: linear-gradient(to bottom, #326dbd 10%, #f6f7fb 25%);
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.u-content {
		min-height: 400px;
	}
	.files-box {
		.box-title {
			position: relative;
			&:before,
			&:after {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				margin-top: auto;
				margin-bottom: auto; 
				width: 50px;
				height: 1px;
				background-color: #eee;
			}
			&:before {
				left: 30px;
			}
			&:after {
				right: 30px;
			}
		}
	}
	.card-w {
		background: linear-gradient(to bottom, #edf8fe 10%, #fff 25%);
		background-image: linear-gradient(to bottom, #edf8fe 100px, #fff 250px); 
	}
	.card-rows {
		background-color: #f7f8fc;
		&:nth-of-type(2n+1) {
			background-color: #fff;
		}
		.title {
			flex: 0 0 40%;
		}
	}
	.card-info {
		background-color: #f7f8fc;
		// color: #f96937;
		
		&:nth-of-type(2n+1) {
			background-color: #fff;
		}
		.item {
			padding: 0 8px;
			border-right: 1rpx solid #eee;
			// height: 60px;
			flex: 0 0 50%;
			&:nth-of-type(2n) {
				border-right: 0;
			}
			.title {
				font-weight: 400;
				white-space: nowrap; 
			}
			.value { 
				height: 24px;
				white-space: nowrap;
			}
		}
	}
	.load-w {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		background-color: rgba(255,255,255,.9);
		z-index: 200;
	}
</style>
