<template>
	<view class="card u-radius-8 bg-white u-p-20 u-p-l-30 u-p-r-30" @click="gotoDetail">
		<view class="card-header u-border-bottom u-p-b-20 u-flex u-flex-items-center u-flex-between">
			<view class="item u-font-34 u-flex u-flex-items-center" :class="{
				'text-success': origin.rz_status == 8,
				'text-error': origin.rz_status == 4,
				'text-light2': origin.rz_status != 4 && origin.rz_status != 8
			}">
				<u-icon name="info-circle" size="38"></u-icon>
				<view class="u-m-l-15">{{origin.rz_status | orderRzStatus2Str}}</view>
				
			</view>
			<view class="item text-light u-font-28">
				{{origin.post_time}}
			</view>
		</view>  
		<view class="u-flex u-flex-items-start u-p-20 u-font-30">
			<view class="item text-light u-m-r-30 u-p-r-30 u-flex-shrink-0 u-border-right">卖家</view>
			<view class="item text-black ">{{origin.sell_company}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-p-20 u-font-30 u-radius-5" style="background-color: #f8f9fb;">
			<view class="item text-light u-m-r-30 u-p-r-30 u-flex-shrink-0 u-border-right">买家</view>
			<view class="item text-black">{{origin.buy_company}}</view>
		</view>  
		<view class="u-p-t-20 u-flex u-flex-items-center u-flex-between"> 
			<view class="item text-light u-font-28 u-flex u-flex-items-center">
				<!-- <view>金额：</view> -->
				<u-count-to
					:end-val="origin.price || 0" 
					separator=","
					color="#ff0000"
					duration="100"
					decimals="2"
					fontSize="38"
				></u-count-to>
				<view class="u-m-l-20">元</view>
			</view>
			<view class="item">
				<u-button type="primary" :customStyle="{padding: '0 15px'}" size="medium" plain @click.stop="btnClick">相关订单</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"CardOrderBank",
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
				this.$emit('orderBtn', {data: this.origin})
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