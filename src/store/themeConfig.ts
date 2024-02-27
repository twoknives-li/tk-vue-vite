import { defineStore } from 'pinia';
export const useThemeConfig = defineStore('themeConfig', {
	state: () => ({
		themeConfig: {
			// 是否开启布局配置抽屉
			isDrawer: false,

			/**
			 * 全局主题
			 */
			// 默认 primary 主题颜色
			primary: '#409eff',
			// 是否开启深色模式
			isIsDark: false,
      
			// 默认顶栏导航背景颜色
			topBar: '#ffffff',
    },
	}),
	actions: {
		setThemeConfig(data) {
			this.themeConfig = data.themeConfig;
		},
	},
});
