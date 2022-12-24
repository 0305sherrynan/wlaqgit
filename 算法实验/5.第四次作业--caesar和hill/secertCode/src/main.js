import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import echarts from './plugins/echarts'
const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.mount('#app')
