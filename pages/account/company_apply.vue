<template>
	<view class="u-p-30 bg">
		<view class="u-p-t-30 u-p-b-40">
			<u-steps 
				mode="number"
				:list="numList" 
				current="2"  
				active-color="#fa3534"
			></u-steps>
		</view>
		<view  class="u-p-20 u-p-l-40 bg-white u-radius-5">
			<view class="form-desc u-p-t-20 u-p-b-30">
				<view class="u-font-40 u-m-b-20 " style="color: #0b2249; font-weight: bold;">
					企业认证
				</view>
				<view class="text-light">发起随机金额打款认证</view>
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
					label="企业名称" 
					prop="name"  
					ref="name"
					required
				>
					<u-input 
						border
						v-model="model.name"
						placeholder="企业名称"
						></u-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="社会统一信用代码" 
					prop="idNumber"  
					ref="idNumber"
					required 
				>
					<u-input 
						border
						v-model="model.idNumber"
						placeholder="社会统一信用代码"
						></u-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="法人姓名" 
					prop="orgLegalName"  
					ref="orgLegalName"
					required
				>
					<u-input 
						border
						v-model="model.orgLegalName"
						placeholder="法人姓名"
						></u-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="法人身份证号" 
					prop="orgLegalIdNumber"  
					ref="orgLegalIdNumber"
					required 
				>
					<u-input 
						border
						v-model="model.orgLegalIdNumber"
						placeholder="法人身份证号"
						></u-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="对公账号开户行总行名称" 
					prop="bank"  
					ref="bank"
					required 
					> 
					<u-input 
						type="select"
						border
						:value="model.bank" 
						placeholder="请选择" 
						@click="bankShow = true"
						></u-input> 
					
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="对公账号开户行所在地" 
					prop="regional"  
					ref="regional"
					required 
					> 
					<u-input 
						type="select"
						border
						:value="model.regional_text" 
						placeholder="请选择" 
						@click="areaShow = true"
						></u-input> 
					
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="对公账号开户行支行名称全称" 
					prop="subbranch"  
					ref="subbranch"
					required 
					> 
					<u-input 
						type="select"
						border
						:value="model.subbranch" 
						placeholder="请选择" 
						@click="bankDetailShow = true"
						></u-input> 
					
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="银行卡号" 
					prop="cardNo"  
					ref="cardNo"
					required 
				>
					<u-input 
						border
						v-model="model.cardNo"
						placeholder="银行卡号"
						></u-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="通知短信手机号" 
					prop="mobile"  
					ref="mobile" 
					required
				>
					<u-input 
						border
						v-model="model.mobile"
						placeholder="通知短信手机号"
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
		<menusPopup 
			:show="bankShow" 
			theme="white" 
			showMode="list"
			@close="bankShow = false"
			@confirm="bankConfirm"
		></menusPopup>
		<u-select 
			v-model="areaShow" 
			mode="mutil-column-auto" 
			:list="areaData" 
			value-name="code"
			label-name="name"
			@confirm="areaConfirm"
		></u-select>
		<menusPopupBank 
			:show="bankDetailShow" 
			theme="white" 
			showMode="list"
			@close="bankDetailShow = false"
			@confirm="bankDetailConfirm"
		></menusPopupBank>
	</view>
	
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	import {getUserCard, getAccount, getCpy} from '@/utils/userCard'
	export default {
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
				loading: false,
				model: {
					name: '',
					idType: 'CRED_ORG_USCC',
					idNumber: '',
					orgLegalName: '',
					orgLegalIdNumber: '',
					bank: '',
					regional: '',
					regional_text: '',
					subbranch: '',
					cardNo: '',
					mobile: ''
				},
				
				bankDetailLoading: false,
				bankShow: false,
				areaShow: false,
				bankDetailShow: false, 
				rules: {
					name: {
						required: true,
						message: '企业名称不能为空',
						trigger: ['blur', 'change']
					}, 
					idNumber: {
						required: true,
						message: '社会统一信用代码不能为空',
						trigger: ['blur', 'change']
					},
					orgLegalName: {
						required: true,
						message: '法人姓名不能为空',
						trigger: ['blur', 'change']
					}, 
					orgLegalIdNumber: {
						validator: (rule, value, callback) => {
							return this.$u.test.idCard(value);
						},
						message: '输入正确的法人身份证号',
						trigger: ['blur', 'change']
					},
					bank: {
						required: true,
						message: '对公账号开户行总行名称不能为空',
						trigger: ['blur', 'change']
					}, 
					regional: {
						required: true,
						message: '对公账号开户行所在地不能为空',
						trigger: ['blur', 'change']
					}, 
					subbranch: {
						required: true,
						message: '对公账号开户行支行名称全称不能为空',
						trigger: ['blur', 'change']
					}, 
					cardNo: {
						required: true,
						message: '银行卡号不能为空',
						trigger: ['blur', 'change']
					}, 
					mobile: {
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
						message: '输入正确的通知短信手机号',
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
				areaData:  state => state.areaData,
				bankLoading: state => state.bankLoading,
				areaLoading: state => state.areaLoading
			}), 
			config() {
				// console.log(this.account)
				let func = 'transfer_random_amount';
				let submitBtnText = '提交';
				let params = {...this.model}; 
				return {
					func,
					submitBtnText,
					params
				}
			}
		},
		async onLoad() {
			this.initBankData()
			this.initAreaData()
			
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {   
			...mapActions(['initBankData', 'initAreaData']), 
			bankConfirm(data) {
				this.model.bank = data.name  
			},
			areaConfirm(e) {
				// console.log(e);
				this.model.regional = e[1].value
				this.model.regional_text = e[0].label == e[1].label? e[1].label : `${e[0].label}/${e[1].label}`
			},
			bankDetailConfirm(data) {
				this.model.subbranch = data.bank_name  
			},
			submit() {
				this.$refs.uForm.validate(async valid => {
						if (valid) {
							this.loading = true
							uni.showLoading()
							const res = await this.$http.get(this.config.func, {params: this.config.params});
							
							this.loading = false
							if(res.data.code == 1) {
								uni.showLoading()
								await getAccount()
								await getCpy()
								uni.redirectTo({
									url: `/pages/account/cpy_verify`,
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
</style>