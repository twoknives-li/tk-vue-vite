
window.config = {
	app: {
		name: "测试系统名称",
		title: "测试title",
		copyright: "Copyright",
		company: "Tk"
	},
	api: {
		server: "",
		timeOut: 20000,
		prefix: "DEV",
		modules: {
			login: {
				server: ""
			},
			projectPoolMgr: {
				server: ""
			},
			personnelPoolMgr: {
				server: ""
			},
			personnelDailyMgr: {
				server: ""
			},
			resourcePool: {
				server: "",
				modules: {
					projectMgr: {
						server: ""
					},
					personnelMgr: {
						server: ""
					}
				}
			},
			statisticalAnalysis: {
				server: "",
				modules: {
					projectAnalysis: {
						server: ""
					},
					personnelAnalysis: {
						server: ""
					}
				}
			},
			systemMgr: {
				server: "",
				modules: {
					user: {
						server: ""
					},
					role: {
						server: ""
					},
					menu: {
						server: ""
					}
				}
			},
			dataDictionaryMgr: {
				server: ""
			},
			logOut: {
				server: ""
			}
		}
	},
	logo: {
		url: ""
	}
};
