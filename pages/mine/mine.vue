<template>
	<view class="container">
		<view class="user-section">
			<!-- <view class="status_bar"></view> -->
			<!-- <view class="bg"></view> -->
			<!-- <image class="bg" src="/static/img/bg-mine.png"></image> -->
			<view class="user-info-box">
				<view class="portrait-box">
					<template v-if="userInfo.mem_pic">
						<image class="portrait uni-shadow-base" :src="userInfo.mem_pic"></image>
					</template>
					<template v-else>
						<view class="portrait uni-shadow-base">
							<open-data type="userAvatarUrl"></open-data>
						</view>

					</template>

				</view>
				<view class="info-box">
					<template v-if="userInfo.name">
						<text class="username">{{userInfo.name}}</text>
					</template>
					<template v-else>
						<navigator class="username" url="/pages/login/index">
							<open-data type="userNickName"></open-data>
							<view class="username-label" v-if="!logflag">未登录</view>
						</navigator>
					</template>
					
				</view>
			</view>
			<!-- <view class="vip-card-box" @click="navTo('/sinopay/money/index')"> 
				<view class="b-btn">
					进入
				</view>
				<view class="tit">
					<u-icon name="rmb-circle" size="38"></u-icon>
					<text>我的资金</text>
				</view>
			</view> -->
		</view>

		<view class="cover-container">
			<view class="wallet-box u-m-b-10" >
				<view class="wallet u-flex u-flex-items-center u-flex-around">
					
					<view class="item u-flex u-flex-column u-flex-items-center ">
						<view class="text-white wallet-title u-font-22">授信额度(元)</view>
						<view> 
							<u-loading mode="circle" color="#efe521" :show="mineLoading"></u-loading> 
							<template v-if="!mineLoading">
								<u-count-to
									:end-val="mineData.amount || 0" 
									separator=","
									color="#fff"
									duration="100"
									decimals="2"
									fontSize="50"
								></u-count-to>
							</template>
							
						</view>
					</view>
					
					<view class="item u-flex u-flex-column u-flex-items-center">
						<view class="wallet-title u-font-22" style="color: #efe521">可用额度(元)</view>
						<view>
							<u-loading mode="circle" color="#efe521" :show="mineLoading"></u-loading> 
							<template v-if="!mineLoading">
								<u-count-to
									:end-val="mineData.maxLoanAmount || 0" 
									separator=","
									color="#efe521"
									duration="100"
									decimals="2"
									fontSize="50"
								></u-count-to>
							</template>
						</view>
					</view>
					
				</view>
			</view>
			<view class="u-m-b-10" v-for="(item, index) in mine_ad" :key="index">
				<u-image
					@click="goto(item.url)"
					:src="item.img"
					width="100%"
					mode="widthFix"
				></u-image>
			</view> 
			<!-- 菜单 -->
			<view class="bg-white u-radius-8 u-m-b-10" v-for="(item, index) in mine_menus" :key="index">
				<view class="u-p-20 u-p-l-30 u-p-r-30 u-font-32 text-bold u-border-bottom text-black">{{item.name}}</view>
				<view class="order-section u-flex u-flex-items-start u-flex-wrap u-p-20 u-p-t-30" >
					<view class="order-item u-flex u-flex-column u-flex-items-center u-m-b-30" 
						v-for="(ele, i) in item.list" 
						:key="i" 
						@click="navTo(ele.url)" 
						hover-class="common-hover"
						:hover-stay-time="50">
						<view class="yticon">
							<u-image
								:src="ele.icon"
								width="40px"
								height="40px"
							></u-image>
							<!-- <u-icon :name="item.icon" custom-prefix="custom-icon"></u-icon> -->
						</view>
						<view class=" u-font-26">{{ele.name}}</view>
					</view>
				</view>
			</view> 
			
			<view class="logout" v-if="logflag">
				<u-button 
				@click="logout"  
				:customStyle="{
					backgroundColor: '#e8e9ea',  
				}" 
				border-radius="10"
				>退出登录</u-button>
			</view>
		</view>

		<nav-bar :index="4" :tabbar="true"></nav-bar>
	</view>
</template>
<script>
	import listCell from '@/components/mix-list-cell';
	import {
		mapState
	} from 'vuex';
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	import {getUserCard, getAccount, getCpy} from '@/utils/userCard'
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		mixins: [mixCheckLogin],
		components: {
			listCell
		},
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				logflag: uni.getStorageSync('login'),
				mineLoading: false,
				mineData: {}
			}
		},
		async onLoad() {
			
			if(Object.keys(this.$store.state.userInfo).length == 0) getUserCard() 
			await this.getMineApi()
			 // this.$http.get('query_account')
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'history', 'account'])
		},
		methods: {
			async getMineApi() {
				this.mineLoading = true
				const res = await this.$http.get('bank_buy_all')
				this.mineLoading = false;
				if(res.data.code == 1) {
					this.mineData = res.data.list
				}
			},
			navTo(url) {
				// console.log(url)
				if(!uni.getStorageSync('login')) {
					uni.redirectTo({
						url: '/pages/login/index'
					})
					uni.showToast({
						title: '请登录生意宝账号。',
						icon: 'none'
					})
				}else {
					uni.navigateTo({
						url
					})
				}
				
			},
			async logout() {
				let res = await this.$http.get('sign_out')
				if(res.data.code == 1) {
					this.$store.commit('removeUserInfo')
					uni.redirectTo({
						url: "/pages/index/index"
					})
					uni.showToast({
						title: '退出成功'
					})
					uni.removeStorageSync('login')
					this.logflag = ''
				}
			},
			goto(url) {
				uni.navigateTo({
					url
				})
			}

		}
	}
</script>
<style>
	page {
		background-color: #f5f5f5;
	}
</style>
<style lang='scss' scoped>
	.wallet-box {
		.wallet { 
			background-image: url('https://wx3.y.netsun.com/Public/rz/jiner.png');
			background-size: 100% 75px;
			background-position: 0 center;
			background-repeat: no-repeat;
			height: 90px;
			.item {
				flex: 0 0 50%;
				&:first-child {
					border-right: 1rpx solid rgba(255,255,255,.3);
				}
			}
			.wallet-title {
				background-color: rgba(0,0,0,.3);
				border-radius: 15px;
				line-height: 22px;
				padding: 0 8px;
			}
		}
	}
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
		padding: 0 20rpx;
	}
	
	.logout {
		padding-top: 40rpx;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.user-section {
		/* height: 340upx; */
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			/* filter: blur(1px); */
			opacity: 1;
			background: radial-gradient(#444 10%, #111);
		}
	}

	.user-info-box {
		/* height: 180upx; */
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 100upx;
			height: 100upx;
			border: 5upx solid #fff;
			border-radius: 50%;
			overflow: hidden;
			background-color: #eee;
		}
		.username {
			font-size: 34upx;
			color: #111;
			margin-left: 20upx;
			display: flex;
			flex-direction: column;
			.username-label {
				font-size: 24rpx;
				background-color: #7e7abd;
				color: #fff;
				border-radius: 20rpx;
				padding: 4rpx 8rpx;
				display: block;
				width: 120rpx;
				text-align: center;
				margin-top: 15rpx;
			}
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background-image: url('../../static/img/bg-card.png');
		background-repeat: no-repeat;
		background-size: 105% 105%;
		background-position: center;
		border-radius: 16upx 16upx 0 0;
		border: 1rpx solid #0d356b;
		overflow: hidden;
		position: relative;
		padding: 26upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 30upx;
			/* width: 132upx; */
			padding: 0 30upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background-color: #f9e6af;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			display: flex;
			text {
				margin-left: 16upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		/* background: $page-color-base; */
		/* margin-top: -120upx; */
		padding: 0 20upx;
		position: relative;
		padding-bottom: 20upx;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;
		justify-content: space-between;
		.tj-item {
			@extend %flex-center;
			flex: 1;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: 42rpx;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}

	.order-section { 
		.order-item {   
			flex: 0 0 25%;
		}

		.yticon {
			font-size: 44upx;
			margin-bottom: 12upx;
			color: #111;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.history-section {
		/* padding: 30upx 0 0; */
		margin-top: 20upx;
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			padding-top: 30rpx;

			.yticon {
				font-size: 44upx;
				color: #bdbdbd;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			padding: 20rpx 30rpx 0;
			height: 190rpx;
			.list-w {
				display: flex;
				align-items: center;
			}
			.item {
				flex: 0 0 160rpx;
				height: 160rpx;
				margin-right: 15rpx;
				position: relative;
				border-radius: 10rpx;
				overflow: hidden;
				&:after {
					position: absolute;
					content: '';
					width: 100%;
					height: 100%;
					left: 0;
					top: 0;
					background-color: rgba(100,100,100,.1);
					
				}
			}
		}
	}
</style>
