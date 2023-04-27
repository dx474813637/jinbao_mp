export default {
	data() {
		return {
			shareOptions: {
				pageName: ''
			}
		}
	},
	async onLoad(options) {
		if(options && options.login) {
			uni.setStorageSync('sharelogin', options.login);
		}
	},
	onShareTimeline() {
		let opt = {
			title: this.getShareTitle(),
			query: `login=${uni.getStorageSync('login')}`
		}
		return opt
	},
	onShareAppMessage(res) {
		let opt = {
			title: this.getShareTitle(),
			path: this.getPath(),
		};
		return opt
	},
	methods: {
		getPath() {
			let fullPath = this.$scope.$page.fullPath
			let login = `login=${uni.getStorageSync('login')}`
			if (fullPath.includes('?')) {
				login = '&' + login
			} else {
				login = '?' + login
			}
			return fullPath + login
		},
		getShareTitle() {
			let title = uni.getStorageSync('home').title || '旺铺'
			return `${title} - ${this.shareOptions.pageName}`
		}
	}
}
