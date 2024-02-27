import { createApp } from 'vue'
// commoncss
import './theme/index.scss';
import "./common.css"
// element-plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import router from "./router";
import api  from "./config/config";
import App from './App.vue'



// pinia store
import pinia from "@/store/index";

document.title = import.meta.env.VITE_APP_TITLE ?import.meta.env.VITE_APP_TITLE :'测试测试'

const app = createApp(App)

app.config.globalProperties.$api = api;

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')