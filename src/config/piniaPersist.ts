import { PersistedStateOptions } from "pinia-plugin-persistedstate";
/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @return persist
 * */
const piniaPersistConfig = (key: string) => {
	// console.log((window as any).config);
	const persist: PersistedStateOptions = {
		key: (window as any).config.api.prefix ? (window as any).config.api.prefix + "_" + key : key,
		storage: window.localStorage
		// storage: window.sessionStorage,
	};
	return persist;
};

export default piniaPersistConfig;
