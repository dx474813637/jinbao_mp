<template>
	<view class="u-p-30 bg">
		<view class="u-p-t-30 u-p-b-40">
			<u-steps 
				mode="number"
				:list="numList" 
				current="1"  
				active-color="#fa3534"
			></u-steps>
		</view>
		<view  class="u-p-20 u-p-l-40 bg-white u-radius-5">
			<view class="form-desc u-p-t-20 u-p-b-30">
				<view class="u-font-40 u-m-b-20 " style="color: #0b2249; font-weight: bold;">
					短信校验
				</view>
				<!-- <view class="text-light">应监管要求，请先进行个人认证</view> -->
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
					label="手机号码" 
					prop="mobile"  
					ref="mobile" 
					required
				>
					<u-input 
						border
						v-model="model.mobile"
						placeholder="手机号码"
						></u-input>
				</u-form-item>
				<u-form-item
					:borderBottom="false"
					label="手机验证码" 
					prop="code"  
					ref="code" 
					required
				>
					<view class="u-flex u-flex-items-center">
						<view class="item u-flex-1">
							<u-input
								border
								v-model="model.code"
								placeholder="手机验证码"
								></u-input>
						</view>
						<view class="item u-m-l-20">
							<u-toast ref="uToast"></u-toast>
							<u-verification-code 
								:seconds="seconds" 
								@end="end" 
								@start="start" 
								ref="uCode" 
								@change="codeChange"
								uniqueKey="userVerify"
								:keepRunning="true"
								></u-verification-code>
							<u-button 
								type="primary"
								@click="getCode" 
								:disabled="!$u.test.mobile(model.mobile)" 
								size="medium"
								plain
								:customStyle="{padding: '0 20px'}"
								>{{tips}}</u-button>
						</view>
					</view>
					
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
				tips: '',
				refCode: null,
				seconds: 60,
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
					mobile: '',
					code: ''
				},
				rules: {
					name: {
						type: 'string',
						required: true,
						message: '姓名不能为空',
						trigger: ['blur', 'change']
					},
					mobile: {
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
						message: '输入正确的手机号',
						trigger: ['blur', 'change']
					},
					code: {
						type: 'string',
						required: true,
						message: '验证码不能为空',
						trigger: ['blur', 'change']
					},
				}, 
			};
		},
		computed: {
			...mapState({
				account: state => state.account
			}), 
			config() {
				// console.log(this.account)
				let func = 'verify_account';
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
			this.refCode = this.$refs.uCode;
		},
		async onLoad(options) { 
			
			this.model.name = this.account.name
			if(options.hasOwnProperty('mobile')) {
				this.model.mobile = options.mobile
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			async getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					const res = await this.$http.get('get_mobile_code', {params: this.config.params});
					if(res.data.code == 1) {
						this.$u.toast(res.data.msg);
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}
					 
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				// this.$u.toast('倒计时结束');
			},
			start() {
				// this.$u.toast('倒计时开始');
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
									url: '/pages/account/company_apply',
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
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		min-height: 100vh;
		background-image: linear-gradient(to bottom, #e6f2fe, #f6f6f6);
	}
</style>