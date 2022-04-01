import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import router from "./router";
import api  from "./config/config";
import App from './App.vue'

const app = createApp(App)

app.config.globalProperties.$api = api;
app.config.globalProperties.$sysName = '测试系统名称';

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(ElementPlus)
app.mount('#app')