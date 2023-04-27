<template>
	<view class="tabbar" :customStyle="customStyle">
		<view class="c-w">
			<slot></slot>
		</view>
		
		<!-- <u-safe-bottom></u-safe-bottom> -->
	</view>
</template>

<script>
	export default {
		props: {
			customStyle: {
				type: Object,
				defualt: () => {
					return {}
				}
			}
		},
		data() {
			return {
				active: 0
			};
		},
		created() {
			
		},
		methods: {
			
		}
	};
</script>

<style scoped lang="scss">
	.tabbar {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 10;
		box-sizing: border-box;
		background-color: #fff;
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
	}
	.c-w {
		height: 60px;
	}
</style>
