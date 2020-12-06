import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	namespaced: true,
	state: {
		token: "",
	},
	mutations: {
		getToken(state, token) {
			console.log("mutations "+ token)
			this.state.token = token
		}
	},
	actions: {
		token({commit}, token) {
			console.log("actions "+ token)
			commit("getToken", token)
		},
	},
	getters: {},
})
