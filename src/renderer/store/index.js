import Vue from 'vue'
import Vuex from 'vuex'

import {createPersistedState, createSharedMutations} from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex);

export default new Vuex.Store({
    modules,
    plugins: [
        createPersistedState()
    ],
    state: {
        // 账户列表
        accountList: [

        ],
        // 选中的下标
        selectAccountIndex: 0
    },
    mutations: {
        setAccounts(state, playload) {
            state.accountList = playload;
        },
        setSelectIndex(state, playload) {
            state.selectAccountIndex = playload;
        }
    },
    strict: process.env.NODE_ENV !== 'production'
})
