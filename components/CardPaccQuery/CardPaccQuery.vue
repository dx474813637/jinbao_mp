<template>
	<view class="card u-radius-8 bg-white u-p-20 u-p-l-30 u-p-r-30" @click="gotoDetail">
		<view class="card-header u-border-bottom u-p-b-20 u-flex u-flex-items-center u-flex-between">
			<view class="item u-font-34 text-black">
				{{origin.bank_product_name}}
			</view>
			<view class="item text-light u-font-28">
				授信期限:{{origin.credit_termMonth}}月
			</view>
		</view>
		<view class="u-flex u-flex-items-center u-flex-between u-p-t-20 u-p-b-20">
			<view class="item u-font-34 u-flex u-flex-items-center" :class="{
				'text-success': origin.status == 8,
				'text-error': origin.status == 4,
				'text-light2': origin.status != 4 && origin.status != 8
			}">
				<u-icon name="info-circle" size="38"></u-icon>
				<view class="u-m-l-15">{{origin.status | paccStatus2Str}}</view>
				
			</view>
			<view class="item text-light u-font-28">
				<u-tag :text="origin.id" type="info" ></u-tag>
			</view>
		</view>
		<view class="u-radius-8 u-p-20 text-light u-flex u-flex-between u-flex-items-center" style="background-color: #f8f9fb;">
			<view class="item ">
				<view class="u-m-b-10 u-font-26">申请额度(元)</view>
				<u-count-to
					:end-val="origin.amount || 0" 
					separator=","
					color="#333"
					duration="100"
					decimals="2"
				></u-count-to>
			</view> 
			<view class="item ">
				<view class="u-m-b-10 u-font-26">审批额度(元)</view>
				<u-count-to
					:end-val="origin.credit_amount || 0" 
					separator=","
					color="#333"
					duration="100"
					decimals="2"
				></u-count-to>
			</view>
		</view>
		<view class=" u-p-t-20 u-flex u-flex-items-center u-flex-between text-light u-font-28">
			<view class="item">
				授信开始日:{{origin.credit_beginDate}}
			</view>
			<view class="item">
				授信截止日:{{origin.credit_endDate}}
			</view>
		</view>
		  
	</view>
</template>

<script>
	export default {
		name:"CardPaccQuery",
		props: {
			origin: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			btnClick() {
				this.$emit('paccClick', {data: this.origin})
			},
			gotoDetail() {
				this.$emit('detailClick', {data: this.origin})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		    word-break: break-all;
	}
</style>