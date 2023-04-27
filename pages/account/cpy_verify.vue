<template>
	<view class="u-p-30 bg">
		<view class="u-p-t-30 u-p-b-40">
			<u-steps 
				mode="number"
				:list="numList" 
				:current="step"  
				active-color="#fa3534"
			></u-steps>
		</view>
		<view  class="u-p-20 u-p-l-40 bg-white u-radius-5">
			<template v-if="step == 2">
				<view class="form-desc u-p-t-20 u-p-b-30">
					<view class="u-font-40 u-m-b-20 " style="color: #0b2249; font-weight: bold;">
						随机金额校验
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
						label="校验金额" 
						prop="amount"  
						ref="amount"
						required
					>
						<u-input 
							border
							v-model="model.amount"
							placeholder="校验金额"
							></u-input>
					</u-form-item>  
				</u-form>
			</template>
			<template v-else>
				<view class="u-p-30 u-flex u-flex-center">
					<u-icon
						size="100"
						color="#00aa7f"
						labelPos="bottom"
						labelSize="36"
						marginTop="30"
						label="你已完成用户认证"
						name="checkmark-circle-fill"
					></u-icon>
				</view>
				
			</template>
			<view class="u-p-30">
				
			</view>
			
		</view>
		<view class="u-p-t-30 u-p-b-30">
			<view class="u-flex u-flex-items-center u-flex-center">
				<view class="item u-flex-1">
					<template v-if="step == 2">
						<u-button type="primary" @click="submit" :loading="loading" :disabled="loading">{{config.submitBtnText}}</u-button>
					</template>
					<template v-if="step == 3">
						<u-button type="success" @click="back" >返回用户认证</u-button>
					</template>
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
				step: 2, 
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
					amount: '',  
				},
				rules: {
					amount: {
						validator: (rule, value, callback) => {
							return this.$u.test.amount(value);
						},
						message: '请输入规范的校验金额',
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
				let func = 'verify_random_amount';
				let submitBtnText = '提交';
				let params = {...this.model};  
				return {
					func,
					submitBtnText,
					params, 
				}
			}
		},
		onReady() {
			this.step == 2 && this.$refs.uForm.setRules(this.rules) 
		},
		async onLoad(options) {  
			if(options.hasOwnProperty('step')) {
				this.step = options.step
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
								getAccount()
								getCpy()
								uni.showToast({
									title: res.data.msg,
									icon: 'success'
								})
								this.step = 3 
							}
						} else {
							console.log('验证失败');
						}
					});
			}, 
			back() {
				uni.navigateBack()
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