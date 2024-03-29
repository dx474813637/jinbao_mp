//status => 订单状态
const orderStatus = v => {
	if(v == 0) return '待付款'
	else if(v == 1) return '待发货'
	else if(v == 2) return '待收货'
	else if(v == 3) return '交易完成'
	else return ''
}
//支付工具
const toTools = (v) => {
	if(v == 1) return '现金'
	if(v == 2) return '账期（赊账）'
	if(v == 3) return '融资'
	if(v == 9) return '微信'
	return '未知'
}
//订单状态
const toState = v => {
	if(v == 0) return '待议价'
	if(v == 1) return '议价完成'
	if(v == 2) return '订单完成'
	if(v == 3) return '取消订单'
	if(v == 4) return '等待买家确认'
	if(v == 5) return '等待买家填写地址'
	if(v == 6) return '等待买家选择自提还是出运费'
	if(v == 7) return '不议价等待卖家确认运费'
	if(v == 8) return '不议价等待买家确认运费价格'
	return v
}
//支付状态
const toPayState = (v) => {
	if(v == 0) return '等待支付'
	if(v == 1) return '等待支付'
	if(v == 2) return '退款中'
	if(v == 3) return '等待收货'
	if(v == 4) return '等待支付'
	if(v == 5) return '支付成功'
	if(v == 6) return '支付失败'
	if(v == 7) return '已退款'
	if(v == 8) return '已部分退款'
	if(v == 9) return '已冻结'
	if(v == 10) return '等待支付'
	if(v == 11) return '等待支付'
	return v
}
//支付类型
const toPayType = (v) => {
	if(v == 1) return '担保支付'
	if(v == 2) return '货到付款'
	if(v == 3) return '款到发货'
	return v
}
const toTranState = v => {
	if(v == 0) return '未发货'
	if(v == 1) return '已发货'
	if(v == 2) return '已收货'
	return v
}
const buyGetType = v => {
	if(v == 1) return '买家自提'
	if(v == 2) return '买家出运费'
	if(v == 3) return '卖家包邮'
	return v
}
const moneyDwInt = v => {
	if(!v) return 0
	return Number(String(v).split('.')[0])
}
const moneyDwPoint = v => {
	if(!v) return '00'
	return String(v.toFixed(2)).split('.')[1]
}
const wxBillState = v => {
	if(v == 0) return '未支付'
	if(v == 1) return '支付完成'
	return v
}
const toFixed2 = v => {
	if(!v) v = 0
	return v.toFixed(2)
}

//时间格式
const timeFilter = v => {
	if(!v) return null
	let dateArr = v.split(' ')[0].split('-')
	let timeArr = v.split(' ')[1].split(':')
	let arr = [...dateArr, ...timeArr]
	arr = arr.map(ele => +ele)
	// console.log(arr)
	let now = new Date().toLocaleString()
	let nowArr1 = now.split(' ')[0].split('/')
	let nowArr2 = now.split(' ')[1].slice(2).split(':')
	let nowArr = [...nowArr1, ...nowArr2]
	nowArr = nowArr.map(ele => +ele)
	if(now.indexOf('下午') != -1) {
		nowArr[3] = nowArr[3] + 12
	}
	// console.log(nowArr)
	
	if(nowArr[0] == arr[0] && nowArr[1] == arr[1] && nowArr[2] - arr[2] <= 1) {
		if(nowArr[2] == arr[2]) {
			if(nowArr[3] == arr[3]) {
				return nowArr[4] - arr[4] + 1 + '分钟前'
			}
			else if(nowArr[4] < arr[4] && nowArr[3] - arr[3] == 1){
				return nowArr[4] - arr[4] + 61 + '分钟前'
			}
			return nowArr[3] - arr[3] + '小时前'
			
		}else if(nowArr[2] - arr[2] == 1 && nowArr[3] - arr[3] < 0) {
			return (+nowArr[3]) - (+arr[3]) + 24 + '小时前'
		}else {
			return v.split(' ')[0].slice(5)
		}
	} 
	if(nowArr[0] != arr[0]) {
		return v.split(' ')[0]
	}
	return v.split(' ')[0].slice(5)
}
const rzUser = v => {
	if(v == 0) return '未创建'
	if(v == 1) return '未认证'
	if(v == 2) return '已认证'
	if(v == 3) return '已注销'
	return v
}
const userId2str = v => {
	if(v == 'CRED_PSN_CH_IDCARD') return '中国大陆身份证' 
	if(v == 'CRED_PSN_CH_TWCARD') return '台湾来往大陆通行证' 
	if(v == 'CRED_PSN_CH_MACAO') return '澳门来往大陆通行证' 
	if(v == 'CRED_PSN_CH_HONGKONG') return '香港来往大陆通行证' 
	if(v == 'CRED_PSN_PASSPORT') return '护照' 
	return v
}
const rzCpy = v => {
	if(v == 0) return '未创建'
	if(v == 1) return '未认证'
	if(v == 2) return '已认证'
	if(v == 3) return '已注销'
	return v
}
const rzCpy2 = v => {
	if(v == 0) return '待认证'
	if(v == 1) return '认证发送中'
	if(v == 2) return '认证成功'
	if(v == 3) return '认证失败'
	if(v == 4) return '认证中'
	return v
}
const paccStatus2Str = v => { 
	if(v == 1) return '授信申请中'
	if(v == 2) return '授信已递交'
	if(v == 3) return '授信签约取消中'
	if(v == 4) return '授信失败'
	if(v == 5) return '授信通过，签约中'
	if(v == 6) return '授信通过，贷款企业已签约'
	if(v == 7) return '授信通过，签约通过'
	if(v == 8) return '授信通过，贷款账户已激活'
	return v
}
const paccFileStatus2Str = v => { 
	if(v == 0) return '未提交'
	if(v == 1) return '已创建'
	if(v == 2) return '已开启'
	if(v == 3) return '已归档'
	if(v == 4) return '已撤销' 
	return v
}
const orderRzStatus2Str = v => { 
	if(v == 1) return '融资申请中'
	if(v == 2) return '流程暂停'
	if(v == 3) return '财务已拒绝'
	if(v == 4) return '放款机构已同意'
	if(v == 5) return '放款机构已拒绝'
	if(v == 6) return '提款成功'
	if(v == 7) return '提款失败'
	return v
}
const date2Str = v => { 
	if(v == 'month') return '月' 
	return v
}
export default {
	orderStatus,
	timeFilter,
	toTools,
	toState,
	toPayState,
	toPayType,
	toTranState,
	moneyDwInt,
	moneyDwPoint,
	wxBillState,
	toFixed2,
	buyGetType,
	rzUser,
	rzCpy,
	rzCpy2,
	userId2str,
	orderRzStatus2Str,
	paccStatus2Str,
	paccFileStatus2Str,
	date2Str
}