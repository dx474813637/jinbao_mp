<template>
	<view class=" w">
		<u-image 
			src="https://wx3.y.netsun.com/Public/rz/rztop1.png"
			width="100vw"
			mode="widthFix"
		></u-image>
		<view class="u-p-20">
			<view class="list-title u-flex u-flex-items-center  u-p-b-30">
				<u-icon name="_shangshirongzi" custom-prefix="custom-icon" color="#306dbe" size="40"></u-icon>
				<view class="text-black u-font-36 u-m-l-20 text-bold">融资产品</view>
			</view>
			<view class="list">
				<view 
					class="item u-m-b-30 uni-shadow-base"
					v-for="item in list"
					:key="item.id"
					>
					<CardQueryProd
						:origin="item"
						@paccClick="paccClick"
						@detailClick="detailClick"
					></CardQueryProd>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	export default {
		mixins: [mixCheckLogin],
		data() {
			return {
				list: []
			};
		},
		async onLoad() {
			uni.showLoading()
			await this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$http.get('query_product_list')
				if(res.data.code == 1) {
					this.list = res.data.list.data
				}
			},
			paccClick({data}) {
				uni.navigateTo({
					url: `/pages/pacc_query/pacc_query_edit?id=${data.product_id}`
				})
			},
			detailClick({data}) {
				uni.navigateTo({
					url:`/pages/query_product/query_product?id=${data.product_id}`
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
