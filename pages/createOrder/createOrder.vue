<template>
	<view class="w">
		<!-- 地址 -->
		<view class="order-addr-box">
			<view class="bg"></view>
			<view class="order-addr">
				<view class="addr-tabs u-flex">
					<view class="item u-flex-1 u-flex u-col-bottom" @click="handlerChangeTabs(0)" :class="{active: addrTabs == 0}">
						<view class="tabs-title u-flex u-row-center">快递或物流配送</view>
					</view>
					<view class="item u-flex-1 u-flex u-col-bottom" @click="handlerChangeTabs(1)" :class="{active: addrTabs == 1}">
						<view class="tabs-title u-flex u-row-center">上门自提</view>
					</view>
				</view>
				<view class="addr-content-box">
					<view class="addr-content u-flex" :class="{active: addrTabs == 0}">
						<navigator :url="`/pages/address/address?source=1&sid=${addressData.id}`" class="address-section">
							<view class="order-content">
								<!-- <text class="yticon icon-shouhuodizhi"></text> -->
								<view class="cen">
									<view class="top u-flex u-row-between">
										<view class="item-left">
											<text class="name u-line-1">{{addressData.name}}</text>
											<text class="mobile u-line-1">{{addressData.mobile}}</text>
										</view>
										<view class="item-right u-flex u-col-bottom">
											<text>选择其他地址</text>
											<text class="yticon icon-you"></text>
										</view>
									</view>
									<text class="address">{{addressData.address}} {{addressData.regional_name}}</text>
								</view>
								
							</view>
						
						</navigator>
					</view>
					<view class="addr-content u-flex" :class="{active: addrTabs == 1}">
						<view class="shzt u-flex u-row-center">
							<view class="zt-btn">{{zt_name}}</view>
							<!-- <view class="zt-sub"></view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <navigator :url="`/pages/address/address?source=1&sid=${addressData.id}`" class="address-section">
			<view class="order-content">
				<text class="yticon icon-shouhuodizhi"></text>
				<view class="cen">
					<template v-if="addressData.id == -1">
						<view class="top">
							<text class="name">{{addressData.address}}</text>
						</view>
					</template>
					<template v-else>
						<view class="top">
							<text class="name">{{addressData.name}}</text>
							<text class="mobile">{{addressData.mobile}}</text>
						</view>
						<text class="address">{{addressData.address}} {{addressData.regional_name}}</text>
					</template>
					
				</view>
				<text class="yticon icon-you"></text>
			</view>

		</navigator> -->

		<view class="goods-section">
			<!-- <view class="g-header b-b" v-if="home">
				<u-image shape="circle" width="50" height="50" :src="home.imageurl" />
				<text class="name">{{home.title}}</text>
			</view> -->
			<!-- 商品列表 -->
			<view class="g-item" v-for="item in cartList" :key="item.pid">
				<view class="item-left">
					<u-image width="100%" height="100%" border-radius="8" :src="item.pic1"></u-image>
				</view>
				<view class="right">
					<text class="title clamp">{{item.name}}</text>
					<text class="spec">品牌:{{item.brand}}; 规格:{{item.model}}</text>
					<view class="price-box">
						<text class="price">¥{{item.price}}</text>
						<text class="number">x {{item.num}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 优惠明细 -->
		<!-- <view class="yt-list">
			<view class="yt-list-cell b-b" @click="toggleMask('show')">
				<view class="cell-icon">
					券
				</view>
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip clamp active">
					{{chooseCoupon? chooseCoupon :'选择优惠券'}}
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</view>
			<view class="yt-list-cell b-b">
				<view class="cell-icon hb">
					减
				</view>
				<text class="cell-tit clamp">商家促销</text>
				<text class="cell-tip clamp disabled">暂无可用优惠</text>
			</view>
		</view> -->
		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip clamp">¥{{totalPrice}}</text>
			</view>
			<view class="yt-list-cell sz b-b" >
				<view class="cell-tit clamp">
					<text>当前支付模式：{{rzObj.rz_name}}</text>
					<view class="sz_sub" v-if="rzObj.rz_info">{{rzObj.rz_info}}</view>
				</view>
				<view class="cell-tip clamp">
					<!-- <u-switch v-model="rz_checked" :active-color="switchBtn"></u-switch> -->
				</view>
			</view>
			<!-- <view class="yt-list-cell sz b-b" v-if="szObj.sz">
				<view class="cell-tit clamp">
					<text>{{szObj.sz_name}}</text>
					<view class="sz_sub" v-if="szObj.sz_info">{{szObj.sz_info}}</view>
				</view>
				<view class="cell-tip clamp">
					<u-switch v-model="sz_checked" :active-color="switchBtn"></u-switch>
				</view>
			</view>
			<view class="yt-list-cell sz b-b" v-if="rzObj.rz">
				<view class="cell-tit clamp">
					<text>{{rzObj.rz_name}}</text>
					<view class="sz_sub" v-if="rzObj.rz_info">{{rzObj.rz_info}}</view>
				</view>
				<view class="cell-tip clamp">
					<u-switch v-model="rz_checked" :active-color="switchBtn"></u-switch>
				</view>
			</view> -->
			<!-- <view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip clamp">免运费</text>
			</view> -->
			<!-- <view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view> -->
		</view>

		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">¥</text>
				<text class="price">{{totalPriceAct}}</text>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>

		<!-- 优惠券面板 -->
		<!-- <u-popup mode="bottom" v-model="show" height="800rpx">
			<view class="content">
				<List listType="dot" :list="couponList" emptyText="暂无优惠劵" emptyMode="order" :loadStatus="loadStatus">
					<template v-slot:dot="{item}">
						<view class="list-item">
							<CardCoupon 
								:list="item"
								@handleClick="handleTake"
							>
								<template #btnText>
									立即使用
								</template>
							</CardCoupon>
						</view>
						
					</template>
				</List>
			</view>
		</u-popup> -->
		<!-- <view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content safe-area-inset-bottom" @click.stop.prevent="stopPrevent">
				
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
					<CardCoupon
						:list="item"
						@handleClick="handleTake"
					></CardCoupon>
				</view>
				
			</view>
		</view> -->

	</view>
</template>

<script>
	// import { CardCoupon } from '@/components/CardCoupon/CardCoupon.vue';
	// import List from '@/components/list/list.vue';
	export default {
		data() {
			return {
				addrTabs: 0,
				zt_name: "您当前交收方式为：上门自提",
				maskState: 0, //优惠券面板显示状态
				desc: '', //备注
				// payType: 1, //1微信 2支付宝
				couponList: [],
				addressData: {
					name: '收货人',
					mobile: '手机号',
					address: '详细地址',
					regional_name: '地区',
					auto: 0,
				},
				cartList: [],
				couponMoney: 0,
				p: 1,
				endFlag: false,
				loadStatus: 'loadmore',
				show: false,
				chooseCoupon: '',
				sz_checked: false,
				rz_checked: false,
				szObj: {
					sz: 0,
					sz_info: "",
					sz_name: ""
				},
				rzObj: {
					rz: 0,
					rz_info: "",
					rz_name: ""
				}
				
				// home: uni.getStorageSync('home')
			}
		},
		watch: {
			sz_checked(flag) {
				if(flag) {
					this.rz_checked = false
				}
			},
			rz_checked(flag) {
				if(flag) {
					this.sz_checked = false
				}
			}
		},
		onLoad(option) {
			this.getdefaultaddr()
			this.getData()
		},
		// components: {
		// 	List
		// },
		computed: {
			switchBtn() {
				return this.$store.state.theme.themeColor
			},
			totalPrice() {
				let count = 0
				this.cartList.forEach(ele => {
					if(ele.price == "议价") ele.price = 0
					count += ele.price * ele.num
				}, 0)
				return count.toFixed(2)
			},
			totalPriceAct() {
				return this.totalPrice - this.couponMoney
			},
			createOrderData() {
				return this.cartList.map(ele => {
					return {
						cid: ele.cid,
						pid: ele.pid,
						num: ele.num
					}
				})
			}
		},
		methods: {
			handlerChangeTabs(index) {
				this.addrTabs = index
			},
			// async handleTake(item) {
			// 	let res = await this.$http.get('get_use_coupon', {params: {cno: item.guid}})
			// 	if(res.data.list.code == 1) {
			// 		this.chooseCoupon = item.guid
			// 		this.show = false
			// 	}else {
			// 		uni.showToast({
			// 			title: res.data.list.msg,
			// 			icon: 'none'
			// 		})
			// 	}
			// },
			async getdefaultaddr() {
				const res = await this.$http.get("addresss_list")
				if(res.data.code == 1) {
					this.zt_name = res.data.zt_name
					let arr = res.data.list.list.filter(ele => {
						return ele.auto == 1
					})[0]
					if(arr) this.addressData = arr
				}
			},
			async getData() {
				this.cartList = uni.getStorageSync('cart').filter(ele => ele.checked)
				
				const res = await this.get_sinopay_credit()
				if(res.data.code == 1) {
					this.szObj.sz = res.data.sz
					this.szObj.sz_name = res.data.sz_name
					this.szObj.sz_info = res.data.sz_info
					this.rzObj.rz = res.data.rz
					this.rzObj.rz_name = res.data.rz_name
					this.rzObj.rz_info = res.data.rz_info
				}
				
				
				// console.log(this.cartList)
				// this.getCoupon()
				// this.getAddress()

			},
			async get_sinopay_credit() {
				return await this.$http.get("sinopay_credit")
			},
			// async getAddress() {
			// 	let res = await this.$http.get('addresss_list')
			// 	this.addressData = res.data.list.list[0]
			// },
			// async getCoupon() {
			// 	if(Object.keys(this.$store.state.couponCate).length == 0) {
			// 		let res = await this.$http.get('coupon_list_login')
			// 		this.$store.commit('getCouponCate', res.data.list.cate)
			// 	}

			// 	let list = await this.$http.post('shop_coupon_login_list', {
			// 		login: uni.getStorageSync('login')
			// 	})
			// 	this.couponList = [...this.couponList, ...list.data.list.list]
			// 	if (this.p == list.data.list.pages) {
			// 		this.loadStatus = 'nomore'
			// 		this.endFlag = 'true'
			// 	} else this.loadStatus = 'loadmore'
			// },
			toggleMask(type) {
				this.show = true
			},
			addrcheck() {
				if(!this.addressData.id) return false
				return true
			},
			async submit() {
				const addrcheck = await this.addrcheck()
				if(!addrcheck && this.addrTabs == 0) {
					uni.showToast({
						title: "请选择收货地址",
						icon: "none"
					})
					return
				}
				let tool = 3
				// if(this.sz_checked) tool = 1
				// if(this.rz_checked) tool = 2
				// this.setCart()
				// console.log(this.createOrderData, JSON.stringify(this.createOrderData))
				let i 
				if(this.addrTabs == 1) {
					i = -1
				}else {
					i = this.addressData.id
				}
				let res = await this.$http.get('create_order', {
					params: {
						pid_array: JSON.stringify(this.createOrderData),
						address_id: i,
						tool: tool
					}
				})
				if (res.data.code == 1) {
					this.setCart()
					// uni.removeStorageSync('cart')
					uni.redirectTo({
						url: '/pages/order/order'
					})
					uni.showToast({
						title: '订单创建成功'
					})
				}

			},
			setCart() {
				let list = uni.getStorageSync('cart')
				list = list.filter(ele => {
					let flag = this.createOrderData.some(item => {
						if (item.pid == ele.pid) return true
					})
					return !flag
				}) || []
				uni.setStorageSync('cart', list)
				this.$store.commit('setCartCount', list.length)
			}
		}
	}
</script>
<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}
</style>
<style lang="scss" scoped>
	.order-addr-box {
		padding: 30rpx 15rpx;
		position: relative;
		.bg {
			position: absolute;
			left: 0;
			top: 0;
			height: 60%;
			width: 100%;
			background-color: $uni-color-theme;
		}
		.order-addr {
			position: relative;
			box-shadow: 0 5rpx 10rpx rgba(0,0,0,.1);
			.addr-tabs {
				.item {
					width: 50%;
					position: relative;
					color: #666;
					height: 70rpx;
					border-radius: 10rpx 10rpx 0 0;
					
					
					.tabs-title {
						width: 100%;
						height: 90%;
						background-color: #bed2ff;
						border-radius: 10rpx 10rpx 0 0;
						overflow: hidden;
					}
					// &:before {
					// 	content: "";
					// 	position: absolute;
					// 	width: 100%;
					// 	height: 80%;
					// 	background-color: #00BFFF;
						
					// }
					&:first-child {
						.tabs-title {
							border-top-right-radius: 0;
						}
						&.active:before {
							display: none;
						}
					}
					&:last-child {
						.tabs-title {
							border-top-left-radius: 0;
						}
						&.active:after {
							display: none;
						}
					}
					&.active {
						background-color: #fff;
						color: #000;
						.tabs-title {
							background-color: #fff;
						}
						&:before,
						&:after {
							content: "";
							position: absolute;
							bottom: 0;
							height: 0;
							width: 0;
							border-top: 0;
							z-index: 20;
						}
						&:before {
							border-left: 20rpx solid transparent;
							border-right: 0;
							border-bottom: 65rpx solid #fff;
							right: 100%;
						}
						&:after {
							border-left: 0;
							border-right: 20rpx solid transparent;
							border-bottom: 65rpx solid #fff;
							left: 100%;
						}
					}
				}
			}
			.addr-content-box {
				background-color: #fff;
				border-radius: 0 0 10rpx 10rpx;
				overflow: hidden;
				position: relative;
				&:after {
					content: "";
					position: absolute;
					bottom: 0;
					left: 0;
					height: 6rpx;
					width: 100%;
					background-image: url("../../static/img/addr-bottom.jpg");
					background-repeat: repeat-x;
					background-size: auto 100%;
					background-position: 0 0;
				}
				.addr-content {
					display: none;
					min-height: 180rpx;
					.shzt {
						width: 100%;
						height: 180rpx;
						flex-direction: column;
						.zt-btn {
							background-color: #eff3ff;
							// width: 300rpx;
							height: 60rpx;
							padding: 0 20rpx;
							text-align: center;
							line-height: 60rpx;
							border-radius: 6rpx;
							margin-bottom: 10rpx;
							color: #6d758e;
							text {
								font-weight: bold;
								margin-left: 6rpx;
							}
						}
						.zt-sub {
							color: #999;
							font-size: 24rpx;
							
						}
					}
					&.active {
						display: block;
						
					}
				}
			}
		}
	}
	.content {
		padding: 20rpx;

		.list-item {
			margin-bottom: 10rpx;
		}
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
			padding-left: 30rpx;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
			.top {
				.item-right,
				.yticon{
					color: #aaa;
					font-size: 24rpx;
				}
			}
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: #777;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		padding-top: 10rpx;
		background: #fff;
		padding-bottom: 10px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			padding: 20upx 30upx;
			border-bottom: 1rpx solid #eee;

			&:last-child {
				border: 0;
			}

			.item-left {
				flex-shrink: 0;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;
				font-family: '微软雅黑';

				.price {
					margin-bottom: 4upx;
				}

				.number {
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;
		&.sz {
			align-items: flex-start;
			.cell-tit {
				display: flex;
				flex-direction: column;
				flex: 0 0 calc(100% - 160rpx);
				.sz_sub {
					white-space: normal;
					line-height: 40rpx;
					padding-bottom: 20rpx;
				}
			}
			.cell-tip {
				height: 70rpx;
				flex: 0 0 160rpx;
			}
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex-shrink: 0;
			flex-grow: 0;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			font-size: 26upx;
			color: $font-color-dark;
			font-family: '微软雅黑';

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color-red;
			}

			&.red {
				color: $base-color-red;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			text-align: right;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}

	/* 支付列表 */
	.pay-list {
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;

		.pay-item {
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}

		.icon-weixinzhifu {
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}

		.icon-alipay {
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}

		.icon-xuanzhong2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}

		.tit {
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
		box-sizing: content-box;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.price-content {
			padding-left: 30upx;
		}

		.price-tip {
			color: red;
			margin-left: 8upx;
			font-family: '微软雅黑';
		}

		.price {
			font-size: 36upx;
			color: red;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $uni-color-theme;
		}
	}

	/* 优惠券面板 */
	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: .3s;

		.mask-content {
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 30upx 30upx;
		color: #fff;
		border-radius: 10rpx;

	}
</style>
