import { http } from '@/common/service.js'
import store from '@/store'

export async function getUserCard() {
	let res = await http.get('my_card')
	if(res.data.code == 1) {
		store.commit('setUserInfo', res.data.list || {})
	}
}

export async function getAccount() {
	store.commit('setCustomKey', {
		key: 'accountLoading',
		value: true
	})
	await http.get('verify_account_3')
	let res = await http.get('account') 
	store.commit('setCustomKey', {
		key: 'accountLoading',
		value: false
	})
	if(res.data.code == 1) {
		store.commit('setAccInfo', res.data.list || {})
	}
}


export async function getCpy() {
	if(!store.state.account.organizations_id) return
	store.commit('setCustomKey', {
		key: 'organizationsLoading',
		value: true
	})
	await http.get('query_organizations')
	let res = await http.get('organizations')
	store.commit('setCustomKey', {
		key: 'organizationsLoading',
		value: false
	})
	if(res.data.code == 1) {
		store.commit('setCpyInfo', res.data.list || {})
	}
}

