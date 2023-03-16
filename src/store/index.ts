// store/index.ts
import { defineStore } from "pinia";
import { createPinia } from "pinia";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
/**
 * pinia 错误使用说明示例
 * https://github.com/vuejs/pinia/discussions/971
 * https://github.com/vuejs/pinia/discussions/664#discussioncomment-1329898
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#single-page-applications
 */
export const webStore = defineStore(('counterStore'),{
    	// id: 必须的，在所有 Store 中唯一
    state: () => ({
        counter: 0,
        token: 'sadfasdf',
        hasLogin: ''
    }),
    actions: {
        // 方法 可以是异步 async addCounter(){}
        // 在这里也可以访问其他的store
        addCounter() {
            this.counter++;
        },
        // setToken
		setToken(token: string) {
			this.token = token;
		}, 
        // setLoginStatus
		setHasLogin(token: string) {
			this.hasLogin = token;
		},
    },
    getters: {
        doubleCounter(state): number {
            // 可以使用this
            // return this.counter * 2
            // 在这里也可以访问其他的store
            return state.counter * 2;
        },
    },
	persist: piniaPersistConfig("counterStore")
});


// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


export default pinia;
