<template>
	<view class="u-radius-8 bg-white u-p-20 u-p-l-30 u-p-r-30">
		<view class="u-flex u-flex-items-center u-flex-between" @click="gotoIndex">
			<view class="item u-flex u-flex-items-center u-flex-1" style="overflow: hidden;">
				<u-image 
					:src="list.picmy"
					width="35px"
					height="35px"
					borderRadius="4"
				></u-image>
				<view class="item text-black u-line-1 u-font-32 text-bold u-m-l-10">{{list.name}}</view>
			</view>
			<view class="item u-p-l-20">
				<u-button type="error" size="mini" plain  @click="gotoIndex">进店</u-button>
			</view>
		</view>
		<view class="info u-m-t-20 u-m-b-10 u-font-30 u-line-2" style="font-weight: 300;" v-if="list.intro">
			<rich-text :nodes="list.intro"></rich-text> 
		</view>
		<!-- <view class="info u-p-t-10 u-p-b-10 u-font-26" style="font-weight: 300;overflow: hidden;">
			<u-read-more 
			ref="uReadMore" 
			showHeight="75" 
			textIndent="0"
			closeText="展开"
			toggle  
			fontSize="24"
			:shadowStyle="{
				backgroundImage: 'none',
				paddingTop: '0',
				marginTop: '20rpx',
				paddingBottom: '0'
			}"
			>
				<view style="line-height: 18px; font-size: 13px;">
					<u-parse 
						:html="list.intro" 
						@load="parseLoaded"
						></u-parse> 
				</view>
				
			</u-read-more>
		</view> -->
	</view>
</template>

<script>
	export default {
		name:"CardShopCell",
		props: {
			list: {
				type: Object,
				default: () => {
					return {}
				}
			},
			
		},
		data() {
			return {
				content: ``,
			};
		},
		methods: { 
			gotoIndex() { 
				this.$emit('gotoIndex', {data: this.list})
			},
			parseLoaded() { 
				this.$nextTick(() => {
					this.$refs.uReadMore.init();
				})
				
			}
		}
	}
</script>

<style lang="scss">

</style>