<template>
	<view class="u-p-30 bg">
		
		<view  class="u-p-20 u-p-l-40 bg-white u-radius-5">
			<view class="form-desc u-p-t-20 u-p-b-30" v-if="list.bank_zxrz_product">
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
					<view class="item text-light u-m-r-20 u-flex-shrink-0">{{list.bank_zxrz_product.bank_name}}</view>
					<view class="item text-base ">{{list.bank_zxrz_product.name}}</view>
				</view>
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.bank_zxrz_product.zxrz_remark">
					<view class="item text-light u-m-r-20 u-flex-shrink-0">银行备注</view>
					<view class="item text-base ">{{list.bank_zxrz_product.zxrz_remark}}</view>
				</view>
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
					<view class="item text-light u-m-r-20 u-flex-shrink-0">授信期限</view>
					<view class="item text-base ">{{list.bank_zxrz_product.credit_term || '-'}}{{list.bank_zxrz_product.credit_mode | date2Str}}</view>
				</view>
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
					<view class="item text-light u-m-r-20 u-flex-shrink-0">单户最高额度</view>
					<view class="item text-base ">{{list.bank_zxrz_product.max_amount}}元</view>
				</view>
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
					<view class="item text-light u-m-r-20 u-flex-shrink-0">贷款期限</view>
					<view class="item text-base ">{{list.bank_zxrz_product.loan_term || '-'}}{{list.bank_zxrz_product.credit_mode | date2Str}}</view>
				</view>
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
					<view class="item text-light u-m-r-20 u-flex-shrink-0">银行利率(年华)</view>
					<view class="item text-base ">{{list.bank_zxrz_product.annualized}}</view>
				</view>
			</view>
			<view class="u-flex u-flex-items-center u-flex-end">
				<view class="u-flex u-flex-items-center" @click="initData"> 
					<u-icon name="shuaxin" custom-prefix="custom-icon" color="#007aff"></u-icon>
					<view class="text-base u-m-l-20">刷新</view>
				</view>
			</view>
			<u-form 
				labelPosition="top" 
				:model="model" 
				:rules="rules" 
				ref="uForm"
				labelWidth="100%"
				:borderBottom="false"
				:labelStyle="{color: '#7c88a0', fontSize: '30rpx', lineHeight: '18px'}"
				>
				<u-form-item
					:borderBottom="false"
					label="公司名称" 
					prop="platform_company"  
					ref="platform_company"
					required
				>
					<u-input 
						border
						v-model="model.platform_company"
						placeholder="公司名称"
						disabled
						:customStyle="{background: '#f8f8f8'}"
						></u-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="社会统一信用代码" 
					prop="platform_reg"  
					ref="platform_reg"
					required 
				>
					<u-input 
						border
						v-model="model.platform_reg"
						placeholder="社会统一信用代码"
						disabled
						:customStyle="{background: '#f8f8f8'}"
						></u-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="法人姓名" 
					prop="platform_person"  
					ref="platform_person"
					required
				>
					<u-input 
						border
						v-model="model.platform_person"
						placeholder="法人姓名"
						disabled
						:customStyle="{background: '#f8f8f8'}"
						></u-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="法人身份证号" 
					prop="platform_is_card"  
					ref="platform_is_card"
					required 
				>
					<u-input 
						border
						v-model="model.platform_is_card"
						placeholder="法人身份证号"
						disabled
						:customStyle="{background: '#f8f8f8'}"
						></u-input>
				</u-form-item>  
				
				<u-line color="#ccc" margin="20px 0"></u-line>
				<u-form-item
					:borderBottom="false"
					label="法人手机" 
					prop="platform_mobile"  
					ref="platform_mobile" 
					required
				>
					<u-input 
						border
						v-model="model.platform_mobile"
						placeholder="法人手机"
						></u-input>
				</u-form-item>
				<u-form-item
					:borderBottom="false"
					label="申请金额（元）" 
					prop="amount"  
					ref="amount"
					required 
					> 
					<u-input 
						border
						v-model="model.amount"
						placeholder="申请金额（元）"
						></u-input> 
				</u-form-item>  
				<u-form-item
					:borderBottom="false"
					label="与核心企业合作月数" 
					prop="termMonth"  
					ref="termMonth"
					required 
				>
					<u-input 
						border
						v-model="model.termMonth"
						placeholder="与核心企业合作月数"
						></u-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="上年度销售收入（元）" 
					prop="transAmt"  
					ref="transAmt"
					required 
				>
					<u-input 
						border
						v-model="model.transAmt"
						placeholder="上年度销售收入（元）"
						></u-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="经营场所所在省份" 
					prop="businessProvince"  
					ref="businessProvince"
				> 
					<view class="select-w">
						<u-input
							type="select"
							border
							:value="model.businessProvince" 
							placeholder="请选择" 
							@click="areaShow = true"
							></u-input> 
						<view class="load-w u-flex u-flex-center u-flex-items-center" v-if="areaLoading">
							<u-loading mode="circle" size="36"></u-loading>
						</view>	
					</view>
					
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="联系地址(公司具体联系地址)" 
					prop="address"  
					ref="address"
				>
					<u-input 
						border
						v-model="model.address"
						placeholder="联系地址(公司具体联系地址)"
						></u-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="备注" 
					prop="remark"  
					ref="remark"
				>
					<u-input 
						border
						v-model="model.remark"
						placeholder="备注"
						></u-input>
				</u-form-item> 
			</u-form>
			<view class="u-p-30">
				
			</view>
			
		</view>
		<view class="u-p-t-30 u-p-b-30">
			<view class="u-flex u-flex-items-center u-flex-center">
				<view class="item u-flex-1">
					<u-button type="primary" @click="submit" :loading="loading" :disabled="loading">{{config.submitBtnText}}</u-button>
				</view>
				<!-- <view class="item u-m-l-20 u-flex-1">
					<u-button type="error" @click="reset" >重置</u-button>
				</view> -->
			</view>
			<view class="u-flex u-flex-items-center u-flex-center u-m-t-40">
				<u-icon name="renzhengdunpaianquanbaozhangzhibao" custom-prefix="custom-icon" size="30" color="#aaa"></u-icon>
				<view class="text-light u-font-28 u-m-l-20">信息安全保障中</view>
			</view>
		</view> 
		<u-select 
			v-model="areaShow"  
			:list="areaData"  
			@confirm="areaConfirm"
		></u-select> 
	</view>
	
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	import {getUserCard, getAccount, getCpy} from '@/utils/userCard'
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	export default {
		mixins: [mixCheckLogin],
		data() {
			return {
				numList: [
					{
						name: '信息填写'
					}, {
						name: '个人认证'
					}, {
						name: '企业认证'
					}, {
						name: '完成'
					}
				],
				list: {},
				loading: false,
				model: {
					platform_company: '', 
					platform_reg: '',
					platform_person: '',
					platform_is_card: '',
					platform_mobile: '',
					imtoken: '',
					amount: '',
					termMonth: '',
					transAmt: '',
					businessProvince: '',
					address: '', 
					remark: '', 
				},
				areaData: [],
				areaLoading: false,
				areaShow: false, 
				rules: {
					platform_company: {
						required: true,
						message: '公司名称不能为空',
						trigger: ['blur', 'change']
					}, 
					platform_reg: {
						required: true,
						message: '社会统一信用代码不能为空',
						trigger: ['blur', 'change']
					},
					platform_person: {
						required: true,
						message: '法人姓名不能为空',
						trigger: ['blur', 'change']
					},  
					platform_mobile: {
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
						message: '输入正确的手机号',
						trigger: ['blur', 'change']
					},
					platform_is_card: {
						validator: (rule, value, callback) => {
							return this.$u.test.idCard(value);
						},
						message: '输入正确的身份证号',
						trigger: ['blur', 'change']
					},
					amount: {
						validator: (rule, value, callback) => {
							return this.$u.test.amount(value);
						},
						message: '输入正确的金额',
						trigger: ['blur', 'change']
					}, 
					termMonth: {
						required: true,
						message: '与核心企业合作月数不能为空',
						trigger: ['blur', 'change']
					}, 
					transAmt: {
						validator: (rule, value, callback) => {
							return this.$u.test.amount(value);
						},
						message: '输入正确的金额',
						trigger: ['blur', 'change']
					}, 
				}, 
			};
		},
		computed: {
			...mapState({
				account: state => state.account,
				organizations: state => state.organizations,
				bankData:  state => state.bankData, 
				bankLoading: state => state.bankLoading, 
			}), 
			config() {
				// console.log(this.account)
				let func = 'pacc';
				let submitBtnText = '提交';
				let params = {...this.model, product_id: this.pid}; 
				return {
					func,
					submitBtnText,
					params
				}
			}
		},
		async onLoad(options) {
			if(options.hasOwnProperty('id')) {
				this.pid = options.id
			} 
			this.getAreaData()
			await this.getData() 
			
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {   
			...mapActions(['initBankData', 'initAreaData']), 
			// bankConfirm(data) {
			// 	this.model.bank = data.name  
			// },
			initData() {
				uni.showLoading({
					
				})
				this.getData()
			},
			async getData() {
				const res = await this.$http.get('pacc_detail', {params: {product_id: this.pid}})
				if(res.data.code == 1) {
					this.list = res.data.list
					this.model.platform_company = res.data.list.platform_company
					this.model.platform_reg = res.data.list.platform_reg
					this.model.platform_person = res.data.list.platform_person
					this.model.platform_is_card = res.data.list.platform_is_card 
					this.model.imtoken = res.data.list.imtoken 
				}
				
			},
			async getAreaData() {
				this.areaLoading = true
				const res = await this.$http.get('pacc_businessProvince')
				this.areaLoading = false
				if(res.data.code == 1) {
					this.areaData = res.data.list.map(ele => ({label: ele}))
				}
				
			},
			areaConfirm(e) {
				console.log(e); 
				this.model.businessProvince = e[0].label 
			},
			// bankDetailConfirm(data) {
			// 	this.model.subbranch = data.bank_name  
			// },
			submit() {
				this.$refs.uForm.validate(async valid => {
						if (valid) {
							this.loading = true
							uni.showLoading()
							const res = await this.$http.get(this.config.func, {params: this.config.params});
							
							this.loading = false
							if(res.data.code == 1) { 
								uni.reLaunch({
									url: `/pages/pacc_query/pacc_query_list`,
									success() {
										uni.showToast({
											title: res.data.msg,
											icon: 'success'
										})
									}
								}) 
							}
						} else {
							console.log('请检查表单内容');
						}
					});
			},
			reset() {
				this.$refs.uForm.resetFields()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		min-height: 100vh;
		background-image: linear-gradient(to bottom, #e6f2fe, #f6f6f6);
	}
	.select-w {
		position: relative;
	}
	.load-w {
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255,255,255,.2);
		
	}
</style>