<template>
	<view>
		<list :list="list" :loadStatus="loading" listType="dot">
			<template v-slot:dot="{item}">
				<navigator :url="`/pages/news/newsDetail?id=${item.id}`" class="card">
					<view class="card-left" v-if="item.img">
						<view class="card-img">
							<u-image width="100%" height="100%" :src="item.img"
								border-radius="10"></u-image>
						</view>
					</view>
					<view class="card-right">
						<view class="title">
							{{item.title}}
						</view>
						<view class="sub">
							<view class="sub-item">
								{{item.dtime}}
							</view>
						</view>
					</view>
				</navigator>
			</template>
		</list>
	</view>
</template>

<script>
	import List from "@/components/list/list.vue"
	export default {
		data() {
			return {
				list: [],
				p: 1,
				loading: 'loadmore',
				shareOptions: {
					pageName: "资讯列表"
				}
			}
		},
		components: {
			List
		},
		onShareTimeline(){
			return{
				title: this.shareOptions.pageName,
				query:{}
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.shareOptions.pageName,
				path: '/' + this.$scope.route
			};
		},
		async onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			await this.getData()
			uni.hideLoading()
		},
		onReachBottom() {
			this.getNextData()
		},
		async onPullDownRefresh() {
			this.init()
			uni.showLoading({
				title: "加载中"
			})
			await this.getData()
			uni.stopPullDownRefresh()
			uni.hideLoading()
		},
		methods: {
			init() {
				this.p = 1;
				this.loading = 'loadmore';
				this.list = []
			},
			async getNextData() {
				if(this.loading != 'loadmore') return
				this.p ++;
				this.loading = 'loading'
				await this.getData()
			},
			async getData() {
				let res = await this.$http.get('news_list', {
					params: {
						p: this.p
					}
				})
				if (res.data.code == 1) {
					this.shareOptions.pageName = res.data.share_title
					this.list = [...this.list, ...res.data.list]
					if (this.p == res.data.pages) {
						this.loading = 'nomore'
					}else {
						this.loading = 'loadmore'
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		display: flex;
		min-height: 120rpx;
		padding: 15rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		border-bottom: 1rpx solid #f2f2f2;

		.card-left {
			flex: 0 0 250rpx;
			height: 170rpx;
			margin-right: 20rpx;
			position: relative;
			overflow: hidden;

			.card-img {
				width: 100%;
				height: 100%;
				position: relative;
				overflow: hidden;
				border-radius: 10rpx;

				&:after {
					content: '';
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					z-index: 20;
					background: rgba(100, 100, 100, .1);
				}
			}
		}

		.card-right {
			flex: 1;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-bottom: 10rpx;

			.title {
				overflow: hidden;
				-o-text-overflow: ellipsis;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				line-height: 40rpx;
				margin-bottom: 10rpx;
			}

			.sub {
				color: #999;
				display: flex;
				.sub-item {}
			}
		}
	}
</style>
