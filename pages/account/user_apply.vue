<template>
	<view class="u-p-30 bg">
		<view class="u-p-t-30 u-p-b-40">
			<u-steps 
				mode="number"
				:list="numList" 
				current="0"  
				active-color="#fa3534"
			></u-steps>
		</view>
		<view  class="u-p-20 u-p-l-40 bg-white u-radius-5">
			<view class="form-desc u-p-t-20 u-p-b-30">
				<view class="u-font-40 u-m-b-20 " style="color: #0b2249; font-weight: bold;">
					身份认证
				</view>
				<view class="text-light">应监管要求，请先进行身份认证</view>
			</view>
			<u-form 
				labelPosition="left" 
				:model="model" 
				:rules="rules" 
				ref="uForm"
				labelWidth="80px"
				:borderBottom="false"
				:labelStyle="{color: '#7c88a0', fontSize: '30rpx'}"
				>
				<u-form-item
					:borderBottom="false"
					label="姓名" 
					prop="name"  
					ref="name"
					required
				>
					<u-input 
						border
						v-model="model.name"
						placeholder="姓名"
						></u-input>
				</u-form-item>
				<u-form-item
					:borderBottom="false"
					label="证件类型" 
					prop="idType"  
					ref="idType"
					required
				>
					<u-input 
						border
						:value="idType"
						placeholder="证件类型"
						type="select"
						@click="show = true"
						:selectOpen="show"
						></u-input>
				</u-form-item>
				<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
				
				<u-form-item
					:borderBottom="false"
					label="证件号" 
					prop="idNumber"  
					ref="idNumber"
					required
				>
					<u-input 
						border
						v-model="model.idNumber"
						placeholder="证件号"
						></u-input>
				</u-form-item>
				<u-form-item
					:borderBottom="false"
					label="手机号码" 
					prop="mobile"  
					ref="mobile" 
				>
					<u-input 
						border
						v-model="model.mobile"
						placeholder="手机号码"
						></u-input>
				</u-form-item>
				<u-form-item
					:borderBottom="false"
					label="电子邮箱" 
					prop="email"  
					ref="email" 
				>
					<u-input 
						border
						v-model="model.email"
						placeholder="电子邮箱"
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
	</view>
	
</template>

<script>
	import {getUserCard, getAccount, getCpy} from '@/utils/userCard'
	import {
		mapState
	} from 'vuex';
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
					idType: '',
					idNumber: '',
					mobile: '',
					email: ''
				},
				rules: {
					name: {
						type: 'string',
						required: true,
						message: '姓名不能为空',
						trigger: ['blur', 'change']
					},
					idType: {
						type: 'string',
						required: true,
						message: '证件类型不能为空',
						trigger: ['blur', 'change']
					},
					idNumber: {
						type: 'string',
						required: true,
						message: '证件号不能为空',
						trigger: ['blur', 'change']
					},
				},
				show: false,
				actionSheetList: [
					{
						text: '中国大陆身份证',
						value: 'CRED_PSN_CH_IDCARD'
					}, 
					{
						text: '台湾来往大陆通行证',
						value: 'CRED_PSN_CH_TWCARD'
					}, 
					{
						text: '澳门来往大陆通行证',
						value: 'CRED_PSN_CH_MACAO'
					}, 
					{
						text: '香港来往大陆通行证',
						value: 'CRED_PSN_CH_HONGKONG'
					}, 
					{
						text: '护照',
						value: 'CRED_PSN_PASSPORT'
					}, 
				],
			};
		},
		computed: {
			...mapState({
				account: state => state.account
			}),
			idType() {
				return this.actionSheetList.filter(ele => ele.value == this.model.idType)[0]?.text
			},
			config() {
				// console.log(this.account)
				let func = 'create_account';
				let submitBtnText = '提交';
				let params = {...this.model}; 
				return {
					func,
					submitBtnText,
					params
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			actionSheetCallback(index) {
				this.model.idType = this.actionSheetList[index].value;
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
								uni.redirectTo({
									url: `/pages/account/user_verify?mobile=${this.model.mobile}`,
									success() {
										uni.showToast({
											title: res.data.msg,
											icon: 'success'
										})
									}
								}) 
							}
						} else {
							console.log('验证失败');
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