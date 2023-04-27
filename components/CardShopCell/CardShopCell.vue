<template>
	<view class="u-radius-8 bg-white u-p-20 u-p-l-30 u-p-r-30" @click="gotoIndex">
		<view class="u-flex u-flex-items-center u-flex-between">
			<view class="item u-flex u-flex-items-center u-flex-1" style="overflow: hidden;">
				<u-image 
					src="https://wx3.y.netsun.com//Public/img/swiper3.jpg"
					width="35px"
					height="35px"
					borderRadius="4"
				></u-image>
				<view class="item text-black u-line-1 u-font-32 text-bold u-m-l-10">店铺名称店铺名称店铺名称店铺名称店铺名称店铺名称</view>
			</view>
			<view class="item u-p-l-20">
				<u-button type="error" size="mini" plain>进店</u-button>
			</view>
		</view>
		<view class="info u-p-t-20 u-p-b-10 u-font-26" style="font-weight: 300;">
			<rich-text :nodes="content"></rich-text> 
		</view>
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
				content: `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
						苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
						无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？`,
			};
		},
		methods: { 
			gotoIndex() {
				this.$emit('gotoIndex', {data: this.list})
			}
		}
	}
</script>

<style lang="scss">

</style>